import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";
import { EmployeeSearchProfile } from "../employeeSearchProfile";
import { render, screen } from "@testing-library/react";

const user = {
  id: 2,
  profileImagePath: "linkedin_profile.jpg",
  firstName: "Georgios",
  lastName: "Drivas",
  title: "Software Engineer",
  location: "Athens",
  currentEmployer: "Tesla",
};

test("Should display user when name entered in field", async () => {
    // Should render the component and the user with the current ID
    const mocked = jest.fn();

    render(
        <MemoryRouter>
            <EmployeeSearchProfile user={user} setUser={mocked}/>
        </MemoryRouter>
    )
    const name = screen.getByRole("heading");
    expect(name).toHaveTextContent("Georgios Drivas");
    // Check for the user's name
    // Check for the user's evaluations
});