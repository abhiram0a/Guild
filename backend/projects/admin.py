from django.contrib import admin
from .models import (JobCategory, Skill, Gig, Project, ProjectRoleRequirement, Application, WorkProposal)


admin.site.register(JobCategory)
admin.site.register(Skill)
admin.site.register(Gig)
admin.site.register(Project)
admin.site.register(ProjectRoleRequirement)
admin.site.register(Application)
admin.site.register(WorkProposal)