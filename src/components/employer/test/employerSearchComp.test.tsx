import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { EmployerSearchComp } from "../employerSearchComp";
import { clientApi } from "../../../api/client";


describe("Display component and users", () => {
  const mockSetSelected = jest.fn();
  jest.mock("../../../api/client");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should display heading 'Employee List'", () => {
    render(
      <MemoryRouter>
        <EmployerSearchComp setSelected={mockSetSelected} />
      </MemoryRouter>
    );

    const heading = screen.getByRole("heading", { name: /Employee List/i });
    expect(heading).toBeInTheDocument();
  });

  test("Should display users", async () => {
    const mockedClientApi = clientApi as jest.Mocked<typeof clientApi>;
    const mockEmployees = [
      {
        id: 2,
        profileImagePath: "linkedin_profile.jpg",
        firstName: "Jane",
        lastName: "Smith",
        title: "Software Engineer",
        location: "Athens",
        currentEmployer: "Tesla"
      },
    ];

    mockedClientApi.get.mockResolvedValue({ data: mockEmployees });
    render(<EmployerSearchComp setSelected={mockSetSelected} />);

    await waitFor(() => {
      expect(screen.getByText("Georgios Drivas")).toBeInTheDocument();
    });
  })
})