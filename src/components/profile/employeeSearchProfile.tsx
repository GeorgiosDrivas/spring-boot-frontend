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
          width="30px"
          height="30px"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#000000"
            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
          />
          <path
            fill="#000000"
            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
          />
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