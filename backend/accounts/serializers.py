from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import FreelancerProfile



User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User

        fields = [
            'id',
            'username',
            'email',
            'display_name',
            'bio',
            'profile_picture',
            'is_freelancer',
            'balance',  
        ]
        read_only_fields= ['is_freelancer']



class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User

        fields = [
            'username',
            'email',
            'password',
            'display_name',
        ]

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            display_name=validated_data['display_name'],
        )

        return user



class FreelancerProfileSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    class Meta:
        model = FreelancerProfile

        fields = [
            'id',
            'user',
            'tagline',
            'experience_description',
            'years_of_experience',
            'availability_status',
            'portfolio_link',
            'total_earnings',
            'created_at',
        ]