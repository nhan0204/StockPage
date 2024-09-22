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
    isLoggedIn: () => boolean;
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

    console.log(user, ' ', token)

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(token);
        }

        setIsReady(true);
    }, []);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
    }, [token])

    const registerUser = async(email: string, username: string, password: string) => {
        await registerAPI(email, username, password)
        .then((response) => {
            if (response) {
                const userObject = {
                    userName: response.data.userName,
                    email: response.data.email
                }
                
                localStorage.setItem("token", response.data.token);
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

    const isLoggedIn = () => {
        return !!user;
    }

    const logoutUser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken("");
        setUser(null);
        navigate("/");
        delete axios.defaults.headers.common["Authorization"];
    }

    return (
        <UserContext.Provider 
            value={{ user, token, isLoggedIn, loginUser, registerUser, logoutUser }}
        >
            {isReady ? children : null}
        </UserContext.Provider>
    )
}


export const useAuth = () => React.useContext(UserContext);
