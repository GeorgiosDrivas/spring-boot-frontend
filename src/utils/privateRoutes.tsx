import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './useAuth';
import React from 'react';

const PrivateRoutes = (): React.ReactElement<any, any> => {
    const isAuthenticated = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to='/' />;
}

export default PrivateRoutes;