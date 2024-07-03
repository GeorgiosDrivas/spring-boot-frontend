import axios from 'axios';
import { useState } from 'react';

interface EmployerUser {
    companyName: string;
    location: string;
    field: string;
}

type PropsData = {
    userId: number;
}

const EmployerProfile: React.FC<PropsData> = ({ userId }) => {

    const [companyName, setCompanyName] = useState(""); 
    const [location, setLocation] = useState(""); 
    const [field, setField] = useState(""); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user: EmployerUser = { companyName, location, field };
        try {
            await axios.put(`http://localhost:8080/api/employers/${userId}/profile`, user);
        } catch (error) {
            alert('There was an error updating the profile!');
        }
    };

    return (
        <div>
            <p>Complete your profile information</p>
            <form className='d-flex flex-column' onSubmit={handleSubmit}>
                <input type="text" placeholder="Compay name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                <input type="text" placeholder="Field" value={field} onChange={(e) => setField(e.target.value)} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default EmployerProfile;