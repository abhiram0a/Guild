from django.urls import path

from .views import (
    JobCategoryListView,
    SkillListView,
    CreateSkillView,
    CreateGigView,
    MyGigsView,
    GigDetailView,
    GigListView,
    UpdateGigView,
    DeleteGigView,
    CreateProjectView,
    ProjectListView,
    ProjectDetailView,
    MyProjectsView,
    # AddRoleRequirementView,
    ProjectRoleListView,
    UpdateProjectView,
    DeleteProjectView,
    ApplyToProjectView,
    MyApplicationsView,
    ProjectApplicationsView,
    SendProposalView,
    ReceivedProposalsView,
    SentProposalsView,
    UpdateProposalStatusView,
    MyMatchingGigsView,
    TeamApplicationView,
    AcceptedTeamView,
    ResendProposalView,
)


urlpatterns = [
    path(
        'categories/',
        JobCategoryListView.as_view(),
        name= 'categories'
    ),

    path(
        'skills/',
        SkillListView.as_view(),
        name='skills',
    ),

    path(
        'skills/create/',
        CreateSkillView.as_view(),
        name='create_skill',
    ),

    path(
        'gigs/create/',
        CreateGigView.as_view(),
        name='create_gig',
    ),

    path(
        'my-gigs/',
        MyGigsView.as_view(),
        name='my_gigs',
    ),
    
    path(
        "gigs/",
        GigListView.as_view(),
        name="gig_list",
    ),

    path(
        'gigs/<int:pk>/',
        GigDetailView.as_view(),
        name='gig_detail',
    ),

    path(
        'gigs/<int:pk>/edit/',
        UpdateGigView.as_view(),
        name='update_gig',
    ),

    path(
        'gigs/<int:pk>/delete/',
        DeleteGigView.as_view(),
        name='delete_gig',
    ),
    
    path(
        "projects/create/",
        CreateProjectView.as_view(),
        name="create_project",
    ),

    path(
        "projects/",
        ProjectListView.as_view(),
        name="project_list",
    ),

    path(
        "projects/my-projects/",
        MyProjectsView.as_view(),
        name="my_projects",
    ),

    # path(
    #     "projects/<int:pk>/roles/add/",
    #     AddRoleRequirementView.as_view(),
    #     name="add_role_requirement",
    # ), REMOVED THIS VIEW

    path(
        "projects/<int:pk>/roles/",
        ProjectRoleListView.as_view(),
        name="project_roles",
    ),

    path(
        "projects/<int:pk>/",
        ProjectDetailView.as_view(),
        name="project_detail",
    ),
    
    path(
        "projects/<int:pk>/edit/",
        UpdateProjectView.as_view(),
        name="update_project",
    ),

    path(
        "projects/<int:pk>/delete/",
        DeleteProjectView.as_view(),
        name="delete_project",
    ),

    path(
        'projects/<int:project_id>/apply/',
        ApplyToProjectView.as_view(),
    ),
    
    path(
        'projects/<int:project_id>/matching-gigs/',
        MyMatchingGigsView.as_view(),
    ),

    path(
        'my-applications/',
        MyApplicationsView.as_view(),
    ),

    path(
        'projects/<int:project_id>/applications/',
        ProjectApplicationsView.as_view(),
    ),

    path(
        "proposals/send/",
        SendProposalView.as_view(),
        name="send_proposal",
    ),

    path(
        "proposals/received/",
        ReceivedProposalsView.as_view(),
        name="received_proposals",
    ),

    path(
        "proposals/sent/",
        SentProposalsView.as_view(),
        name="sent_proposals",
    ),

    path(
        "proposals/<int:proposal_id>/status/",
        UpdateProposalStatusView.as_view(),
        name="update_proposal_status",
    ),

    path(
        "proposals/<int:proposal_id>/resend/",
        ResendProposalView.as_view(),
        name="resend_proposal",
    ),

    path(
        "projects/<int:project_id>/team-apply/",
        TeamApplicationView.as_view(),
        name="team_apply",
    ),

    path(
        "projects/<int:project_id>/accepted-team/",
        AcceptedTeamView.as_view(),
        name="accepted_team",
    ),



]
