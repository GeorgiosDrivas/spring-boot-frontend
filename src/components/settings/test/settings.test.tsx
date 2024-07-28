import { fireEvent, render, screen } from "@testing-library/react";
import EmployeeDashboard from "../../dashboard/employeeDashboard";
import { store } from "../../../store/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("Changing component on button click", () => {
  test("Should change to Settings component on button click", () => {
    // Render EmployeeDashboard component
    render(
      <MemoryRouter>
        <Provider store={store}>
          <EmployeeDashboard />
        </Provider>
      </MemoryRouter>
    );

    const settingsButton = screen.getByText("Settings");
    fireEvent.click(settingsButton);

    const settingsTitle = screen.getByRole("heading", {
      level: 1,
      name: "Settings",
    });
    expect(settingsTitle).toBeInTheDocument();
  });

    test("Should change to Evaluations component on button click", () => {
      // Render EmployeeDashboard component
      render(
        <MemoryRouter>
          <Provider store={store}>
            <EmployeeDashboard />
          </Provider>
        </MemoryRouter>
      );

      const settingsButton = screen.getByText("Evaluations");
      fireEvent.click(settingsButton);

      const settingsTitle = screen.getByRole("heading", {
        level: 1,
        name: "Your evaluations",
      });
      expect(settingsTitle).toBeInTheDocument();
    });

      test("Should change to Settings component on button click", () => {
        // Render EmployeeDashboard component
        render(
          <MemoryRouter>
            <Provider store={store}>
              <EmployeeDashboard />
            </Provider>
          </MemoryRouter>
        );

        const settingsButton = screen.getByText("Profile");
        fireEvent.click(settingsButton);

        const settingsTitle = screen.getByRole("heading", {
          level: 1,
          name: "Profile information",
        });
        expect(settingsTitle).toBeInTheDocument();
      });
});
