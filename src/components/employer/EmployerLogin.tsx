import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HandleClick } from '../../hooks/useHandleClick';
import { useDispatch } from 'react-redux';
import { storeID } from '../../userSlice';

interface User {
    email: string;
    password: string;
}

const EmployerLogin = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const handleClick = HandleClick();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user: User = { email, password };
        try {
            const response = await axios.post('http://localhost:8080/api/employers/login', user);
            console.log(response.data);
            const token = response.data.token;
            localStorage.setItem('token', JSON.stringify(token))
            dispatch(storeID(response.data.id));
            navigate('/employer-dashboard');
            
        } catch (error) {
            console.error('There was an error logging in the user!', error);
        }
    };

    return(
        <>
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
        <button onClick={() => handleClick("")}>Back</button>
        <a href="/employer-sign-up">Sign up</a>
        </>
    )
}

export default EmployerLogin;