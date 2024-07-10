import { useNavigate } from 'react-router-dom';

// Delete the local storage so the user will log out and redirect to landing page
export const useHandleLogout = () => {
    const navigate = useNavigate();
    const handleLogoutFun = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return handleLogoutFun;
}