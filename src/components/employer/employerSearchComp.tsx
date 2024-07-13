import { useEffect, useState } from "react";
import {clientApi} from "../../api/client";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
}

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
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.firstName} {employee.lastName} - {employee.title} - #{employee.id}
          </li>
        ))}
      </ul>
    </div>
  );
};