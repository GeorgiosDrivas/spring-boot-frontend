export interface User {
  email: string;
  password: string;
}

export interface Authenticate {
  urlType: string;
  navigateType: string;
}

export interface EmployerData {
  companyName: string;
  location: string;
  field: string;
}

export interface EmployeeData {
  firstName: string;
  lastName: string;
  location: string;
  title: string;
  currentEmployer: string;
}

export interface EmployeeCredData extends EmployeeData {
  id: number;
  email: string;
  password: string;
}