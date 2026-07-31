import api from "./axios";

export const getCategories = () => {
    return api.get("projects/categories/");
};

export const getSkills = () => {
    return api.get("projects/skills/");
};

export const createSkill = (data, token) => {
    return api.post(
        "projects/skills/create/",
        data,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};

export const createGig = (data, token) => {
    return api.post(
        "projects/gigs/create/",
        data,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};

export const getMyGigs = (token) => {
    return api.get(
        "projects/my-gigs/",
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};

export const getGigDetails = (id) => {
    return api.get(
        `projects/gigs/${id}/`
    );
};

export const getAllGigs = (params = {}) => {
    return api.get(
        "projects/gigs/",
        {
            params,
        }
    );
};

export const updateGig = (id, data, token) => {
    return api.put(
        `projects/gigs/${id}/edit/`,
        data,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};


export const deleteGig = (id, token) => {
    return api.delete(
        `projects/gigs/${id}/delete/`,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};




export const createProject = (data, token) => {
    return api.post(
        "projects/projects/create/",
        data,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};

export const getProjects = (params = {}) => {
    return api.get(
        "projects/projects/",
        {
            params,
        }
    );
};

export const getProjectDetails = (id) => {
    return api.get(
        `projects/projects/${id}/`
    );
};

export const getMyProjects = (token) => {
    return api.get(
        "projects/projects/my-projects/",
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};

// export const getMyProjects = (token) => {
//     return api.get(
//         "projects/my-projects/",
//         {
//             headers: {
//                 Authorization: `Token ${token}`,
//             },
//         }
//     );
// };

export const getProjectRoles = (id) => {
    return api.get(
        `projects/projects/${id}/roles/`
    );
};

export const addProjectRole = (
    projectId,
    data,
    token
) => {
    return api.post(
        `projects/projects/${projectId}/roles/add/`,
        data,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};


export const updateProject = (
    id,
    data,
    token
) => {

    return api.put(
        `projects/projects/${id}/edit/`,
        data,
        {
            headers: {
                Authorization:
                    `Token ${token}`,
            },
        }
    );
};

export const deleteProject = (
    id,
    token
) => {

    return api.delete(
        `projects/projects/${id}/delete/`,
        {
            headers: {
                Authorization:
                    `Token ${token}`,
            },
        }
    );
};



export const applyToProject = (
    projectId,
    data,
    token
) => {
    return api.post(
        `projects/projects/${projectId}/apply/`,
        data,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};


export const getMyApplications = (token) => {
    return api.get(
        "projects/my-applications/",
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};


export const getProjectApplications = (
    projectId,
    token
) => {
    return api.get(
        `projects/projects/${projectId}/applications/`,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};


export const sendProposal = (
    data,
    token
) => {
    return api.post(
        "projects/proposals/send/",
        data,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};


export const getReceivedProposals = (
    token
) => {
    return api.get(
        "projects/proposals/received/",
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};


export const getSentProposals = (
    token
) => {
    return api.get(
        "projects/proposals/sent/",
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};


export const updateProposalStatus = (
    proposalId,
    data,
    token
) => {
    return api.put(
        `projects/proposals/${proposalId}/status/`,
        data,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};

export const resendProposal = (
    proposalId,
    data,
    token
) => {

    return api.post(

        `projects/proposals/${proposalId}/resend/`,

        data,

        {

            headers: {

                Authorization: `Token ${token}`,

            },

        }

    );

};


export const getMatchingGigs = (
    projectId,
    token
) => {
    return api.get(
        `projects/projects/${projectId}/matching-gigs/`,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};


export const getAcceptedTeam = (
    projectId,
    token
) => {

    return api.get(
        `projects/projects/${projectId}/accepted-team/`,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};



export const submitTeamApplication = (
    projectId,
    data,
    token
) => {
    return api.post(
        `projects/projects/${projectId}/team-apply/`,
        data,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};

