from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import AcceptInviteSerializer

from django.contrib.auth import get_user_model

from rest_framework.parsers import (
    MultiPartParser,
    FormParser,
)

from .models import (
    FreelancerConnection,
    CollaborationInvite,
    Team,
    TeamMember,
    Workspace,
    WorkspaceParticipant,
    WorkspaceMessage,
    WorkspaceFile,
    Review,
    )
from .serializers import (
    FreelancerConnectionSerializer,
    CollaborationInviteSerializer,
    WorkspaceSerializer,
    Workspace,
    WorkspaceMessageSerializer,
    WorkspaceFileSerializer,
    WorkspaceTimelineSerializer,
    WorkspacePaymentSerializer,
    ReviewTargetSerializer,
    ReviewSerializer,
)

from accounts.models import User

from projects.models import (
    Project,
    ProjectRoleRequirement,
    Gig,
)




User = get_user_model()

def is_workspace_participant(user, workspace):

    return WorkspaceParticipant.objects.filter(
        workspace=workspace,
        user=user,
    ).exists()
    

class SendConnectionRequestView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):

        sender = request.user

        try:
            receiver = User.objects.get(
                id=user_id
            )

        except User.DoesNotExist:

            return Response(
                {'error': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        if not sender.is_freelancer:

            return Response(
                {
                    'error':
                    'Only freelancers can send requests'
                },
                status=status.HTTP_403_FORBIDDEN
            )

        if not receiver.is_freelancer:

            return Response(
                {
                    'error':
                    'Can only connect with freelancers'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if sender == receiver:

            return Response(
                {
                    'error':
                    'Cannot send request to yourself'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        existing_connection = FreelancerConnection.objects.filter(
            sender=sender,
            receiver=receiver
        ).first()

        reverse_connection = FreelancerConnection.objects.filter(
            sender=receiver,
            receiver=sender
        ).first()


        if existing_connection or reverse_connection:

            return Response(
                {
                    'error':
                    'Connection already exists or request already sent'
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        connection = FreelancerConnection.objects.create(
            sender=sender,
            receiver=receiver
        )

        return Response(
            FreelancerConnectionSerializer(
                connection
            ).data,
            status=status.HTTP_201_CREATED
        )



class ReceivedConnectionRequestsView(
    APIView
):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        requests = FreelancerConnection.objects.filter(
            receiver=request.user,
            status='PENDING'
        )

        serializer = FreelancerConnectionSerializer(
            requests,
            many=True
        )

        return Response(serializer.data)
    
    
    
class AcceptConnectionRequestView(
    APIView
):

    permission_classes = [IsAuthenticated]

    def post(self, request, pk):

        try:

            connection = FreelancerConnection.objects.get(
                id=pk,
                receiver=request.user
            )

        except FreelancerConnection.DoesNotExist:

            return Response(
                {'error': 'Request not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        connection.status = 'ACCEPTED'
        connection.save()

        return Response(
            {'message': 'Connection accepted'}
        )
        


class RejectConnectionRequestView(
    APIView
):

    permission_classes = [IsAuthenticated]

    def post(self, request, pk):

        try:

            connection = FreelancerConnection.objects.get(
                id=pk,
                receiver=request.user
            )

        except FreelancerConnection.DoesNotExist:

            return Response(
                {'error': 'Request not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        connection.status = 'REJECTED'
        connection.save()

        return Response(
            {'message': 'Connection rejected'}
        )




class FriendsListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        sent = FreelancerConnection.objects.filter(
            sender=request.user,
            status='ACCEPTED'
        )

        received = FreelancerConnection.objects.filter(
            receiver=request.user,
            status='ACCEPTED'
        )

        friends = []

        for connection in sent:

            friends.append({
                "id": connection.receiver.id,
                "username": connection.receiver.username,
                "display_name": connection.receiver.display_name,
            })

        for connection in received:

            friends.append({
                "id": connection.sender.id,
                "username": connection.sender.username,
                "display_name": connection.sender.display_name,
            })

        return Response(friends)



class ConnectionStatusView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):

        current_user = request.user

        try:
            other_user = User.objects.get(
                id=user_id
            )

        except User.DoesNotExist:

            return Response(
                {'error': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        connection = FreelancerConnection.objects.filter(
            sender=current_user,
            receiver=other_user
        ).first()

        reverse_connection = FreelancerConnection.objects.filter(
            sender=other_user,
            receiver=current_user
        ).first()

        if connection:

            return Response({
                'status': connection.status,
                'direction': 'sent',
                'request_id': connection.id,
            })

        if reverse_connection:

            return Response({
                'status': reverse_connection.status,
                'direction': 'received',
                'request_id': reverse_connection.id,
            })

        return Response({
            'status': 'NONE'
        })
        
        
class SentConnectionRequestsView(
    APIView
):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        requests = FreelancerConnection.objects.filter(
            sender=request.user,
            status='PENDING'
        )

        serializer = FreelancerConnectionSerializer(
            requests,
            many=True
        )

        return Response(serializer.data)



class SendCollaborationInviteView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def post(self, request):

        sender = request.user

        receiver_id = request.data.get(
            "receiver_id"
        )

        project_id = request.data.get(
            "project_id"
        )

        role_requirement_id = request.data.get(
            "role_requirement_id"
        )

        try:

            receiver = User.objects.get(
                id=receiver_id
            )

            project = Project.objects.get(
                id=project_id
            )

            role_requirement = (
                ProjectRoleRequirement.objects.get(
                    id=role_requirement_id
                )
            )

        except Exception:

            return Response(
                {
                    "error":
                    "Invalid data"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        invite = (
            CollaborationInvite.objects.create(
                sender=sender,
                receiver=receiver,
                project=project,
                role_requirement=role_requirement,
            )
        )

        serializer = (
            CollaborationInviteSerializer(
                invite
            )
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )



class AcceptCollaborationInviteView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def post(self, request, pk):

        try:

            invite = CollaborationInvite.objects.get(pk=pk)

        except CollaborationInvite.DoesNotExist:

            return Response(
                {"error": "Invite not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        if invite.receiver != request.user:

            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        if invite.status != "PENDING":

            return Response(
                {"error": "Invite already processed"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = AcceptInviteSerializer(data=request.data)

        if not serializer.is_valid():

            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        gig = serializer.validated_data["selected_gig"]

        if gig.freelancer.user != request.user:

            return Response(
                {"error": "You don't own this gig"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if gig.job_category != invite.role_requirement.job_category:

            return Response(
                {"error": "Gig category doesn't match invited role"}
            )

        invite.selected_gig = gig
        invite.proposed_price = serializer.validated_data["proposed_price"]
        invite.response_note = serializer.validated_data.get(
            "response_note",
            ""
        )

        invite.status = "ACCEPTED"

        team = Team.objects.create(
            name=f"{invite.sender.username}-{invite.receiver.username}",
            project=invite.role_requirement.project,
            created_by=invite.sender,
        )
        
        invite.team = team

        invite.save()

        TeamMember.objects.create(
            team=team,
            user=invite.sender,
            gig=None,
        )

        TeamMember.objects.create(
            team=team,
            user=invite.receiver,
            gig=gig,
        )
        
        return Response(
            CollaborationInviteSerializer(invite).data
        )



class RejectCollaborationInviteView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def post(self, request, pk):

        try:

            invite = (
                CollaborationInvite.objects.get(
                    pk=pk
                )
            )

        except CollaborationInvite.DoesNotExist:

            return Response(
                {
                    "error":
                    "Invite not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        if invite.receiver != request.user:

            return Response(
                {
                    "error":
                    "Permission denied"
                },
                status=status.HTTP_403_FORBIDDEN
            )

        invite.status = "REJECTED"

        invite.save()

        return Response(
            {
                "message":
                "Invite rejected"
            }
        )
    

class FriendInviteFeedView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def get(
        self,
        request,
        friend_id
    ):

        invites = (
            CollaborationInvite.objects.filter(
                sender_id__in=[
                    request.user.id,
                    friend_id
                ],
                receiver_id__in=[
                    request.user.id,
                    friend_id
                ]
            )
            .order_by(
                "-created_at"
            )
        )

        serializer = (
            CollaborationInviteSerializer(
                invites,
                many=True
            )
        )

        return Response(
            serializer.data
        )



class AcceptedProjectInvitesView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, project_id):

        invites = CollaborationInvite.objects.filter(
            sender=request.user,
            project_id=project_id,
            status="ACCEPTED"
        )

        serializer = CollaborationInviteSerializer(
            invites,
            many=True
        )

        return Response(serializer.data)



class MyWorkspacesView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        participants = WorkspaceParticipant.objects.filter(
            user=request.user
        ).select_related(
            "workspace",
            "workspace__project",
        )

        workspaces = [
            participant.workspace
            for participant in participants
        ]

        serializer = WorkspaceSerializer(
            workspaces,
            many=True,
        )

        return Response(serializer.data)
    
    
class WorkspaceDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, workspace_id):
        
        try:

            workspace = Workspace.objects.get(
                pk=workspace_id
            )

        except Workspace.DoesNotExist:

            return Response(
                {
                    "error": "Workspace not found"
                },
                status=404
            )

        allowed = WorkspaceParticipant.objects.filter(
            workspace=workspace,
            user=request.user,
        ).exists()

        if not allowed:
            
            return Response(

                {
                    "error": "Permission denied"
                },
                status=403
            )
            
        messages = list(
            WorkspaceMessage.objects.filter(
                workspace=workspace
            )
        )

        files = list(
            WorkspaceFile.objects.filter(
                workspace=workspace
            )
        )

        timeline = messages + files

        timeline.sort(
            key=lambda item: item.created_at
        )

        return Response({

            "workspace": WorkspaceSerializer(
                workspace
            ).data,

            "timeline": WorkspaceTimelineSerializer(
                timeline,
                many=True,
            ).data,

        })



class WorkspaceFeedView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, workspace_id):

        try:

            workspace = Workspace.objects.get(
                pk=workspace_id
            )

        except Workspace.DoesNotExist:

            return Response(
                {
                    "error": "Workspace not found"
                },
                status=404
            )

        if not is_workspace_participant(
            request.user,
            workspace
        ):

            return Response(
                {
                    "error": "Permission denied"
                },
                status=403
            )

        messages = WorkspaceMessage.objects.filter(
            workspace=workspace
        )

        files = WorkspaceFile.objects.filter(
            workspace=workspace
        )

        return Response({

            "messages":
                WorkspaceMessageSerializer(
                    messages,
                    many=True
                ).data,

            "files":
                WorkspaceFileSerializer(
                    files,
                    many=True
                ).data,

        })
    


class SendWorkspaceMessageView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, workspace_id):

        try:

            workspace = Workspace.objects.get(
                pk=workspace_id
            )

        except Workspace.DoesNotExist:

            return Response(
                {
                    "error": "Workspace not found"
                },
                status=404
            )

        if not is_workspace_participant(
            request.user,
            workspace
        ):

            return Response(
                {
                    "error": "Permission denied"
                },
                status=403
            )

        text = request.data.get(
            "message"
        )

        if not text:

            return Response(
                {
                    "error": "Message required"
                },
                status=400
            )

        message = WorkspaceMessage.objects.create(

            workspace=workspace,

            sender=request.user,

            message=text,

        )

        serializer = WorkspaceMessageSerializer(
            message
        )

        return Response(
            serializer.data,
            status=201
        )


class UploadWorkspaceFileView(APIView):

    permission_classes = [IsAuthenticated]

    parser_classes = [
        MultiPartParser,
        FormParser,
    ]

    def post(self, request, workspace_id):

        try:

            workspace = Workspace.objects.get(
                pk=workspace_id
            )

        except Workspace.DoesNotExist:

            return Response(
                {
                    "error": "Workspace not found"
                },
                status=404
            )

        if not is_workspace_participant(
            request.user,
            workspace
        ):

            return Response(
                {
                    "error": "Permission denied"
                },
                status=403
            )

        uploaded_file = request.FILES.get(
            "file"
        )

        if not uploaded_file:

            return Response(
                {
                    "error": "File required"
                },
                status=400
            )

        obj = WorkspaceFile.objects.create(

            workspace=workspace,

            sender=request.user,

            file=uploaded_file,

        )

        serializer = WorkspaceFileSerializer(
            obj
        )

        return Response(
            serializer.data,
            status=201
        )


class MyWorkspacesView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        workspaces = Workspace.objects.filter(
            participants__user=request.user
        ).distinct()

        serializer = WorkspaceSerializer(
            workspaces,
            many=True
        )

        return Response(serializer.data)



class WorkspacePaymentView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(
        self,
        request,
        workspace_id
    ):

        try:

            workspace = Workspace.objects.get(
                pk=workspace_id
            )

        except Workspace.DoesNotExist:

            return Response(
                {
                    "error": "Workspace not found"
                },
                status=404
            )

        if not is_workspace_participant(
            request.user,
            workspace
        ):

            return Response(
                {
                    "error": "Permission denied"
                },
                status=403
            )

        serializer = WorkspacePaymentSerializer(
            workspace.payment
        )

        return Response(
            serializer.data
        )



class UpdateWorkspacePaymentView(APIView):

    permission_classes = [ IsAuthenticated ]

    def put(
        self,
        request,
        workspace_id
    ):

        try:

            workspace = Workspace.objects.get(
                pk=workspace_id
            )

        except Workspace.DoesNotExist:

            return Response(
                {
                    "error": "Workspace not found"
                },
                status=404
            )

        if workspace.client != request.user:

            return Response(
                {
                    "error": "Only client can update payment."
                },
                status=403
            )

        payment = workspace.payment

        action = request.data.get(
            "action"
        )

        if action == "pay":
            if payment.status != "UNPAID":

                return Response(
                    {
                        "error":
                        "Already paid."
                    },
                    status=400
                )

            payment.status = "HELD"
            payment.save()

        elif action == "release":

            if payment.status != "HELD":

                return Response(
                    {
                        "error":
                        "Payment not held."
                    },
                    status=400
                )

            payment.status = "RELEASED"
            payment.save()

            if workspace.team:

                members = TeamMember.objects.filter(
                    team=workspace.team
                )

                for member in members:

                    if member.gig:
                        user = member.user
                        user.balance += member.gig.price
                        user.save()

            else:

                application = workspace.application
                user = application.applicant_user
                user.balance += payment.amount
                user.save()

        else:

            return Response(
                {
                    "error":
                    "Invalid action."
                },
                status=400
            )

        serializer = WorkspacePaymentSerializer(
            payment
        )

        return Response(
            serializer.data
        )



class WorkspaceReviewDataView(APIView):

    permission_classes = [ IsAuthenticated ]

    def get(
        self,
        request,
        workspace_id
    ):

        try:

            workspace = Workspace.objects.get(
                pk=workspace_id
            )

        except Workspace.DoesNotExist:

            return Response(
                {
                    "error":
                    "Workspace not found"
                },
                status=404
            )

        if workspace.client != request.user:

            return Response(
                {
                    "error":
                    "Permission denied"
                },
                status=403
            )

        if workspace.payment.status != "RELEASED":

            return Response(
                {
                    "error":
                    "Release payment first."
                }, status=400 )

        members = []

        if workspace.team:

            team_members = TeamMember.objects.filter( team=workspace.team )
            
            application = workspace.application

            for member in team_members:

                if member.user == application.applicant_user:

                    gig = application.selected_gig

                else:

                    gig = member.gig

                if gig is None:
                    continue

                reviewed = Review.objects.filter(
                    workspace=workspace,
                    freelancer=member.user,
                ).exists()

                members.append({
                    "freelancer_id": member.user.id,
                    "freelancer_name": member.user.display_name,
                    "gig_id": gig.id,
                    "gig_title": gig.title,
                    "already_reviewed": reviewed,
                })

        else:

            application = workspace.application

            reviewed = Review.objects.filter(
                workspace=workspace,
                freelancer=application.applicant_user,
            ).exists()

            members.append({

                "freelancer_id": application.applicant_user.id,
                "freelancer_name": application.applicant_user.display_name,
                "gig_id": application.selected_gig.id,
                "gig_title": application.selected_gig.title,
                "already_reviewed": reviewed,
            })

        serializer = ReviewTargetSerializer(
            members,
            many=True,
        )

        return Response(
            serializer.data
        )


class SubmitReviewView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def post(
        self,
        request,
        workspace_id
    ):

        try:

            workspace = Workspace.objects.get(
                pk=workspace_id
            )

        except Workspace.DoesNotExist:

            return Response(
                {
                    "error":
                    "Workspace not found"
                },
                status=404
            )

        if workspace.client != request.user:

            return Response(
                {
                    "error":
                    "Permission denied"
                },
                status=403
            )

        if workspace.payment.status != "RELEASED":

            return Response(
                {
                    "error":
                    "Payment not released."
                },
                status=400
            )

        freelancer = User.objects.get(
            pk=request.data["freelancer"]
        )

        gig = Gig.objects.get(
            pk=request.data["gig"]
        )

        if Review.objects.filter(

            workspace=workspace,

            freelancer=freelancer,

        ).exists():

            return Response(
                {
                    "error":
                    "Already reviewed."
                },
                status=400
            )

        review = Review.objects.create(

            workspace=workspace,

            client=request.user,

            freelancer=freelancer,

            gig=gig,

            rating=request.data["rating"],

            comment=request.data.get(
                "comment",
                "",
            ),

        )
        
        if workspace.team:

            total_reviews_required = TeamMember.objects.filter(
                team=workspace.team
            ).count()

        else:

            total_reviews_required = 1

        submitted_reviews = Review.objects.filter(
            workspace=workspace
        ).count()

        if submitted_reviews >= total_reviews_required:

            project = workspace.project

            project.status = "COMPLETED"

            project.save()


        serializer = ReviewSerializer(
            review
        )

        return Response(
            serializer.data,
            status=201,
        )