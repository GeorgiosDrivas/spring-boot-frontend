import { useNavigate } from 'react-router-dom';

export const HandleClick = () => {
    const navigate = useNavigate();
    // Takes an argument and redirects in the specific page
    const handleClickFunction = (destination: Readonly<string>) => {
        navigate(`/${destination}`);
    };

    return handleClickFunction;
};
