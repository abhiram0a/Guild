from rest_framework import serializers

from .models import (
    FreelancerConnection,
    Team,
    TeamMember,
    CollaborationInvite,
    Workspace,
    WorkspaceParticipant,
    WorkspaceMessage,
    WorkspaceFile,
    WorkspacePayment,
    Review,
)



from projects.models import Gig
from accounts.serializers import UserSerializer


class FreelancerConnectionSerializer(
    serializers.ModelSerializer
):

    sender_username = serializers.CharField(
        source='sender.username',
        read_only=True
    )

    receiver_username = serializers.CharField(
        source='receiver.username',
        read_only=True
    )

    class Meta:
        model = FreelancerConnection

        fields = [
            'id',
            'sender',
            'receiver',
            'sender_username',
            'receiver_username',
            'status',
            'created_at',
        ]

        read_only_fields = [
            'sender',
            'status',
            'created_at',
        ]





class TeamSerializer(serializers.ModelSerializer):

    class Meta:
        model = Team

        fields = [
            'id',
            'name',
            'project',
            'created_by',
            'created_at',
        ]


class TeamMemberSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    class Meta:
        model = TeamMember

        fields = [
            'id',
            'team',
            'user',
            'gig',
            'joined_at',
        ]


class GigMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gig
        fields = ["id", "title", "price"]
        
class CollaborationInviteSerializer(serializers.ModelSerializer):

    sender = UserSerializer(read_only=True)

    receiver = UserSerializer(read_only=True)

    selected_gig = GigMiniSerializer(read_only=True)

    selected_gig_id = serializers.PrimaryKeyRelatedField(
        queryset=Gig.objects.all(),
        source="selected_gig",
        write_only=True,
        required=False
    )
    
    project = serializers.SerializerMethodField()
    
    role_requirement = serializers.SerializerMethodField()


    class Meta:

        model = CollaborationInvite

        fields = [
            "id",
            "sender",
            "receiver",
            "project",
            "role_requirement",
            "status",
            "selected_gig",
            "selected_gig_id",
            "proposed_price",
            "response_note",
            "created_at",
        ]

    def get_project(self, obj):

        return {

            "id": obj.project.id,

            "title": obj.project.title,

            "status": obj.project.status,

        }

    def get_role_requirement(self, obj):

        return {

            "id": obj.role_requirement.id,

            "job_category": {

                "id": obj.role_requirement.job_category.id,

                "name": obj.role_requirement.job_category.name,

            },

            "allocated_budget": obj.role_requirement.allocated_budget,

        }
        





class AcceptInviteSerializer(serializers.Serializer):

    selected_gig = serializers.PrimaryKeyRelatedField(
        queryset=Gig.objects.all()
    )

    proposed_price = serializers.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    response_note = serializers.CharField(
        required=False,
        allow_blank=True
    )



class AcceptedProjectInviteSerializer(serializers.ModelSerializer):

    receiver = UserSerializer(read_only=True)

    selected_gig = GigMiniSerializer(read_only=True)

    role_requirement = serializers.SerializerMethodField()

    class Meta:

        model = CollaborationInvite

        fields = [
            "id",
            "receiver",
            "role_requirement",
            "selected_gig",
            "proposed_price",
            "response_note",
        ]

    def get_role_requirement(self, obj):

        return {
            "id": obj.role_requirement.id,
            "job_category": obj.role_requirement.job_category.name,
        }




class WorkspaceParticipantSerializer(
    serializers.ModelSerializer
):

    user = UserSerializer(
        read_only=True
    )

    class Meta:
        model = WorkspaceParticipant
        
        fields = [
            "id",
            "user",
            "role",
            "joined_at",
        ]



class WorkspacePaymentSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = WorkspacePayment

        fields = [
            "id",
            "amount",
            "status",
            "created_at",
        ]
        
        
class WorkspaceSerializer(
    serializers.ModelSerializer
):

    project = serializers.SerializerMethodField()

    client = UserSerializer(
        read_only=True
    )

    participants = WorkspaceParticipantSerializer(
            many=True,
            read_only=True
        )
    
    payment = WorkspacePaymentSerializer(
       read_only=True
    )
    
    class Meta:
        model = Workspace

        fields = [
            "id",
            "application",
            "project",
            "client",
            "team",
            "participants",
            "created_at",
            "payment"
        ]

    def get_project(
        self,
        obj
    ):

        return {

            "id":
            obj.project.id,

            "title":
            obj.project.title,

            "status":
            obj.project.status,

        }
        


class WorkspaceMessageSerializer(
    serializers.ModelSerializer
):

    sender = UserSerializer(
        read_only=True
    )

    type = serializers.SerializerMethodField()

    class Meta:

        model = WorkspaceMessage

        fields = [
            "id",
            "type",
            "sender",
            "message",
            "created_at",
        ]

    def get_type(
        self,
        obj
    ):

        return "message"


class WorkspaceFileSerializer(
    serializers.ModelSerializer
):

    sender = UserSerializer(
        read_only=True
    )

    type = serializers.SerializerMethodField()

    class Meta:

        model = WorkspaceFile

        fields = [
            "id",
            "type",
            "sender",
            "file",
            "caption",
            "created_at",
        ]

    def get_type(
        self,
        obj
    ):

        return "file"




class WorkspaceTimelineSerializer(serializers.Serializer):

    def to_representation(self, instance):

        if isinstance(instance, WorkspaceMessage):

            data = WorkspaceMessageSerializer(instance).data
            data["type"] = "message"

            return data

        if isinstance(instance, WorkspaceFile):

            data = WorkspaceFileSerializer(instance).data
            data["type"] = "file"

            return data

        return {}


class ReviewSerializer(serializers.ModelSerializer):

    client = UserSerializer(
        read_only=True,
    )

    freelancer = UserSerializer(
        read_only=True,
    )

    selected_gig = serializers.SerializerMethodField()

    class Meta:

        model = Review

        fields = [
            "id",
            "client",
            "freelancer",
            "selected_gig",
            "rating",
            "comment",
            "created_at",
        ]

    def get_selected_gig(
        self,
        obj
    ):

        return {
            "id": obj.gig.id,
            "title": obj.gig.title,
        }


class ReviewTargetSerializer(serializers.Serializer):
    
    freelancer_id = serializers.IntegerField()
    freelancer_name = serializers.CharField()
    gig_id = serializers.IntegerField()
    gig_title = serializers.CharField()
    already_reviewed = serializers.BooleanField()