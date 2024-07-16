import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HandleClick } from "../hooks/useHandleClick";
import { useDispatch } from "react-redux";
import { storeID } from "../store/userSlice";
import { Authenticate, User } from "../types/types";
import { clientApi } from "../api/client";

const Login= ({ urlType, navigateType }: Readonly<Authenticate>) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleClick = HandleClick();
  const [wrongCreds, setWrongCreds] = useState<boolean>(false);

  const emptyStates = () => {
    setEmail("");
    setPassword("");
  };

  // Handles login button click. Checks if credentials are true
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const user: User = { email, password };

    try {
      const response = await clientApi.post(`${urlType}/login`, user);
      const { id, token } = response.data;

      localStorage.setItem("token", JSON.stringify(token));
      dispatch(storeID(id));
      navigate(`/${navigateType}-dashboard`);
    } catch (error) {
      setWrongCreds(true);
      emptyStates();
      console.error("There was an error logging in the user!", error);
    }
  };

  return (
    <>
      <div className="vw-100 vh-100 d-flex justify-content-center align-items-center flex-column">
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          <h2 className="text-center mb-5">Login</h2>
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
          <div className="d-flex justify-content-center">
            <button type="submit" className="mb-4 option-btn d-flex">
              Login
            </button>
          </div>
        </form>
        {wrongCreds && <p>Wrong credentials. Please try again.</p>}
        <div className="d-flex">
          Don't have an account?{" "}
          <button
            className="normal_btn text-decoration-underline"
            onClick={() => handleClick(`${navigateType}-sign-up`)}
          >
            Sign up
          </button>
        </div>
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

export default Login;
