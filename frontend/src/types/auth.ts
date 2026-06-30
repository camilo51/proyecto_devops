export interface LoginRequest {
  email: string;
  password: string;
}

export interface CompleteRegistrationRequest {
  token: string;
  password: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "LAWYER" | "CLIENT";
}

export interface LoginResponse {
  message: string;
  user: User;
}
