from rest_framework import serializers
from .models import (JobCategory, Skill, Gig, Project, ProjectRoleRequirement, Application, WorkProposal,  )
from collaborations.models import (Team, TeamMember, Review)
from accounts.serializers import UserSerializer



class JobCategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model= JobCategory
        fields= [
            'id',
            'name',
            'professional_title',
            'category_group',
        ]

class SkillSerializer(serializers.ModelSerializer):
    
    class Meta:
        model= Skill
        fields= [
            'id',
            'name',
        ]
        
class GigSerializer(serializers.ModelSerializer):
    
    freelancer = serializers.SerializerMethodField()    

    
    job_category= JobCategorySerializer(read_only= True)
    
    job_category_id= serializers.PrimaryKeyRelatedField(
        queryset= JobCategory.objects.all(),
        source= 'job_category',
        write_only= True
    )
    
    skills= SkillSerializer(read_only= True, many= True)
    
    skill_ids= serializers.PrimaryKeyRelatedField(
        queryset= Skill.objects.all(),
        many= True,
        write_only= True,
        source= "skills"
    )
    
    average_rating = serializers.SerializerMethodField()

    reviews = serializers.SerializerMethodField()



    def get_average_rating(self, obj):

        reviews = Review.objects.filter(
            gig=obj
        )

        if not reviews.exists():

            return None

        total = sum(
            review.rating
            for review in reviews
        )

        return round(
            total / reviews.count(),
            1
        )


    def get_reviews(self, obj):

        reviews = Review.objects.filter(
            gig=obj
        ).order_by("-created_at")

        return GigReviewSerializer(

            reviews,

            many=True

        ).data
        
    def get_freelancer(self, obj):
        return {
            "id": obj.freelancer.user.id,
            "username": obj.freelancer.user.username,
            "display_name": obj.freelancer.user.display_name,
        }
    
    class Meta:
        
        model= Gig
        fields= [
            'id',
            'freelancer',
            'job_category',
            'job_category_id',
            'skills',
            'skill_ids',
            'title',
            'description',
            'experience_level',
            'price',
            'delivery_time',
            'revisions',
            'thumbnail',
            'status',
            'average_rating',
            'reviews',
            'created_at',
        ]
        
        read_only_fields= [
            'status',
            'created_at',
        ]


class ProjectRoleRequirementSerializer(
    serializers.ModelSerializer
):

    job_category = JobCategorySerializer(
        read_only=True
    )

    job_category_id = serializers.PrimaryKeyRelatedField(
        queryset=JobCategory.objects.all(),
        source="job_category",
        write_only=True,
    )

    class Meta:

        model = ProjectRoleRequirement

        fields = [
            "id",
            "job_category",
            "job_category_id",
            "required_count",
            "allocated_budget",
        ]

class ProjectRoleRequirementCreateSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = ProjectRoleRequirement

        fields = [
            "job_category",
            "required_count",
            "allocated_budget",
        ]


class ProjectSerializer(
    serializers.ModelSerializer
):

    client = serializers.StringRelatedField(
        read_only=True
    )
    
    client_id = serializers.IntegerField(
        source="client.id",
        read_only=True
    )

    total_budget = serializers.ReadOnlyField()

    roles = ProjectRoleRequirementCreateSerializer(
        many=True,
        write_only=True
    )
    
    role_requirements = ProjectRoleRequirementSerializer(
        many=True,
        read_only=True
    )

    class Meta:

        model = Project

        fields = [
            "id",
            "client",
            "client_id",
            "title",
            "description",
            "deadline",
            "status",
            "total_budget",
            "roles",
            "role_requirements",
            "created_at",
        ]

        read_only_fields = [
            "status",
            "total_budget",
            "created_at",
        ]

    def create(self, validated_data):

        roles_data = validated_data.pop("roles")

        project = Project.objects.create(
            **validated_data
        )

        for role_data in roles_data:

            ProjectRoleRequirement.objects.create(
                project=project,
                **role_data
            )

        return project
    

class ProjectBasicSerializer(serializers.ModelSerializer):

    client = serializers.StringRelatedField(
        read_only=True
    )

    class Meta:

        model = Project

        fields = [
            'id',
            'title',
            'client',
        ]
        

class ApplicationSerializer(serializers.ModelSerializer):

    project = ProjectBasicSerializer(
        read_only=True
    )

    applicant_user = UserSerializer(
        read_only=True
    )

    
    team = serializers.SerializerMethodField()

    def get_team(self, obj):

        if not obj.team:
            return None

        members = []

        for member in obj.team.members.select_related(
            "user",
            "gig"
        ):

            members.append({
                "id": member.id,
                "user": {
                    "id": member.user.id,
                    "display_name": member.user.display_name,
                    "username": member.user.username,
                },
                
                "gig": None if member.gig is None else {
                    "id": member.gig.id,
                    "title": member.gig.title,
                }
            })

        return {

            "id": obj.team.id,

            "name": obj.team.name,

            "members": members,

        }
    
    selected_gig = GigSerializer(
        read_only=True
    )
        


    class Meta:

        model = Application

        fields = [
            'id',
            'project',
            'applicant_user',
            'team',
            'selected_gig',
            'proposed_price',
            'cover_letter',
            'status',
            
            'created_at',
            
        ]

        read_only_fields = [
            'status',
            'created_at',
        ]
        
        

class WorkProposalSerializer(
    serializers.ModelSerializer
):

    project = ProjectBasicSerializer(
        read_only=True
    )

    sender = UserSerializer(
        read_only=True
    )

    receiver = UserSerializer(
        read_only=True
    )

    class Meta:

        model = WorkProposal

        fields = [
            'id',
            'project',
            'sender',
            'receiver',
            'proposed_price',
            'message',
            'status',
            'counter_message',
            'created_at',
        ]


class CounterProposalSerializer(serializers.Serializer):

    counter_message = serializers.CharField()
    
    

class GigReviewSerializer(serializers.ModelSerializer):

    reviewer = serializers.SerializerMethodField()

    class Meta:

        model = Review

        fields = [
            "id",
            "reviewer",
            "rating",
            "comment",
            "created_at",
        ]

    def get_reviewer(self, obj):

        return UserSerializer(obj.client).data