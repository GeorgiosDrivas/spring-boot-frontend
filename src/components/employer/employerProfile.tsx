import { useState } from "react";
import { EmployerData } from "../../types/types";
import { clientApi } from "../../api/client";
import { HandleChange } from "../../utils/handleStateChange";

const EmployerProfile = ({ userId }: {userId: number}) => {
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
      <form
        className="d-flex flex-column justify-content-center align-items-center mt-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="edit_profile_input"
          placeholder="Compay name"
          value={companyName}
          onChange={HandleChange(setCompanyName)}
        />
        <input
          type="text"
          className="edit_profile_input"
          placeholder="Location"
          value={location}
          onChange={HandleChange(setLocation)}
        />
        <input
          type="text"
          className="edit_profile_input"
          placeholder="Field"
          value={field}
          onChange={HandleChange(setField)}
        />
        <button type="submit" className="edit_profile_btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployerProfile;
