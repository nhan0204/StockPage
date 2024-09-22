import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { UserProfile } from "../Models/User";
import { loginAPI, registerAPI } from '../Services/AuthService';

export type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (email: string, username: string, password: string) => void;
    loginUser: (username: string, password: string) => void;
    logoutUser: () => void;
    isLoggedIn: () => void;
}

type UserProviderProps = {
    children: React.ReactNode;
} 

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: UserProviderProps) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState<boolean>(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer" + token;
        }

        setIsReady(true);
    }, []);

    const registerUser = async(email: string, username: string, password: string) => {
        await registerAPI(email, username, password)
        .then((response) => {
            if (response) {
                localStorage.setItem("token", response.data.token);

                const userObject = {
                    userName: response.data.userName,
                    email: response.data.email
                }

                localStorage.setItem("user", JSON.stringify(userObject));
                setToken(response.data.token);
                setUser(userObject);

                toast.success("Register Success!");
                navigate("/search");
            }
        })
        .catch(e => toast.warning("Server error occured: ", e));
    }

    const loginUser = async(username: string, password: string) => {
        await loginAPI(username, password)
        .then((response) => {
            if (response) {
                localStorage.setItem("token", response.data.token);

                const userObject = {
                    userName: response.data.userName,
                    email: response.data.email
                }

                localStorage.setItem("user", JSON.stringify(userObject));
                setToken(response.data.token);
                setUser(userObject);

                toast.success("Login Success!");
                navigate("/search");
            }
        })
        .catch(e => toast.warning("Server error occured: ", e));
    }

    const isLoggedIn = () => !!user;

    const logoutUser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken("");
        setUser(null);
        navigate("/");
    }

    return (
        <UserContext.Provider value={{ user, token, isLoggedIn, loginUser, registerUser, logoutUser }}>
            {isReady ? children : null}
        </UserContext.Provider>
    )
}


export const useAuth = () => React.useContext(UserContext);
