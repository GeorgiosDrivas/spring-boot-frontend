import { useState } from 'react';
import { EmployeeData, PropsData } from '../../types/types';
import { clientApi } from '../../api/client';

const EmployeeProfile: React.FC<PropsData> = ({ userId }) => {

    const [firstName, setFirstName] = useState<string>(""); 
    const [lastName, setLastName] = useState<string>(""); 
    const [location, setLocation] = useState<string>(""); 
    const [title, setTitle] = useState<string>(""); 
    const [currentEmployer, setCurrentEmployer] = useState<string>(""); 

    const handleSubmit = async () => {
        const user: EmployeeData = { firstName, lastName, location, title, currentEmployer };
        try {
            await clientApi.put(`employees/${userId}/profile`, user);
        } catch (error) {
            alert('There was an error updating the profile!');
        }
    };

    return (
        <div>
            <h2 className='mb-0'>Profile information</h2>
            <p className='mt-0'>Here you can change your profile's information.</p>
            <form className='d-flex flex-column justify-content-center align-items-center mt-4' onSubmit={handleSubmit}>
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