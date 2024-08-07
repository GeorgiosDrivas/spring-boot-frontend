import { EvaluationType } from "../types/types";
import {useState} from 'react';

export const Evaluation = ({ evaluation }: EvaluationType) => {
  const [expanded, setExpanded] = useState(false);

  return (
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
      <p className="evaluation_title mb-0 fw-bold">{evaluation.title}</p>
      <p>Rating: {evaluation.rating} / 10</p>
      <p data-testid="content">
        {expanded && evaluation.content.length > 200
          ? evaluation.content
          : !expanded && evaluation.content.length <= 200
          ? evaluation.content.slice(0, 200)
          : evaluation.content.slice(0, 200) + "..."}
      </p>
      {evaluation.content.length > 200 && (
        <button className="btn border" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};