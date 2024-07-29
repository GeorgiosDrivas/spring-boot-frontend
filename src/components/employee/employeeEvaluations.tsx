import { useState, useEffect } from "react";
import { clientApi } from "../../api/client";
import { Evaluations } from "../../types/types";
import { Evaluation } from "../../utils/evaluation";

const EmployeeEvaluations = ({
  employeeId
}: {employeeId: number}) => {
  const [evaluations, setEvaluations] = useState<Evaluations[]>([]);
  console.log(evaluations);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  // Fetch evaluations using the ID of the employee
  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const response = await clientApi.get(
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
            <Evaluation evaluation={evaluation} key={evaluation.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default EmployeeEvaluations;