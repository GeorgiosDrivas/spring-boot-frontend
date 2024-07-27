import { useEffect, useState } from "react";
import { clientApi } from "../../api/client";
import { Evaluation } from "../../types/types";

export const EmployeeSearchProfile = ({user, setUser}: {user: any, setUser: any}) => {
    const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
    
    useEffect(() => {
        const fetchEvaluations = async () => {
            try {
                const response = await clientApi.get<Evaluation[]>(
                `employees/${user.id}/evaluations`
                );
                setEvaluations(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEvaluations();
    },[])

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
                <div key={evaluation.id} className="single_evaluation mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={`http://localhost:8080/uploads/${evaluation.employerId}_${evaluation.employerProfileImage}`}
                      alt="Profile Image"
                      className="employer_evaluation_img"
                    />
                    <p className="evaluation_employer ms-3 mt-0 mb-0">
                      {evaluation.employerName}
                    </p>
                  </div>
                  <p className="evaluation_title mb-0 fw-bold">
                    {evaluation.title}
                  </p>
                  <p>{evaluation.content}</p>
                </div>
              ))
            : "Error displaying evaluations"}
        </div>
      </>
    );
}