import { useState } from "react";
import { clientApi } from "../../api/client";
import { HandleChange } from "../../utils/handleStateChange";

const EvaluationForm = ({
  employerName,
  employerProfileImage,
  employerId,
}: {
  employerName: string;
  employerProfileImage: string | undefined;
  employerId: number;
}) => {
  const [employeeId, setEmployeeId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Creates an evaluation for an employee using the employee's ID
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const evaluation = {
      title,
      content,
      employerName,
      employerProfileImage,
      employerId,
      rating
    };

    try {
      const response = await clientApi.post(
        `employees/${employeeId}/add-evaluations`,
        evaluation
      );
      setSuccessMessage("Your evaluation was submitted successfully!");
    } catch (error) {
      console.error("There was an error submitting the evaluation:", error);
    }
    
    setEmployeeId("");
    setTitle("");
    setContent("");
  };

  return (
    <>
      <div>
        <h2 className="mb-0">Evaluation Form</h2>
        <p className="mt-0">
          Here you can evaluate one of your current or past employees.
        </p>
        <form
          id="evaluation_form"
          className="d-flex flex-column justify-content-center align-items-center mt-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="input_wrap d-flex justify-content-between align-items-center">
            <div>
              <label className="d-block" htmlFor="id">
                Employee's ID
              </label>
              <input
                id="id"
                className="edit_profile_input"
                type="number"
                value={employeeId}
                onChange={HandleChange(setEmployeeId)}
              />
            </div>
            <div>
              <label className="d-block" htmlFor="title">
                Evaluation's title
              </label>
              <input
                id="title"
                className="edit_profile_input"
                type="text"
                value={title}
                onChange={HandleChange(setTitle)}
              />
            </div>
          </div>
          <div>
            <label className="d-block" htmlFor="content">
              Evaluation's content
            </label>
            <input
              id="content"
              className="edit_profile_input textarea"
              type="textarea"
              value={content}
              onChange={HandleChange(setContent)}
            />
          </div>
          <div>
            <label htmlFor="rating">Rating</label>
            <input type="number" max={10} value={rating} onChange={(e) => setRating(Number(e.target.value))}/>
          </div>
          {successMessage !== "" && <p>{successMessage}</p>}
          <div className="evaluation_form_btn">
            <button type="submit" className="edit_profile_btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EvaluationForm;
