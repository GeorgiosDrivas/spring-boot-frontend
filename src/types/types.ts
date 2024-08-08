export interface User {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  currentEmployer?: string;
  title?: string; 
  companyName?: string;
  field?: string;
}

export interface Authenticate {
  urlType: string;
  navigateType: string;
}

export interface EmployerData {
  companyName: string;
  location: string;
  field: string;
  profileImagePath: string | undefined;
}

export interface EmployeeData {
  id?: number;
  firstName: string;
  lastName: string;
  location: string;
  title: string;
  currentEmployer?: string;
  profileImagePath: string | undefined;
}

export interface EmployeeCredData extends EmployeeData {
  id: number;
  email: string;
  password: string;
}

export interface EvaluationType {
  evaluation: {
    id: number;
    title: string;
    content: string;
    employerName: string;
    employerProfileImage: string;
    employerId: number;
    employeeId: number;
    rating: number;
  };
}

export interface Evaluations {
  id: number;
  title: string;
  content: string;
  employerName: string;
  employerProfileImage: string;
  employerId: number;
  employeeId: number;
  rating: number;
}