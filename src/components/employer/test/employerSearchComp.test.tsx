import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { EmployerSearchComp } from "../employerSearchComp";
import { clientApi } from "../../../api/client";

jest.mock("../../../api/client");

describe("Display component and users", () => {
  const mockSetSelected = jest.fn();

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
    // Create a mock implementation for `clientApi.get`
    (clientApi.get as jest.Mock).mockResolvedValue({
      data: [
        {
          id: 2,
          profileImagePath: "linkedin_profile.jpg",
          firstName: "Georgios",
          lastName: "Drivas",
          title: "Software Engineer",
          location: "Athens",
          currentEmployer: "Tesla",
        },
      ],
    });

    render(<EmployerSearchComp setSelected={mockSetSelected} />);

    await waitFor(() => {
      expect(screen.getByText("Georgios Drivas")).toBeInTheDocument();
    });
  });
});