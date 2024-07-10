import { useState } from "react";
import { EmployerData, PropsData } from "../../types/types";
import { clientApi } from "../../api/client";

const EmployerProfile: React.FC<PropsData> = ({ userId }) => {
  const [companyName, setCompanyName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [field, setField] = useState<string>("");

  // Update user's profile.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user: EmployerData = { companyName, location, field };
    try {
      await clientApi.put(`employers/${userId}/profile`, user);
    } catch (error) {
      alert("There was an error updating the profile!");
    }
  };

  return (
    <div>
      <p>Complete your profile information</p>
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Compay name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Field"
          value={field}
          onChange={(e) => setField(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EmployerProfile;
