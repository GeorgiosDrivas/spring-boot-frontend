import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from '../utils/privateRoutes';
import PublicRoutes from '../utils/publicRoutes';
import Landing from './landing';
import EmployeeLogin from './employee/EmployeeLogin';
import EmployeeSignUp from './employee/EmployeeSignUp';
import EmployeeDashboard from './employee/employeeDashboard';
import EmployerLogin from './employer/EmployerLogin';
import EmployerSignUp from './employer/EmployerSignUp';
import EmployerDashboard from './employer/employerDashboard';

// Function to handle clearing the token on window close
const clearTokenOnWindowClose = () => {
    window.addEventListener('beforeunload', () => {
        localStorage.removeItem('token');
    });
};

// Call this function once when the app starts
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

                <Route path="/employee-login" element={<EmployeeLogin />} />
                <Route path="/employee-sign-up" element={<EmployeeSignUp />} />

                <Route path="/employer-login" element={<EmployerLogin />} />
                <Route path="/employer-sign-up" element={<EmployerSignUp />} />

            </Routes>
        </Router>
    );
};

export default App;
