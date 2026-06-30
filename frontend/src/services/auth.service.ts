import { api } from "@/lib/api";
import {
  CompleteRegistrationRequest,
  LoginRequest,
  LoginResponse,
} from "@/types/auth";

export class AuthService {
  static async login(data: LoginRequest) {
    const response = await api.post<LoginResponse>("/auth/login", data);

    return response.data;
  }

  static async completeRegistration(data: CompleteRegistrationRequest) {
    const response = await api.post("/clients/complete-registration", data);

    return response.data;
  }
}
