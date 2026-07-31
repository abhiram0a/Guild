import api from "./axios";

export const getUserProfile = (
    userId,
    token
) => {

    return api.get(
        `accounts/profile/${userId}/`,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};


export const getDashboard = (token) => {
    return api.get(
        "accounts/dashboard/",
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
};

