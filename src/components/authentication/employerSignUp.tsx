import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HandleClick } from '../../hooks/useHandleClick';
import { Authenticate, User } from '../../types/types';
import { clientApi } from '../../api/client';
import { HandleChange } from '../../utils/handleStateChange';


const EmployerSignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [field, setField] = useState<string>("");

  const navigate = useNavigate();
  const handleClick = HandleClick();

  // Checks if user exists in back-end ? redirect to login : do nothing.
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const user: User = { email, password, companyName, field };
    try {
      await clientApi.post(`employers/register`, user);
      navigate(`/employer-login`);
    } catch (error) {
      console.error("There was an error registering the user!", error);
    }
  };

  return (
    <>
      <div className="vw-100 vh-100 d-flex justify-content-center align-items-center flex-column">
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          <h2 className="text-center mb-5">Sign Up</h2>
          <input
            type="email"
            value={email}
            onChange={HandleChange(setEmail)}
            placeholder="Email"
            className="login_input"
            required
          />
          <input
            type="password"
            value={password}
            onChange={HandleChange(setPassword)}
            placeholder="Password"
            className="login_input"
            required
          />
          <input
            value={companyName}
            onChange={HandleChange(setCompanyName)}
            type="text"
            className="login_input"
            placeholder="Company Name"
            required
          />
          <input
            value={field}
            onChange={HandleChange(setField)}
            type="text"
            className="login_input"
            placeholder="Field"
            required
          />
          <div className="d-flex justify-content-center">
            <button type="submit" className="mb-4 option-btn d-flex">
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <button
        className="position-absolute back-btn"
        onClick={() => handleClick("")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          fill="none"
          className="arrow-svg backBtn"
        >
          <path d="M4 12H20M20 12L16 8M20 12L16 16" stroke="#000000" />
        </svg>
      </button>
    </>
  );
};

export default EmployerSignUp;