import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './utils/privateRoutes';
import PublicRoutes from './utils/publicRoutes';
import Landing from './components/landing';
import EmployeeDashboard from './components/employee/employeeDashboard';
import EmployerDashboard from './components/employer/employerDashboard';
import SignUp from './components/signUp';
import Login from './components/login';
import { clearTokenOnWindowClose } from './utils/clearTokenOnWindowClose';

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
                    <SignUp urlType="employees" navigateType="employee"/>
                } />

                <Route path="/employer-login" element={
                    <Login urlType='employers' navigateType='employer'/>
                } />
                <Route path="/employer-sign-up" element={
                    <SignUp urlType="employers" navigateType="employer"/>
                } />

            </Routes>
        </Router>
    );
};

export default App;
