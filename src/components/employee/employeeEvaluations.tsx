import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the Evaluation interface
interface Evaluation {
  id: number;
  title: string;
  content: string;
  employerName: string;
  employeeId: number;
}

const EmployeeEvaluations: React.FC<{ employeeId: number }> = ({ employeeId }) => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const response = await axios.get<Evaluation[]>(`http://localhost:8080/api/employees/${employeeId}/evaluations`);
        setEvaluations(response.data);
      } catch (error) {
        setError('Error fetching evaluations. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchEvaluations();
  }, [employeeId]);  

  return (
    <div className='evaluations_wrap'>
      <h2 className='mb-5'>Your evaluations</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {evaluations.map((evaluation) => (
            <div key={evaluation.id} className='single_evaluation mb-5'>
              <p className='evaluation_title mb-0 fw-bold'>{evaluation.title}</p>
              <p className='evaluation_employer'>{evaluation.employerName}</p>
              <p>{evaluation.content}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default EmployeeEvaluations;