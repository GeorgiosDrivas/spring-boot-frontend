import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HandleClick } from '../hooks/useHandleClick';
import { Authenticate, User } from '../types/types';
import { clientApi } from '../api/client';


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
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="login_input"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="login_input"
            required
          />
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            type="text"
            className="login_input"
            placeholder="Company Name"
            required
          />
          <input
            value={field}
            onChange={(e) => setField(e.target.value)}
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
        Back
      </button>
    </>
  );
};

export default EmployerSignUp;