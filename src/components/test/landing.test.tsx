import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Landing from '../dashboard/landing';

describe("Landing component tests", () => {

  test("Heading should be ValuEMe", () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );

    const headingElement = screen.getByRole("heading");
    expect(headingElement).toHaveTextContent("ValuEMe");
  });
});