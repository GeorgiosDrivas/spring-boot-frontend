import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HandleClick } from '../../hooks/useHandleClick';

interface User {
    email: string;
    password: string;
}

const EmployerSignUp = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const handleClick = HandleClick();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user: User = { email, password};
        try {
            const response = await axios.post('http://localhost:8080/api/employers/register', user);
            console.log(response.data);
            navigate('/employer-login');
        } catch (error) {
            console.error('There was an error registering the user!', error);
        }
    };

    return(
        <>
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
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
            <button type="submit">Sign Up</button>
        </form>
        <button onClick={() => handleClick("")}>Back</button>
        </>
    )
}

export default EmployerSignUp;