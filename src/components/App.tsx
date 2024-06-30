import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from '../utils/privateRoutes';
import PublicRoutes from '../utils/publicRoutes';
import Landing from './landing';
import EmployeeDashboard from './employee/employeeDashboard';
import EmployerDashboard from './employer/employerDashboard';
import SignUp from './signUp';
import Login from './login';

export const clearTokenOnWindowClose = () => {
    window.addEventListener('beforeunload', () => {
        localStorage.removeItem('token');
    });
};
clearTokenOnWindowClose();

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PublicRoutes />}>
                    <Route index element={<Landing />} />
                </Route>
                
                <Route path="/employee-dashboard" element={<PrivateRoutes />}>
                    <Route index element={<EmployeeDashboard />} />
                </Route>

                <Route path="/employer-dashboard" element={<PrivateRoutes />}>
                    <Route index element={<EmployerDashboard />} />
                </Route>

                <Route path="/employee-login" element={
                    <Login urlType='employees' navigationType='employee'/>
                } />
                <Route path="/employee-sign-up" element={
                    <SignUp urlType="employees" navigateType="employee"/>
                } />

                <Route path="/employer-login" element={
                    <Login urlType='employers' navigationType='employer'/>
                } />
                <Route path="/employer-sign-up" element={
                    <SignUp urlType="employers" navigateType="employer"/>
                } />

            </Routes>
        </Router>
    );
};

export default App;
