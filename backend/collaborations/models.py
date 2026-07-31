from django.db import models
from django.conf import settings
from projects.models import Project, Gig, ProjectRoleRequirement
from accounts.models import User


class FreelancerConnection(models.Model):

    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('ACCEPTED', 'Accepted'),
        ('REJECTED', 'Rejected'),
    ]

    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='sent_connections'
    )

    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='received_connections'
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='PENDING'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        unique_together = ('sender', 'receiver')

    def __str__(self):
        return f"{self.sender.username} -> {self.receiver.username}"
    
    
class Team(models.Model):

    name = models.CharField(max_length=200)

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='teams'
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='created_teams'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name


class TeamMember(models.Model):

    team = models.ForeignKey(
        Team,
        on_delete=models.CASCADE,
        related_name='members'
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    gig = models.ForeignKey(
        Gig,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    joined_at = models.DateTimeField(
        auto_now_add=True
    )


class CollaborationInvite(models.Model):

    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('ACCEPTED', 'Accepted'),
        ('REJECTED', 'Rejected'),
    ]

    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='sent_collaboration_invites'
    )

    receiver = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='received_collaboration_invites'
    )

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='collaboration_invites'
    )

    role_requirement = models.ForeignKey(
        ProjectRoleRequirement,
        on_delete=models.CASCADE,
        related_name='collaboration_invites'
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='PENDING'
    )

    selected_gig = models.ForeignKey(
        Gig,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    proposed_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )

    response_note = models.TextField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )


class Workspace(models.Model):

    application = models.OneToOneField(
        "projects.Application",
        on_delete=models.CASCADE,
        related_name="workspace",
        null=True,
        blank=True,
    )
    
    project = models.ForeignKey(
        "projects.Project",
        on_delete=models.CASCADE,
        related_name="workspaces"
    )

    client = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="client_workspaces"
    )

    team = models.ForeignKey(
        Team,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="workspaces"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return (
            f"Workspace - "
            f"{self.project.title}"
        )


class WorkspaceParticipant(models.Model):

    ROLE_CHOICES = [

        ("CLIENT", "Client"),

        ("FREELANCER", "Freelancer"),

    ]

    workspace = models.ForeignKey(
        Workspace,
        on_delete=models.CASCADE,
        related_name="participants"
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="workspace_memberships"
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES
    )

    joined_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:

        unique_together = [
            "workspace",
            "user"
        ]

    def __str__(self):

        return (

            f"{self.user.username} "

            f"({self.role})"

        )


class WorkspaceMessage(models.Model):

    workspace = models.ForeignKey(
        Workspace,
        on_delete=models.CASCADE,
        related_name="messages",
    )

    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="workspace_messages",
    )

    message = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:

        ordering = ["created_at"]

    def __str__(self):

        return (
            f"{self.sender.username}: "
            f"{self.message[:30]}"
        )


class WorkspaceFile(models.Model):

    workspace = models.ForeignKey(
        Workspace,
        on_delete=models.CASCADE,
        related_name="files",
    )

    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="workspace_files",
    )

    file = models.FileField(
        upload_to="workspace_files/"
    )

    caption = models.CharField(
        max_length=255,
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:

        ordering = ["created_at"]

    def __str__(self):

        return self.file.name



class WorkspacePayment(models.Model):

    PAYMENT_STATUS = [
        ("UNPAID", "Unpaid"),
        ("HELD", "Held"),
        ("RELEASED", "Released"),
    ]

    workspace = models.OneToOneField(
        Workspace,
        on_delete=models.CASCADE,
        related_name="payment",
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS,
        default="UNPAID",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):

        return (
            f"{self.workspace.project.title}"
            f" - {self.status}"
        )



class Review(models.Model):

    workspace = models.ForeignKey(
        Workspace,
        on_delete=models.CASCADE,
        related_name="reviews",
    )

    client = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="reviews_given",
    )

    freelancer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="reviews_received",
    )

    gig = models.ForeignKey(
        Gig,
        on_delete=models.CASCADE,
        related_name="reviews",
    )

    rating = models.PositiveSmallIntegerField()

    comment = models.TextField(
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:

        unique_together = (
            "workspace",
            "freelancer",
        )

    def __str__(self):

        return (
            f"{self.client.username}"
            f" -> "
            f"{self.freelancer.username}"
        )