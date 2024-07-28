import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './src/utils/privateRoutes';
import PublicRoutes from './src/utils/publicRoutes';
import Landing from './src/components/dashboard/landing';
import EmployeeDashboard from './src/components/dashboard/employeeDashboard';
import EmployerDashboard from "./src/components/dashboard/employerDashboard";
import Login from './src/components/authentication/login';
import { clearTokenOnWindowClose } from './src/utils/clearTokenOnWindowClose';
import EmployerSignUp from './src/components/authentication/employerSignUp';
import EmployeeSignUp from './src/components/authentication/employeeSignUp';

clearTokenOnWindowClose();

const App = () => {
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
                    <Login urlType='employees' navigateType='employee'/>
                } />
                <Route path="/employee-sign-up" element={
                    <EmployeeSignUp />
                } />

                <Route path="/employer-login" element={
                    <Login urlType='employers' navigateType='employer'/>
                } />
                <Route path="/employer-sign-up" element={
                    <EmployerSignUp />
                } />

            </Routes>
        </Router>
    );
};

export default App;
