import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";
import { EmployeeSearchProfile } from "../employeeSearchProfile";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";

const user = {
  id: 2,
  profileImagePath: "linkedin_profile.jpg",
  firstName: "Georgios",
  lastName: "Drivas",
  title: "Software Engineer",
  location: "Athens",
  currentEmployer: "Tesla",
};

test("Should display user's data when the component loads", async () => {

  const setUserMock = jest.fn();

  render(
    <MemoryRouter>
      <EmployeeSearchProfile user={user} setUser={setUserMock} />
    </MemoryRouter>
  );

  // Check if the user's name is displayed
  const name = screen.getByRole("heading");
  expect(name).toHaveTextContent("Georgios Drivas");

  // Check for the user's profile details
  expect(screen.getByText("Software Engineer - Tesla")).toBeInTheDocument();
  expect(screen.getByText("Athens")).toBeInTheDocument();
  expect(screen.getByText("#2")).toBeInTheDocument();

  // Click the back button and verify that setUser was called
  fireEvent.click(screen.getByRole("button"));
  expect(setUserMock).toHaveBeenCalled();
});
