import { useState, useEffect } from "react";
import { clientApi } from "../../api/client";
import { Evaluation } from "../../types/types";

const EmployeeEvaluations = ({
  employeeId
}: {employeeId: number}) => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch evaluations using the ID of the employee
  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const response = await clientApi.get<Evaluation[]>(
          `employees/${employeeId}/evaluations`
        );
        setEvaluations(response.data);
      } catch (error) {
        setError("Error fetching evaluations. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvaluations();
  }, [employeeId]);

  return (
    <div className="evaluations_wrap">
      <h1 className="mb-5">Your evaluations</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {evaluations.map((evaluation) => (
            <div key={evaluation.id} className="single_evaluation mb-4">
              <div className="d-flex align-items-center mb-3">
                <img
                  src={`http://localhost:8080/uploads/${evaluation.employerId}_${evaluation.employerProfileImage}`}
                  alt="Profile Image"
                  className="employer_evaluation_img"
                />
                <p className="evaluation_employer ms-3 mt-0 mb-0">{evaluation.employerName}</p>
              </div>
              <p className="evaluation_title mb-0 fw-bold">
                {evaluation.title}
              </p>
              <p>{evaluation.content}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default EmployeeEvaluations;