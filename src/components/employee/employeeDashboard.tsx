import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import EmployeeProfile from './employeeProfile';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

interface EmployeeData {
    currentEmployer: string;
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    location: string;
    password: string;
}

export default function EmployeeDashboard() {
    const [data, setData] = useState<EmployeeData | null>(null);
    const id = useSelector((state: RootState) => state.userSlice.id);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/employees/${id}`);
                if (response.status !== 200) {
                    throw new Error('Failed to fetch user data');
                }
                setData(response.data);
            } catch (error: any) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchUser();
    }, [id]);

    return (
        <>
        <h1>{data ? `${data.firstName} ${data.lastName}` : ""}</h1>
        <Tabs>
            <TabList style={{listStyleType: "none"}}>
                <Tab>
                    <button>Evaluations</button>
                </Tab>
                <Tab>
                    <button>Profile</button>
                </Tab>
                <Tab>
                    <button>Settings</button>
                </Tab>
            </TabList>
            <TabPanel>
                Your Evaluations
            </TabPanel>
            <TabPanel>
                <EmployeeProfile userId={id}/>
            </TabPanel>
            <TabPanel>
                Your Settings
                <button onClick={handleLogout}>log out</button>
            </TabPanel>
        </Tabs>
        </>
    );
}