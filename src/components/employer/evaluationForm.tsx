import { useState } from "react";
import { clientApi } from "../../api/client";
import { HandleChange } from "../../utils/handleStateChange";

const EvaluationForm = ({ employerName }: {employerName: string}) => {
  const [employeeId, setEmployeeId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // Creates an evaluation for an employee using the employee's ID
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const evaluation = { title, content, employerName };

    try {
      const response = await clientApi.post(
        `employees/${employeeId}/add-evaluations`,
        evaluation
      );
      // console.log('Evaluation submitted successfully:', response.data);
    } catch (error) {
      console.error("There was an error submitting the evaluation:", error);
    }
  };

  return (
    <>
      <div>
        <h2 className="mb-0">Evaluation Form</h2>
        <p className="mt-0">
          Here you can evaluate one of your current or past employees.
        </p>
        <form
          className="d-flex flex-column justify-content-center align-items-center mt-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            className="edit_profile_input"
            type="number"
            placeholder="Employee's ValueMe ID"
            value={employeeId}
            onChange={HandleChange(setEmployeeId)}
          />
          <input
            className="edit_profile_input"
            type="text"
            placeholder="Evaluation's title"
            value={title}
            onChange={HandleChange(setTitle)}
          />
          <input
            className="edit_profile_input"
            type="textarea"
            placeholder="Evaluation's content"
            value={content}
            onChange={HandleChange(setContent)}
          />
          <button type="submit" className="edit_profile_btn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default EvaluationForm;
