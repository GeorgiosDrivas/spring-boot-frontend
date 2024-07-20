import { useState } from "react";
import { EmployeeData } from "../../types/types";
import { clientApi } from "../../api/client";
import { HandleChange } from "../../utils/handleStateChange";

const EmployeeProfile = ({ userId }: { userId: number }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [currentEmployer, setCurrentEmployer] = useState<string>("");
  const [imageData, setImageData] = useState<FormData | null>(null);
  const [imageName, setImageName] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const user: EmployeeData = {
      firstName,
      lastName,
      location,
      title,
      currentEmployer,
      profileImagePath: imageName,
    };

    try {
      if (imageData) {
        await uploadImage(imageData);
      }

      await clientApi.put(`employees/${userId}/profile`, user);
      setCurrentEmployer("");
      setFirstName("");
      setLastName("");
      setLocation("");
      setTitle("");
      setImageData(null);
      setImageName("");

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
      await clientApi.post(`employees/${userId}/image`, imageData);
    } catch (error) {
      console.log(error);
      throw new Error("Image upload failed");
    }
  };

  return (
    <div>
      <h1 className="mb-0">Profile information</h1>
      <p className="mt-0">Here you can change your profile's information.</p>
      <form
        className="d-flex flex-column justify-content-center align-items-center mt-4"
        onSubmit={handleSubmit}
      >
        <input
          className="edit_profile_input"
          type="text"
          required
          placeholder="First name"
          value={firstName}
          onChange={HandleChange(setFirstName)}
        />
        <input
          className="edit_profile_input"
          type="text"
          required
          placeholder="Last name"
          value={lastName}
          onChange={HandleChange(setLastName)}
        />
        <input
          className="edit_profile_input"
          type="text"
          required
          placeholder="Location"
          value={location}
          onChange={HandleChange(setLocation)}
        />
        <input
          className="edit_profile_input"
          type="text"
          required
          placeholder="Job title"
          value={title}
          onChange={HandleChange(setTitle)}
        />
        <input
          className="edit_profile_input"
          type="text"
          required
          placeholder="Current employer"
          value={currentEmployer}
          onChange={HandleChange(setCurrentEmployer)}
        />
        <input type="file" accept="image/*" onChange={handleUploadClick} />
        <button
          type="submit"
          className="edit_profile_btn"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployeeProfile;