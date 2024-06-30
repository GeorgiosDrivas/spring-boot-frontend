import axios from 'axios';
import { useState } from 'react';

interface User {
    firstName: string;
    lastName: string;
    location: string;
    currentEmployer: string;
}

type PropsData = {
    userId: number;
}

const EmployeeProfile = ({ userId }: PropsData) => {

    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState(""); 
    const [location, setLocation] = useState(""); 
    const [currentEmployer, setCurrentEmployer] = useState(""); 

    const handleSubmit = async () => {
        const user: User = { firstName, lastName, location, currentEmployer };
        try {
            await axios.put(`http://localhost:8080/api/employees/${userId}/profile`, user);
        } catch (error) {
            alert('There was an error updating the profile!');
        }
    };

    return (
        <div>
            <p>Complete your profile information</p>
            <form className='d-flex flex-column' onSubmit={handleSubmit}>
                <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                <input type="text" placeholder="Current employer" value={currentEmployer} onChange={(e) => setCurrentEmployer(e.target.value)} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default EmployeeProfile;