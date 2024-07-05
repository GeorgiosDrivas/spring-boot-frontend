import axios from 'axios';
import { useState } from 'react';

interface EmployeeUser {
    firstName: string;
    lastName: string;
    location: string;
    title: string;
    currentEmployer: string;
}

type PropsData = {
    userId: number;
}

const EmployeeProfile: React.FC<PropsData> = ({ userId }) => {

    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState(""); 
    const [location, setLocation] = useState(""); 
    const [title, setTitle] = useState(""); 
    const [currentEmployer, setCurrentEmployer] = useState(""); 

    const handleSubmit = async () => {
        const user: EmployeeUser = { firstName, lastName, location, title, currentEmployer };
        try {
            await axios.put(`http://localhost:8080/api/employees/${userId}/profile`, user);
        } catch (error) {
            alert('There was an error updating the profile!');
        }
    };

    return (
        <div>
            <h2 className='mb-0'>Profile information</h2>
            <p className='mt-0'>Here your can change your profile's information.</p>
            <form className='d-flex flex-column' onSubmit={handleSubmit}>
                <input className='edit_profile_input' type="text" required placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input className='edit_profile_input' type="text" required placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <input className='edit_profile_input' type="text" required placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                <input className='edit_profile_input' type="text" required placeholder="Job title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input className='edit_profile_input' type="text" required placeholder="Current employer" value={currentEmployer} onChange={(e) => setCurrentEmployer(e.target.value)} />
                <button type='submit' className='edit_profile_btn'>Submit</button>
            </form>
        </div>
    );
}

export default EmployeeProfile;