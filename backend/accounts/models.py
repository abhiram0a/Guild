from django.db import models
from django.contrib.auth.models import AbstractUser


class User (AbstractUser):

    email= models.EmailField(unique=True)
    display_name= models.CharField(max_length=50)
    bio= models.TextField(blank=True, null=True)
    # profile_picture= models.ImageField(upload_to="profile_pictures/", blank=True, null=True)
    profile_picture = models.ImageField(
        upload_to="profile_pictures/",
        default="profile_pictures/default_profile.jpg",
        blank=True
    )    
    is_freelancer= models.BooleanField(default=False)
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    

    def __str__(self):
        return self.username

class FreelancerProfile (models.Model):
    user= models.OneToOneField(User, on_delete=models.CASCADE, related_name='freelancer_profile')
    tagline= models.CharField(max_length=200)
    experience_description= models.TextField()
    years_of_experience= models.PositiveIntegerField(default=0)
    availability_status= models.BooleanField(default=True)
    portfolio_link= models.URLField(blank=True, null=True)
    total_earnings= models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at= models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} Freelancer Profile"