import { ChangeEvent } from "react";
import { HandleChange } from "../handleStateChange";
const mockValueSetter = jest.fn();

afterEach(() => {
  mockValueSetter.mockReset();
});

test("HandleChange calls valueSetter with the correct value", () => {

  const handleChange = HandleChange(mockValueSetter);
  const mockEvent = {
    target: { value: "test value" },
    preventDefault: jest.fn(),
  } as unknown as ChangeEvent<HTMLInputElement>;

  handleChange(mockEvent);
  
  expect(mockValueSetter).toHaveBeenCalledWith("test value");
});
