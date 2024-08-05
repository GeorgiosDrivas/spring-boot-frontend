import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Evaluation } from "../evaluation";
import { MemoryRouter } from "react-router-dom";

test("Should expand content on button click", () => {
  
  const evaluation = {
    id: 1,
    employerId: 2,
    employerName: "Google",
    title: "Very Good",
    content:
      "Vestibulum vulputate at est vel interdum. Integer vehicula ultricies vehicula. Sed id tristique erat. Nullam quis vehicula enim, eu malesuada magna. Quisque id tortor ante. Aliquam ac leo nec nisi efficitur venenatis. Duis viverra orci nec velit ornare viverra. Etiam sit amet mauris auctor, maximus magna efficitur, tempus magna. In ullamcorper faucibus lorem id viverra. Nullam sed lectus id risus luctus dictum at vel massa. Integer fringilla a lacus at pretium. Sed gravida tortor sit amet maximus cursus. Vestibulum ut risus et tellus porta feugiat vel et urna. Cras in sapien nec massa vulputate imperdiet.",
    employerProfileImage: "test",
    employeeId: 2,
  };

  render(
    <MemoryRouter>
      <Evaluation evaluation={evaluation}/>
    </MemoryRouter>
  );

  const btn = screen.getByRole("button");
  const content = screen.getByTestId("content");

  expect(content.textContent).toHaveLength(203);

  fireEvent.click(btn);

  expect(content.textContent?.length).toBeGreaterThan(203);
});