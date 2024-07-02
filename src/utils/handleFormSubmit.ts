import axios from 'axios';

const handleSubmit = async (e: React.FormEvent, user: object, userId: number) => {
    e.preventDefault();
    try {
        await axios.put(`http://localhost:8080/api/employers/${userId}/profile`, user);
    } catch (error) {
        alert('There was an error updating the profile!');
    }
};

export default handleSubmit;