import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './useAuth';

const PublicRoutes = (): React.ReactElement<any, any> => {
    const isAuthenticated = useAuth();

    // Redirect to private route if logged in
    if (isAuthenticated) {
        return <Navigate to='/employee-dashboard' />;
    }

    return <Outlet />;
}

export default PublicRoutes;