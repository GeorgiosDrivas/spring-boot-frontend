import { ChangeEvent } from "react";
import { HandleChange } from "../handleStateChange";

test("HandleChange calls valueSetter with the correct value", () => {
  // Mock the valueSetter function
  const mockValueSetter = jest.fn();

  // Create the change handler with the mock function
  const handleChange = HandleChange(mockValueSetter);

  // Create a mock event object
  const mockEvent = {
    target: { value: "test value" },
    preventDefault: jest.fn(),
  } as unknown as ChangeEvent<HTMLInputElement>;

  // Call the change handler with the mock event
  handleChange(mockEvent);

  // Assert that the mockValueSetter was called with the correct value
  expect(mockValueSetter).toHaveBeenCalledWith("test value");
});
