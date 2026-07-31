import api from "./axios";


export const getFriends = (token) => {
    return api.get(
        "collaborations/friends/",
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};


export const getReceivedRequests = (token) => {
    return api.get(
        "collaborations/connections/received/",
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};


export const sendConnectionRequest = (
    userId,
    token
) => {
    return api.post(
        `collaborations/connections/send/${userId}/`,
        {},
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};


export const acceptConnectionRequest = (
    requestId,
    token
) => {
    return api.post(
        `collaborations/connections/accept/${requestId}/`,
        {},
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};


export const rejectConnectionRequest = (
    requestId,
    token
) => {
    return api.post(
        `collaborations/connections/reject/${requestId}/`,
        {},
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};


export const getConnectionStatus = (
    userId,
    token
) => {
    return api.get(
        `collaborations/connections/status/${userId}/`,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};


export const getSentRequests = (token) => {
    return api.get(
        "collaborations/connections/sent/",
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};


export const sendCollaborationInvite = (
    data,
    token
) => {
    return api.post(
        "collaborations/invites/send/",
        data,
        {
            headers: {
                Authorization: `Token ${token}`
            }
        }
    );
};

export const getFriendInviteFeed = (
    friendId,
    token
) => {
    return api.get(
        `collaborations/friends/${friendId}/invites/`,
        {
            headers: {
                Authorization: `Token ${token}`
            }
        }
    );
};

export const acceptCollaborationInvite = (
    id,
    data,
    token
) => {

    return api.post(
        `collaborations/invites/${id}/accept/`,
        data,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};

export const rejectCollaborationInvite = (
    inviteId,
    token
) => {
    return api.post(
        `collaborations/invites/${inviteId}/reject/`,
        {},
        {
            headers: {
                Authorization: `Token ${token}`
            }
        }
    );
};


export const getAcceptedProjectInvites = (
    projectId,
    token
) => {

    return api.get(
        `collaborations/accepted-project-invites/${projectId}/`,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};


export const getMyWorkspaces = (token) => {
    return api.get(
        "collaborations/my-workspaces/",
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};


export const getWorkspace = (
    workspaceId,
    token
) => {
    return api.get(
        `collaborations/workspaces/${workspaceId}/`,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};

export const getWorkspaceFeed = (
    workspaceId,
    token
) => {
    return api.get(
        `collaborations/workspace/${workspaceId}/`,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};


export const sendWorkspaceMessage = (
    workspaceId,
    data,
    token
) => {
    return api.post(
        `collaborations/workspace/${workspaceId}/send-message/`,
        data,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};


export const uploadWorkspaceFile = (
    workspaceId,
    formData,
    token
) => {
    return api.post(
        `collaborations/workspace/${workspaceId}/upload-file/`,
        formData,
        {
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "multipart/form-data",
            },
        }
    );
};


export const getWorkspacePayment = (
    workspaceId,
    token
) => {
    return api.get(
        `collaborations/workspace/${workspaceId}/payment/`,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};



export const updateWorkspacePayment = (
    workspaceId,
    data,
    token
) => {
    return api.put(
        `collaborations/workspace/${workspaceId}/payment/update/`,
        data,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};


export const getWorkspaceReviewTargets = (
    workspaceId,
    token
) => {

    return api.get(

        `collaborations/workspace/${workspaceId}/review-data/`,

        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }

    );

};


export const submitWorkspaceReview = (
    workspaceId,
    data,
    token
) => {

    return api.post(

        `collaborations/workspace/${workspaceId}/submit-review/`,

        data,

        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }

    );

};