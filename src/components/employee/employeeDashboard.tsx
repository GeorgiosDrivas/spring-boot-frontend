import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

export default function EmployeeDashboard() {

    const [data, setData] = useState(null);
    const id = useSelector((state: RootState) => state.userSlice.id);
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/employees/${id}`);
                if (response.status !== 200) {
                    throw new Error('Failed to fetch user data');
                }
                setData(response.data);
            } catch (error: string | any) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchUser();
    }, [id]);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <>
            <h1>Hello employee!</h1>
            <button onClick={handleLogout}>log out</button>
        </>
    );
}
