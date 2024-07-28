import { useHandleLogout } from "../../hooks/useHandleLogout";

export const EmployerSettings = () => {
  const handleLogout = useHandleLogout();

  return (
    <div>
      <h1 className="text-center">Settings</h1>
      <div className="mb-5">
        <h2>Profile</h2>
        <button className="btn border" onClick={handleLogout}>
          log out
        </button>
      </div>
      <h2>Accessibility</h2>
    </div>
  );
};
