import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Landing from '../landing';

describe("Landing component tests", () => {
  test("Should always return true", () => {
    expect(true).toBe(true);
  });

  test("Heading should be ValuEMe", () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );

    const headingElement = screen.getByText("ValuEMe");
    expect(headingElement).toBeInTheDocument();
  });
});