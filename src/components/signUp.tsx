import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HandleClick } from '../hooks/useHandleClick';
import { Authenticate, User } from 'src/types/types';


const SignUp: React.FC<Authenticate> = ({urlType, navigateType}) => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const handleClick = HandleClick();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user: User = { email, password};
        try {
            /* const response = */ await axios.post(`http://localhost:8080/api/${urlType}/register`, user);
            navigate(`/${navigateType}-login`);
        } catch (error) {
            console.error('There was an error registering the user!', error);
        }
    };

    return(
        <>
        <div className='vw-100 vh-100 d-flex justify-content-center align-items-center flex-column'>
            <form onSubmit={handleSubmit} className='d-flex flex-column'>
                <h2 className='text-center mb-5'>Sign Up</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className='login_input'
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className='login_input'
                    required
                />
                <div className='d-flex justify-content-center'>
                    <button type="submit" className='mb-4 option-btn d-flex'>Sign Up</button>
                </div>
            </form>
        </div>
        <button className='position-absolute back-btn' onClick={() => handleClick("")}>Back</button>
        </>
    )
}

export default SignUp;