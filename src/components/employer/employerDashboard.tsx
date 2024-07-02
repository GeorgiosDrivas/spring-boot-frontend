import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import EmployerProfile from './employerProfile';
import EvaluationForm from './evaluationForm';

interface EmployerData {
    companyName: string;
    location: string;
    field: string;
}

export default function EmployerDashboard() {

    const [data, setData] = useState<EmployerData | null>(null);
    const id = useSelector((state: RootState) => state.userSlice.id);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/employers/${id}`);
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


    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <>
        <h1>{data ? `${data.companyName}` : ""}</h1>
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
                <EvaluationForm />
            </TabPanel>
            <TabPanel>
                <EmployerProfile userId={id}/>
            </TabPanel>
            <TabPanel>
                Your Settings
                <button onClick={handleLogout}>log out</button>
            </TabPanel>
        </Tabs>
        </>
    );
}
