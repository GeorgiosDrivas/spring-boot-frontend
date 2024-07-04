import { HandleClick } from "../hooks/useHandleClick";
import React from 'react';

const Landing: React.FC = () => {
    const handleClick = HandleClick();

    return (
        <div className="vh-100 vw-100 d-flex justify-content-center align-items-center flex-column">
            <h1 className="text-center">ValuEMe</h1>
            <div id="optionWrapper" className="mt-5">
                <button className="me-4 option-btn" onClick={() => handleClick("employee-login")}>Employee</button>
                <button className="option-btn" onClick={() => handleClick("employer-login")}>Employer</button>
            </div>
        </div>
    );
}

export default Landing;