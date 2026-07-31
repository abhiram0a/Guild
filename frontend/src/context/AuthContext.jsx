import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser]= useState(null);
    const [token, setToken]= useState(localStorage.getItem("token") || null);

    useEffect(() => {
        if (token){
            fetchProfile();
        }
    },[token]);

    const fetchProfile = async() => {
        try {
            const response = await api.get(
                "accounts/profile/", 
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                }
            );
            setUser(response.data);
        }catch (error){
            console.error(error);
            logout();
        }
    };

    const login= async(username, password) => {
        try{
            const response = await api.post(
                "accounts/login/",
                {username, password,}

            );

            const token = response.data.token;
            setToken(token);
            localStorage.setItem("token", token);
            setUser(response.data.user);
            
            return{success: true};
        } catch (error){
            return{ success: false, error: error.response.data.error};
        }
    };

    const register = async(formData) => {
        try {
            await api.post(
                "accounts/register/", formData
            );
            return{success: true};
        } catch (error){
            return {success: false, error: error.response.data};
        }
    };

    const logout = async () => {

        try {

            if (token) {

                await api.post(
                    "accounts/logout/",
                    {},
                    {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    }
                );

            }

        } catch (error) {

            console.error(error);

        }

        localStorage.removeItem("token");

        setToken(null);

        setUser(null);

        window.location.replace("/");

    };

    return(
        <AuthContext.Provider value ={{ user, token, login, logout, register, fetchProfile,}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;