import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../Context/useAuth';

interface ProctectedRouteProps {
    children: React.ReactNode;
}

const ProctectedRoute: React.FC<ProctectedRouteProps> = ({ children }) => {
    const location = useLocation();
    const { isLoggedIn } = useAuth();

    console.log(isLoggedIn());

    return isLoggedIn() ? (
        <>{children}</>
    ) : (
        <Navigate to="/login" state={{ form: location }} replace/>
    );
};

export default ProctectedRoute;