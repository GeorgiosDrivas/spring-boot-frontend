import { useEffect, useState } from "react";
import {clientApi} from "../../api/client";
import { Employee } from "../../types/types";

export const EmployerSearchComp = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async (): Promise<void> => {
      try {
        const response = await clientApi.get(`employees/all`);
        setEmployees(response.data);
      } catch (error) {
        console.error("There was an error fetching the employees!", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employee List</h1>
      <ul id="searchList">
        {employees.map((employee) => (
          <li key={employee.id}>
            <div className="d-flex flex-column">
              <div className="img_wrap align-self-center mb-3 position-relative overflow-hidden">
                <img
                  src={`http://localhost:8080/uploads/${employee.id}_${employee.profileImagePath}`}
                  alt="Profile photo"
                  className="position-absolute w-100 h-100"
                />
              </div>
              <h2 className="text-center profile_name">
                {employee.firstName} {employee.lastName}
              </h2>
              <div className="profile_details">
                <p className="text-center mb-0">{employee.title}</p>
                <p className="text-center mt-0">{employee.location}</p>
              </div>
              <div className="profile_details mt-4">
                <p>#{employee.id}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};