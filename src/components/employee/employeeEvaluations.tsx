import React, { useState, useEffect } from "react";
import { clientApi } from "../../api/client";

interface Evaluation {
  id: number;
  title: string;
  content: string;
  employerName: string;
  employeeId: number;
}

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
      <h2 className="mb-5">Your evaluations</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {evaluations.map((evaluation) => (
            <div key={evaluation.id} className="single_evaluation mb-5">
              <p className="evaluation_title mb-0 fw-bold">
                {evaluation.title}
              </p>
              <p className="evaluation_employer">{evaluation.employerName}</p>
              <p>{evaluation.content}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default EmployeeEvaluations;
