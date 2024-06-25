import { useNavigate } from 'react-router-dom';

export const HandleClick = ()=> {
    const navigate = useNavigate();
    
    const handleClickFunction = (destination: string) => {
        navigate(`/${destination}`);
    };

    return handleClickFunction;
};
