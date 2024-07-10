import { useState } from "react";
import { clientApi } from "../../api/client";

interface Name {
  employerName: string;
}

const EvaluationForm = ({ employerName }: Name) => {
  const [employeeId, setEmployeeId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // Creates an evaluation for an employee using the employee's ID
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Maybe change it to enum?????
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
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          <input
            className="edit_profile_input"
            type="text"
            placeholder="Evaluation's title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="edit_profile_input"
            type="textarea"
            placeholder="Evaluation's content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
