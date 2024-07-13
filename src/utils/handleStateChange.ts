// Used in onChange method of input fields
export const HandleChange = (valueSetter: (value: string) => void) => {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    valueSetter(event.target.value);
  };
};