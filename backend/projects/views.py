from django.db.models import Q, Sum

from rest_framework import generics , status
from rest_framework.views import  APIView
from rest_framework.response import Response
from rest_framework.permissions import (IsAuthenticated, AllowAny)

from .models import (JobCategory, Skill, Gig, ProjectRoleRequirement, Project, Application, WorkProposal, )
from collaborations.models import ( Team, TeamMember , CollaborationInvite, Workspace, WorkspaceParticipant, WorkspacePayment, )
from .serializers import (JobCategorySerializer, SkillSerializer, GigSerializer, ProjectRoleRequirementSerializer, ProjectSerializer, ApplicationSerializer, WorkProposalSerializer,)
from collaborations.serializers import CollaborationInviteSerializer
from django.contrib.auth import get_user_model




User = get_user_model()



class JobCategoryListView (generics.ListAPIView):
    queryset= JobCategory.objects.all()
    serializer_class= JobCategorySerializer
    permission_classes= [AllowAny]
    
class SkillListView (generics.ListAPIView):
    queryset= Skill.objects.all()
    serializer_class= SkillSerializer
    permission_classes= [AllowAny]
    

class CreateSkillView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        if not request.user.is_freelancer:

            return Response(
                {'error': 'Only freelancers can create skills'},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = SkillSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class CreateGigView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        user = request.user

        if not user.is_freelancer:

            return Response(
                {'error': 'Only freelancers can create gigs'},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = GigSerializer(data=request.data)

        if serializer.is_valid():

            gig = serializer.save(
                freelancer=user.freelancer_profile
            )

            return Response(
                GigSerializer(gig).data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
        

class MyGigsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        if not user.is_freelancer:

            return Response(
                {'error': 'User is not a freelancer'},
                status=status.HTTP_403_FORBIDDEN
            )

        gigs = Gig.objects.filter(
            freelancer=user.freelancer_profile
        )

        serializer = GigSerializer(gigs, many=True)

        return Response(serializer.data)


class GigDetailView(generics.RetrieveAPIView):

    queryset = Gig.objects.all()

    serializer_class = GigSerializer

    permission_classes = [AllowAny]


class GigListView(generics.ListAPIView):

    serializer_class = GigSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):

        queryset = Gig.objects.filter(
            status="ACTIVE"
        ).order_by("-created_at")

        search = self.request.query_params.get(
            "search"
        )

        category = self.request.query_params.get(
            "category"
        )

        skill = self.request.query_params.get(
            "skill"
        )

        experience = self.request.query_params.get(
            "experience"
        )


        if search:

            search_terms = search.strip().split()

            for term in search_terms:

                queryset = queryset.filter(

                    Q(title__icontains=term) |
                    Q(description__icontains=term) |
                    Q(job_category__name__icontains=term) |
                    Q(skills__name__icontains=term)

                )

        if category:

            queryset = queryset.filter(
                job_category_id=category
            )

        if skill:

            queryset = queryset.filter(
                skills__id=skill
            )

        if experience:

            queryset = queryset.filter(
                experience_level=experience
            )

        return queryset.distinct()


class UpdateGigView(APIView):

    permission_classes = [IsAuthenticated]

    def put(self, request, pk):

        try:
            gig = Gig.objects.get(pk=pk)

        except Gig.DoesNotExist:

            return Response(
                {'error': 'Gig not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        if gig.freelancer.user != request.user:

            return Response(
                {'error': 'Permission denied'},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = GigSerializer(
            gig,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    

class DeleteGigView(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):

        try:
            gig = Gig.objects.get(pk=pk)

        except Gig.DoesNotExist:

            return Response(
                {'error': 'Gig not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        if gig.freelancer.user != request.user:

            return Response(
                {'error': 'Permission denied'},
                status=status.HTTP_403_FORBIDDEN
            )

        gig.delete()

        return Response(
            {'message': 'Gig deleted successfully'},
            status=status.HTTP_204_NO_CONTENT
        )


class CreateProjectView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = ProjectSerializer(
            data=request.data
        )

        if serializer.is_valid():

            project = serializer.save(
                client=request.user
            )

            return Response(
                ProjectSerializer(project).data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class ProjectListView(generics.ListAPIView):

    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):

        queryset = (
            Project.objects.filter(status="OPEN")
            .prefetch_related(
                "role_requirements__job_category"
            )
            .annotate(
                budget_total=Sum(
                    "role_requirements__allocated_budget"
                )
            )
            .distinct()
            .order_by("-created_at")
        )

        search = self.request.GET.get("search")

        category = self.request.GET.get("category")

        budget = self.request.GET.get("budget")

        if search:

            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search) |
                Q(role_requirements__job_category__name__icontains=search) |
                Q(role_requirements__job_category__professional_title__icontains=search)
               
            )

        if category:

            queryset = queryset.filter(
                role_requirements__job_category=category
            )

        if budget:

            if budget == "1":

                queryset = queryset.filter(
                    budget_total__lte=1000
                )

            elif budget == "2":

                queryset = queryset.filter(
                    budget_total__gt=1000,
                    budget_total__lte=5000
                )

            elif budget == "3":

                queryset = queryset.filter(
                    budget_total__gt=5000,
                    budget_total__lte=10000
                )

            elif budget == "4":

                queryset = queryset.filter(
                    budget_total__gt=10000
                )

        return queryset

class ProjectDetailView(
    generics.RetrieveAPIView
):

    queryset = Project.objects.all()

    serializer_class = ProjectSerializer

    permission_classes = [AllowAny]


class MyProjectsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        projects = Project.objects.filter(
            client=request.user
        )

        serializer = ProjectSerializer(
            projects,
            many=True
        )

        return Response(serializer.data)


class ProjectRoleListView(
    generics.ListAPIView
):

    serializer_class = (
        ProjectRoleRequirementSerializer
    )

    permission_classes = [AllowAny]

    def get_queryset(self):

        return (
            ProjectRoleRequirement.objects
            .filter(
                project_id=self.kwargs["pk"]
            )
        )
        
        
class UpdateProjectView(APIView):

    permission_classes = [IsAuthenticated]

    def put(self, request, pk):

        try:

            project = Project.objects.get(
                pk=pk
            )

        except Project.DoesNotExist:

            return Response(
                {"error": "Project not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        if project.client != request.user:

            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = ProjectSerializer(
            project,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
        
class DeleteProjectView(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):

        try:

            project = Project.objects.get(
                pk=pk
            )

        except Project.DoesNotExist:

            return Response(
                {"error": "Project not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        if project.client != request.user:

            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        project.delete()

        return Response(
            {
                "message":
                "Project deleted successfully"
            },
            status=status.HTTP_200_OK
        )


class ApplyToProjectView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, project_id):

        user = request.user

        if not user.is_freelancer:

            return Response(
                {'error': 'Only freelancers can apply'},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            project = Project.objects.get(
                pk=project_id
            )

        except Project.DoesNotExist:

            return Response(
                {'error': 'Project not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        gig_id = request.data.get(
            'selected_gig'
        )

        try:
            gig = Gig.objects.get(
                pk=gig_id
            )

        except Gig.DoesNotExist:

            return Response(
                {'error': 'Gig not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        if gig.freelancer.user != user:

            return Response(
                {'error': 'You can only use your own gig'}
            )

        required_categories = (
            project.role_requirements
            .values_list(
                "job_category_id",
                flat=True
            )
        )

        if gig.job_category_id not in required_categories:

            return Response(
                {
                    "error": (
                        "Selected gig does not match "
                        "project requirements"
                    )
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        existing = Application.objects.filter(
            project=project,
            applicant_user=user
        )

        if existing.exists():

            return Response(
                {'error': 'Already applied'}
            )

        application = Application.objects.create(
            project=project,
            applicant_user=user,
            selected_gig=gig,
            proposed_price=request.data.get(
                'proposed_price'
            ),
            cover_letter=request.data.get(
                'cover_letter'
            )
        )

        return Response(
            ApplicationSerializer(
                application
            ).data,
            status=status.HTTP_201_CREATED
        )

class MyMatchingGigsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, project_id):

        user = request.user

        if not user.is_freelancer:
            return Response(
                {"error": "Only freelancers can access this"},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            project = Project.objects.get(
                pk=project_id
            )

        except Project.DoesNotExist:
            return Response(
                {"error": "Project not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        required_categories = (
            project.role_requirements
            .values_list(
                "job_category_id",
                flat=True
            )
        )

        gigs = Gig.objects.filter(
            freelancer=user.freelancer_profile,
            job_category_id__in=required_categories,
            status="ACTIVE"
        )

        serializer = GigSerializer(
            gigs,
            many=True
        )

        return Response(serializer.data)

class MyApplicationsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        applications = Application.objects.filter(
            applicant_user=request.user
        )

        serializer = ApplicationSerializer(
            applications,
            many=True
        )

        return Response(serializer.data)


class ProjectApplicationsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, project_id):

        try:
            project = Project.objects.get(
                pk=project_id
            )

        except Project.DoesNotExist:

            return Response(
                {'error': 'Project not found'}
            )

        if project.client != request.user:

            return Response(
                {'error': 'Permission denied'},
                status=status.HTTP_403_FORBIDDEN
            )

        applications = project.applications.all()

        serializer = ApplicationSerializer(
            applications,
            many=True
        )

        return Response(serializer.data)


class SendProposalView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        project_id = request.data.get("project")
        receiver_id = request.data.get("receiver")
        proposed_price = request.data.get("proposed_price")
        message = request.data.get("message")
        application_id = request.data.get("application")

    
        try:
            project = Project.objects.get(pk=project_id)
        except Project.DoesNotExist:
            return Response(
                {"error": "Project not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        if project.client != request.user:
            return Response(
                {"error": "Only project owner can send proposals"},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            receiver = User.objects.get(pk=receiver_id)
        except User.DoesNotExist:
            return Response(
                {"error": "Receiver not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        if receiver == request.user:
            return Response(
                {"error": "Cannot send proposal to yourself"},
                status=status.HTTP_400_BAD_REQUEST
            )


        try:
            application = Application.objects.get(id=application_id)
        except Application.DoesNotExist:
            return Response(
                {"error": "Application not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        if application.project.id != project.id:
            return Response(
                {"error": "Application does not belong to this project"},
                status=status.HTTP_400_BAD_REQUEST
            )

        existing = WorkProposal.objects.filter(
            project=project,
            sender=request.user,
            receiver=receiver,
            status="PENDING"
        )

        if existing.exists():
            return Response(
                {"error": "Pending proposal already exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        
        proposal = WorkProposal.objects.create(
            application=application,
            project=project,
            sender=request.user,
            receiver=receiver,
            proposed_price=proposed_price,
            message=message
        )

        serializer = WorkProposalSerializer(proposal)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )
   


class ReceivedProposalsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        proposals = WorkProposal.objects.filter(
            receiver=request.user
        ).order_by("-created_at")

        serializer = WorkProposalSerializer(
            proposals,
            many=True
        )

        return Response(serializer.data)
    
    
class SentProposalsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        proposals = WorkProposal.objects.filter(
            sender=request.user
        ).order_by("-created_at")

        serializer = WorkProposalSerializer(
            proposals,
            many=True
        )

        return Response(serializer.data)


class UpdateProposalStatusView(APIView):

    permission_classes = [IsAuthenticated]

    def put(self, request, proposal_id):

        try:

            proposal = WorkProposal.objects.get(
                pk=proposal_id
            )

        except WorkProposal.DoesNotExist:

            return Response(
                {"error": "Proposal not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        if proposal.receiver != request.user:

            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        new_status = request.data.get(
            "status"
        )

        allowed_statuses = [
            "ACCEPTED",
            "REJECTED",
            "COUNTERED",
        ]

        if new_status not in allowed_statuses:

            return Response(
                {"error": "Invalid status"},
                status=status.HTTP_400_BAD_REQUEST
            )

        proposal.status = new_status

        if new_status == "COUNTERED":

            proposal.counter_message = request.data.get(
                "counter_message",
                ""
            )

        else:

            proposal.counter_message = ""

        proposal.save()
        
        if new_status == "ACCEPTED":

            if not Workspace.objects.filter(
                project=proposal.project
            ).exists():

                workspace = Workspace.objects.create(

                    project=proposal.project,

                    application=proposal.application,

                    client=proposal.project.client,

                    team=proposal.application.team
                    if proposal.application else None,

                )
                                
                proposal.project.status = "IN_PROGRESS"
                proposal.project.save(update_fields=["status"])
                WorkProposal.objects.filter(
                    project=proposal.project,
                    status="PENDING"
                ).exclude(
                    id=proposal.id
                ).update(status="REJECTED")
                
                print("Creating payment...")
                WorkspacePayment.objects.create(
                    workspace=workspace,
                    amount=proposal.proposed_price,
                )
                print("Payment created.")
                WorkspaceParticipant.objects.create(
                    workspace=workspace,
                    user=proposal.project.client,
                    role="CLIENT",
                )

                if proposal.application and proposal.application.team:

                    for member in TeamMember.objects.filter(
                        team=proposal.application.team
                    ):

                        WorkspaceParticipant.objects.get_or_create(

                            workspace=workspace,

                            user=member.user,

                            defaults={
                                "role": "FREELANCER"
                            }

                        )

                else:

                    WorkspaceParticipant.objects.get_or_create(

                        workspace=workspace,

                        user=proposal.receiver,

                        defaults={
                            "role": "FREELANCER"
                        }

                    )                        
        serializer = WorkProposalSerializer(
            proposal
        )

        return Response(serializer.data)


class ResendProposalView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, proposal_id):

        try:

            old_proposal = WorkProposal.objects.get(
                pk=proposal_id
            )

        except WorkProposal.DoesNotExist:

            return Response(
                {
                    "error": "Proposal not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        if old_proposal.sender != request.user:

            return Response(
                {
                    "error": "Permission denied"
                },
                status=status.HTTP_403_FORBIDDEN
            )

        if old_proposal.status != "COUNTERED":

            return Response(
                {
                    "error": "Proposal is not countered."
                },
                status=status.HTTP_400_BAD_REQUEST
            )
            

        proposal = WorkProposal.objects.create(

            project=old_proposal.project,

            application=old_proposal.application,

            sender=old_proposal.sender,

            receiver=old_proposal.receiver,

            proposed_price=request.data.get(
                "proposed_price"
            ),

            message=request.data.get(
                "message"
            ),

            status="PENDING",

        )

        old_proposal.status = "REJECTED"
        old_proposal.save()

        serializer = WorkProposalSerializer(
            proposal
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )
        
class TeamApplicationView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def post(self, request, project_id):
        user = request.user

        try:
            project = Project.objects.get(
                pk=project_id
            )

        except Project.DoesNotExist:
            return Response(
                {
                    "error": "Project not found"
                },
                status=404
            )

        pending = CollaborationInvite.objects.filter(
            sender=user,
            project=project,
            status="PENDING"
        ).exists()

        if pending:

            return Response(
                {
                    "error":
                    "Pending collaboration invites exist."
                },
                status=400
            )
            
        try:
            team = (
                Team.objects
                .filter(
                    project=project,
                    created_by=user
                )
                .order_by("-created_at")
                .first()
            )

            if team is None:
                return Response(
                    {"error": "No accepted team found"},
                    status=400
                )
                
        except Team.DoesNotExist:

            return Response(
                {
                    "error": "No accepted team found"
                },
                status=400
            )

        required_roles = ProjectRoleRequirement.objects.filter(

            project=project

        ).count()

        actual_roles = team.members.count()

        if actual_roles != required_roles:

            return Response(

                {

                    "error":

                    "Team is incomplete."

                },

                status=400

            )

        if Application.objects.filter(

            team=team,

            project=project

        ).exists():

            return Response(
                {
                    "error":
                    "Already applied"
                },
                status=400
            )

        leader = TeamMember.objects.filter(

            team=team,

            user=user

        ).first()

        leader_gig = (
            team.members
            .exclude(gig=None)
            .first()
        )

        if leader_gig is None:
            return Response(
                {"error": "No gig found for team"},
                status=400
            )

        if leader is None:

            return Response(
                {
                    "error":
                    "Leader missing"
                },
                status=400
            )
            
        try:
            leader_gig = Gig.objects.get(
                pk=request.data.get("selected_gig"),
                freelancer=user.freelancer_profile,
            )

        except Gig.DoesNotExist:
            return Response(
                {
                    "error": "Invalid gig."
                },
                status=400
            )
            
        application = Application.objects.create(

            project=project,
            
            applicant_user=user,
            
            team=team,

            selected_gig=leader_gig,

            proposed_price=request.data.get(
                "proposed_price"
            ),

            cover_letter=request.data.get(
                "cover_letter"
            )

        )

        serializer = ApplicationSerializer(
            application
        )

        return Response(
            serializer.data,
            status=201
        )


class AcceptedTeamView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(
        self,
        request,
        project_id
    ):

        invites = CollaborationInvite.objects.filter(
            sender=request.user,
            project_id=project_id,
            status="ACCEPTED"
        )

        serializer = CollaborationInviteSerializer(
            invites,
            many=True
        )

        return Response(
            serializer.data
        ) 
        

