import { useState } from "react";
import { EmployerData } from "../../types/types";
import { clientApi } from "../../api/client";
import { HandleChange } from "../../utils/handleStateChange";

const EmployerProfile = ({ userId }: {userId: number}) => {
  const [companyName, setCompanyName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [field, setField] = useState<string>("");
  const [imageData, setImageData] = useState<FormData | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
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
      setImagePreview(URL.createObjectURL(file));
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
        <input type="file" accept="image/*" onChange={handleUploadClick} />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Image Preview"
            className="image-preview"
          />
        )}
        <button type="submit" className="edit_profile_btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployerProfile;
