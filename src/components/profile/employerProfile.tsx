import { useState } from "react";
import { EmployerData } from "../../types/types";
import { clientApi } from "../../api/client";
import { HandleChange } from "../../utils/handleStateChange";

const EmployerProfile = ({ userId }: {userId: number}) => {
  const [companyName, setCompanyName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [field, setField] = useState<string>("");
  const [imageData, setImageData] = useState<FormData | null>(null);
  const [imageName, setImageName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user: EmployerData = {
      companyName,
      location,
      field,
      profileImagePath: imageName,
    };

    try {
      if (imageData) {
        await uploadImage(imageData);
      }

      await clientApi.put(`employers/${userId}/profile`, user);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("There was an error updating the profile!");
    }
  };

  const handleUploadClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageData = new FormData();
      imageData.append("imageFile", file);
      setImageData(imageData);
      setImageName(file.name);
    }
  };

  const uploadImage = async (imageData: FormData) => {
    try {
      await clientApi.post(`employers/${userId}/image`, imageData);
    } catch (error) {
      console.log(error);
      throw new Error("Image upload failed");
    }
  };

  return (
    <div>
      <h1 className="mb-5">Complete or edit your profile information</h1>
      <form
        className="profile_form d-flex flex-column justify-content-around align-items-center mt-4"
        onSubmit={handleSubmit}
      >
        <div className="profile_input_wrap d-flex justify-content-around">
          <div>
            <label htmlFor="name">Company Name</label>
            <input
              type="text"
              className="edit_profile_input"
              id="name"
              value={companyName}
              onChange={HandleChange(setCompanyName)}
            />
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className="edit_profile_input"
              id="location"
              value={location}
              onChange={HandleChange(setLocation)}
            />
          </div>
        </div>
        <div className="profile_input_second_wrap d-flex justify-content-around">
          <div>
            <label htmlFor="field">Field</label>
            <input
              type="text"
              className="edit_profile_input"
              id="field"
              value={field}
              onChange={HandleChange(setField)}
            />
          </div>
          <input type="file" className="img_field ps-5" accept="image/*" onChange={handleUploadClick} />
        </div>
        <button type="submit" className="edit_profile_btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployerProfile;
