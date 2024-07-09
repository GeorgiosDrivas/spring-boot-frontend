import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import EmployeeProfile from './employeeProfile';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import EmployeeEvaluations from './employeeEvaluations';
import { EmployeeCredData } from '../../types/types';
import { clientApi } from '../../api/client';

const EmployeeDashboard: React.FC = () => {
    const [data, setData] = useState<EmployeeCredData | null>(null);
    const id = useSelector((state: RootState) => state.userSlice.id);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await clientApi.get(`employees/${id}`);
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
    console.log(id);
    return (
        <div className='main_wrapper'>
        <Tabs>
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col-3">
                        <div className='mb-4 pb-2 d-flex flex-column align-items-center user_info'>
                            <div className='img_wrap align-self-center mb-3'></div>
                            <div>
                                <h1 className='name'>{data && data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : "Hello user"}</h1>
                                <p className='title mb-0'>{data && data.title ? `${data.title}` : ""}</p>
                                <p className='location'>{data && data.location ? `${data.location}` : ""}</p>
                            </div>
                        </div>
                        <TabList className="options_wrap">
                            <Tab>
                                <button className='option_btn mb-2 text-start p-0'>Evaluations</button>
                            </Tab>
                            <Tab>
                                <button className='option_btn mb-2 text-start p-0'>Profile</button>
                            </Tab>
                            <Tab>
                                <button className='option_btn text-start p-0'>Settings</button>
                            </Tab>
                        </TabList>
                    </div>
                    <div className="col-9">
                        <div className='content_wrap'>
                            <TabPanel>
                                <EmployeeEvaluations employeeId={id}/>
                            </TabPanel>
                            <TabPanel>
                                <EmployeeProfile userId={id}/>
                            </TabPanel>
                            <TabPanel>
                                Your Settings
                                <button onClick={handleLogout}>log out</button>
                            </TabPanel>
                        </div>
                    </div>
                </div>
            </div>
        </Tabs>
        </div>
    );
}

export default EmployeeDashboard;