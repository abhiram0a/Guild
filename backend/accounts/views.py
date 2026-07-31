from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model


from .serializers import (UserSerializer, RegisterSerializer, FreelancerProfileSerializer)

from projects.models import (
    Project,
    Gig,
    Application,
)
from collaborations.models import (
    Workspace,
    Review,
)



User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class LoginView(APIView):
    def post(self, request):
        username= request.data.get('username')
        password= request.data.get('password')
        
        user= authenticate(username=username, password=password)
        
        if user:
            token, created= Token.objects.get_or_create(user=user)
            
            serializer= UserSerializer(user)
            
            return Response({'token': token.key, 'user': serializer.data})
        
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes= [IsAuthenticated]
    
    def post(self, request):
        if hasattr(request.user, 'auth_token'):
            request.user.auth_token.delete()        
        
        return Response({'message': 'Logged out successfully'})
    

class ProfileView(APIView):
    permission_classes= [IsAuthenticated]
        
    def get(self, request):

        user_serializer = UserSerializer(request.user)

        data = user_serializer.data

        if request.user.is_freelancer:

            freelancer_serializer = FreelancerProfileSerializer(
                request.user.freelancer_profile
            )

            data["freelancer_profile"] = freelancer_serializer.data

        return Response(data)
    
    def put(self, request):

        user_serializer = UserSerializer(
            request.user,
            data=request.data,
            partial=True
        )

        if user_serializer.is_valid():

            user_serializer.save()

        else:

            return Response(
                user_serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        if request.user.is_freelancer:

            freelancer_serializer = FreelancerProfileSerializer(
                request.user.freelancer_profile,
                data=request.data,
                partial=True
            )

            if freelancer_serializer.is_valid():

                freelancer_serializer.save()

            else:

                return Response(
                    freelancer_serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )

        return self.get(request)
    

class BecomeFreelancerView(APIView):
    permission_classes= [IsAuthenticated]
    
    def post(self, request):
        user= request.user
        
        if user.is_freelancer:
            
            return Response({'error': 'User is already a freelancer'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer= FreelancerProfileSerializer(data= request.data)
        
        if serializer.is_valid():
            freelancer_profile= serializer.save(user=user)
            
            user.is_freelancer= True
            user.save()
            
            return Response(FreelancerProfileSerializer(freelancer_profile).data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, pk):

        try:
            user = User.objects.get(pk=pk)

        except User.DoesNotExist:

            return Response(
                {'error': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        user_serializer = UserSerializer(user)

        data = user_serializer.data

        if user.is_freelancer:

            freelancer_serializer = FreelancerProfileSerializer(
                user.freelancer_profile
            )

            data["freelancer_profile"] = freelancer_serializer.data

        return Response(data)



class DashboardView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        # ---------------------------
        # CLIENT SIDE DATA
        # ---------------------------

        my_projects = Project.objects.filter(client=user)

        project_count = my_projects.count()

        latest_projects = my_projects.order_by(
            "-created_at"
        )[:5]

        # ---------------------------
        # WORKSPACES (both roles)
        # ---------------------------

        workspaces = Workspace.objects.filter(
            participants__user=user
        ).distinct()

        workspace_count = workspaces.count()

        latest_workspaces = workspaces.order_by(
            "-created_at"
        )[:5]

        # ---------------------------
        # DEFAULT RESPONSE
        # ---------------------------

        data = {

            "user": {
                "id": user.id,
                "display_name": user.display_name,
                "is_freelancer": user.is_freelancer,
                "balance": float(user.balance),
            },

            "project_count": project_count,
            "workspace_count": workspace_count,

            "latest_projects": [
                {
                    "id": p.id,
                    "title": p.title,
                    "status": p.status,
                    "created_at": p.created_at,
                }
                for p in latest_projects
            ],

            "latest_workspaces": [
                {
                    "id": w.id,
                    "project_title": w.project.title,
                    "project_id": w.project.id,
                    "created_at": w.created_at,
                }
                for w in latest_workspaces
            ],
        }

        # ---------------------------
        # FREELANCER DATA
        # ---------------------------

        if user.is_freelancer:

            gigs = Gig.objects.filter(
                freelancer=user.freelancer_profile
            )

            applications = Application.objects.filter(
                applicant_user=user
            )

            reviews = Review.objects.filter(
                freelancer=user
            )

            avg_rating = reviews.aggregate_avg = None

            from django.db.models import Avg

            avg_rating = reviews.aggregate(
                Avg("rating")
            )["rating__avg"]

            data.update({

                "gig_count": gigs.count(),

                "application_count": applications.count(),

                "review_count": reviews.count(),

                "avg_rating": (
                    round(avg_rating, 2)
                    if avg_rating else 0
                ),

                "recent_gigs": [
                    {
                        "id": g.id,
                        "title": g.title,
                        "price": g.price,
                        "status": g.status,
                    }
                    for g in gigs.order_by("-created_at")[:5]
                ],

                "recent_applications": [
                    {
                        "id": a.id,
                        "project_id": a.project.id,
                        "project_title": a.project.title,
                        "status": a.status,
                    }
                    for a in applications.order_by("-created_at")[:5]
                ],

            })

        return Response(data)