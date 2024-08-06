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

    const user = {
      firstName,
      lastName,
      location,
      title,
      currentEmployer,
      profileImagePath: imageName,
    } satisfies EmployeeData;

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
        id="profile_form"
        className="d-flex flex-column justify-content-center align-items-center mt-4"
        onSubmit={handleSubmit}
      >
        <div className="d-flex profile_input_wrap justify-content-between">
          <div>
            <label htmlFor="name">Name</label>
            <input
              className="edit_profile_input"
              type="text"
              required
              id="name"
              value={firstName}
              onChange={HandleChange(setFirstName)}
            />
          </div>
          <div>
            <label htmlFor="surname">Surname</label>
            <input
              className="edit_profile_input"
              type="text"
              required
              id="surname"
              value={lastName}
              onChange={HandleChange(setLastName)}
            />
          </div>
          <div>
            <label htmlFor="title">Job Title</label>
            <input
              className="edit_profile_input"
              type="text"
              required
              id="title"
              value={title}
              onChange={HandleChange(setTitle)}
            />
          </div>
        </div>
        <div>
          <label className="mb-2" htmlFor="employer">
            Current Employer
          </label>
          <input
            className="edit_profile_input"
            type="text"
            required
            id="employer"
            value={currentEmployer}
            onChange={HandleChange(setCurrentEmployer)}
          />
        </div>
        <div className="profile_input_second_wrap d-flex justify-content-between">
          <div>
            <label htmlFor="location">Location</label>
            <input
              className="edit_profile_input"
              type="text"
              required
              id="location"
              value={location}
              onChange={HandleChange(setLocation)}
            />
          </div>
          <input
            type="file"
            id="img_field"
            accept="image/*"
            onChange={handleUploadClick}
          />
        </div>
        <button type="submit" className="edit_profile_btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployeeProfile;