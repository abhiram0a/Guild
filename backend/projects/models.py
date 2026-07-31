from django.db import models
from accounts.models import FreelancerProfile, User
from decimal import Decimal

from django.conf import settings



class JobCategory(models.Model):
    
    name= models.CharField(max_length=100, unique=True)
    professional_title= models.CharField(max_length=100)
    category_group= models.CharField(max_length=100)
    
    def __str__(self):
        return self.name



class Skill(models.Model):
    name= models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name



class Gig(models.Model):

    STATUS_CHOICES = [
        ('ACTIVE', 'Active'),
        ('PAUSED', 'Paused'),
    ]

    EXPERIENCE_LEVEL_CHOICES = [
        ('BEGINNER', 'Beginner'),
        ('INTERMEDIATE', 'Intermediate'),
        ('EXPERT', 'Expert'),
    ]

    freelancer = models.ForeignKey(
        FreelancerProfile,
        on_delete=models.CASCADE,
        related_name='gigs'
    )

    job_category = models.ForeignKey(
        JobCategory,
        on_delete=models.CASCADE,
        related_name='gigs'
    )

    skills = models.ManyToManyField(
        Skill,
        related_name='gigs',
        blank=True
    )

    title = models.CharField(max_length=200)

    description = models.TextField()

    experience_level = models.CharField(
        max_length=20,
        choices=EXPERIENCE_LEVEL_CHOICES
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    delivery_time = models.PositiveIntegerField(
        help_text="Delivery time in days"
    )

    revisions = models.PositiveIntegerField(
        null= True,
        blank=True,
        default=0
    )

    thumbnail = models.ImageField(
        upload_to='gig_thumbnails/',
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='ACTIVE'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Project(models.Model):

    STATUS_CHOICES = [
        ('OPEN', 'Open'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
        ('CANCELLED', 'Cancelled'),
    ]

    client = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='projects'
    )

    title = models.CharField(max_length=200)

    description = models.TextField()
    
    deadline = models.DateField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='OPEN'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    @property
    def total_budget(self):
        return sum(
            (role.allocated_budget for role in self.role_requirements.all()),
            Decimal("0.00")
        )
    def __str__(self):
        return self.title


class ProjectRoleRequirement(models.Model):

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='role_requirements'
    )

    job_category = models.ForeignKey(
        JobCategory,
        on_delete=models.CASCADE
    )

    required_count = models.PositiveIntegerField()

    allocated_budget = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    def __str__(self):
        return (
            f"{self.project.title} - "
            f"{self.job_category.name}"
        )



class Application(models.Model):

    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('ACCEPTED', 'Accepted'),
        ('REJECTED', 'Rejected'),
    ]

    project = models.ForeignKey(
        'Project',
        on_delete=models.CASCADE,
        related_name='applications'
    )

    applicant_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='applications'
    )

    team = models.ForeignKey(
        "collaborations.Team",
        on_delete=models.CASCADE,
        related_name="applications",
        null=True,
        blank=True,
    )
    
    selected_gig = models.ForeignKey(
        Gig,
        on_delete=models.CASCADE,
        related_name='applications'
    )

    proposed_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    cover_letter = models.TextField(
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='PENDING'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.applicant_user.username} -> {self.project.title}"
    


class WorkProposal(models.Model):

    application = models.ForeignKey(
        Application,
        on_delete=models.CASCADE,
        related_name="proposals",
        null=True,
        blank=True,
    )

    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('ACCEPTED', 'Accepted'),
        ('REJECTED', 'Rejected'),
        ('COUNTERED', 'Countered'),
    ]

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE
    )

    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='sent_proposals'
    )

    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='received_proposals'
    )

    proposed_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    message = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='PENDING'
    )
    
    counter_message = models.TextField(
        blank=True,
        default=""
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )