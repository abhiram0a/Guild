from django.urls import path

from .views import (
    SendConnectionRequestView,
    ReceivedConnectionRequestsView,
    AcceptConnectionRequestView,
    RejectConnectionRequestView,
    FriendsListView,
    ConnectionStatusView,
    SentConnectionRequestsView,
    SendCollaborationInviteView,
    AcceptCollaborationInviteView,
    RejectCollaborationInviteView,
    FriendInviteFeedView,
    AcceptedProjectInvitesView,
    MyWorkspacesView,
    WorkspaceDetailView,
    WorkspaceFeedView,
    SendWorkspaceMessageView,
    UploadWorkspaceFileView,
    MyWorkspacesView,
    WorkspacePaymentView,
    UpdateWorkspacePaymentView,
    WorkspaceReviewDataView,
    SubmitReviewView,
)

urlpatterns = [

    path(
        'connections/send/<int:user_id>/',
        SendConnectionRequestView.as_view(),
        name='send_connection'
    ),

    path(
        'connections/received/',
        ReceivedConnectionRequestsView.as_view(),
        name='received_connections'
    ),

    path(
        'connections/accept/<int:pk>/',
        AcceptConnectionRequestView.as_view(),
        name='accept_connection'
    ),

    path(
        'connections/reject/<int:pk>/',
        RejectConnectionRequestView.as_view(),
        name='reject_connection'
    ),

    path(
        'friends/',
        FriendsListView.as_view(),
        name='friends_list'
    ),
    
    path(
        'connections/status/<int:user_id>/',
        ConnectionStatusView.as_view(),
        name='connection_status'
    ),

    path(
        'connections/sent/',
        SentConnectionRequestsView.as_view(),
        name='sent_connections'
    ),

    path(
        "invites/send/",
        SendCollaborationInviteView.as_view(),
    ),

    path(
        "invites/<int:pk>/accept/",
        AcceptCollaborationInviteView.as_view(),
    ),

    path(
        "invites/<int:pk>/reject/",
        RejectCollaborationInviteView.as_view(),
    ),

    path(
        "friends/<int:friend_id>/invites/",
        FriendInviteFeedView.as_view(),
    ),

    path(
        "accepted-project-invites/<int:project_id>/",
        AcceptedProjectInvitesView.as_view(),
        name="accepted_project_invites",
    ),

    path(
        "workspaces/",
        MyWorkspacesView.as_view(),
    ),

    path(
        "workspaces/<int:workspace_id>/",
        WorkspaceDetailView.as_view(),
    ),

    path(
        "workspace/<int:workspace_id>/",
        WorkspaceFeedView.as_view(),
    ),

    path(
        "workspace/<int:workspace_id>/send-message/",
        SendWorkspaceMessageView.as_view(),
    ),

    path(
        "workspace/<int:workspace_id>/upload-file/",
        UploadWorkspaceFileView.as_view(),
    ),

    path(
        "my-workspaces/",
        MyWorkspacesView.as_view(),
    ),

    path(
        "workspace/<int:workspace_id>/payment/",
        WorkspacePaymentView.as_view(),
    ),

    path(
        "workspace/<int:workspace_id>/payment/update/",
        UpdateWorkspacePaymentView.as_view(),
    ),

    path(
        "workspace/<int:workspace_id>/review-data/",
        WorkspaceReviewDataView.as_view(),
    ),
    

    path(
        "workspace/<int:workspace_id>/submit-review/",
        SubmitReviewView.as_view(),
    ),

]