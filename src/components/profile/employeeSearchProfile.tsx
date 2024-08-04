import { useEffect, useState } from "react";
import { clientApi } from "../../api/client";
import { EmployeeData, Evaluations } from "../../types/types";
import { Evaluation } from "../../utils/evaluation";

export const EmployeeSearchProfile = ({
  user,
  setUser,
}: {
  user: EmployeeData;
  setUser: () => EmployeeData | void;
}) => {
  const [evaluations, setEvaluations] = useState<Evaluations[]>([]);

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const response = await clientApi.get<Evaluations[]>(
          `employees/${user.id}/evaluations`
        );
        setEvaluations(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvaluations();
  }, []);

  return (
    <>
      <button onClick={() => setUser()} className="backBtn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          fill="none"
          className="arrow-svg"
        >
          <path d="M4 12H20M20 12L16 8M20 12L16 16" stroke="#000000" />
        </svg>
      </button>
      <div className="d-flex flex-column">
        <div className="img_wrap align-self-center mb-3 position-relative overflow-hidden">
          <img
            src={`http://localhost:8080/uploads/${user.id}_${user.profileImagePath}`}
            alt="Profile photo"
            className="position-absolute w-100 h-100"
          />
        </div>
        <h2 className="text-center profile_name">
          {user.firstName} {user.lastName}
        </h2>
        <div className="profile_details">
          <p className="text-center mb-0">
            {user.title} - {user.currentEmployer}
          </p>
          <p className="text-center mt-0 mb-0">{user.location}</p>
          <p className="text-center mt-0">#{user.id}</p>
        </div>
      </div>
      <div>
        {evaluations
          ? evaluations.map((evaluation) => (
              <Evaluation evaluation={evaluation} key={evaluation.id} />
            ))
          : "Error displaying evaluations"}
      </div>
    </>
  );
};