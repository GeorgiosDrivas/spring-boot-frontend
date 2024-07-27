import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {clientApi} from "../../api/client";
import { Employee, EmployeeData } from "../../types/types";

interface Data {
  setSelected: Dispatch<SetStateAction<EmployeeData | undefined>>;
}

export const EmployerSearchComp = ({setSelected}: Data) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchValue, setSearchValue] = useState("");

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
        <input
          className="searchEmployee"
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      <ul id="searchList">
        {searchValue
          ? employees
              .filter((employee) => employee.firstName.includes(searchValue))
              .map((employee) => (
                <li
                  className="user"
                  key={employee.id}
                  onClick={() => setSelected(employee)}
                >
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
              ))
          : employees.map((employee) => (
              <li
                className="user"
                key={employee.id}
                onClick={() => setSelected(employee)}
              >
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