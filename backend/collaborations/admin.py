from django.contrib import admin
from .models import FreelancerConnection, Team, TeamMember, CollaborationInvite, Workspace, WorkspaceParticipant, WorkspaceFile, WorkspaceMessage, WorkspacePayment, Review

admin.site.register(FreelancerConnection)
admin.site.register(Team)
admin.site.register(TeamMember)
admin.site.register(CollaborationInvite)
admin.site.register(Workspace)
admin.site.register(WorkspaceParticipant)
admin.site.register(WorkspaceMessage)
admin.site.register(WorkspaceFile)
admin.site.register(WorkspacePayment)
admin.site.register(Review)