import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './useAuth';

const PublicRoutes = () => {
    const isAuthenticated = useAuth();

    // Redirect to private route if logged in
    if (isAuthenticated) {
        return <Navigate to='/employee-dashboard' />;
    }

    return <Outlet />;
}

export default PublicRoutes;