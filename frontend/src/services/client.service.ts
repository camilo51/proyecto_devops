import { api } from "@/lib/api";
import { Client } from "@/types/client";

export class ClientService {
  static async findAll() {
    const response = await api.get<Client[]>("/clients");

    return response.data;
  }

  static async findOne(id: string) {
    const response = await api.get<Client>(`/clients/${id}`);

    return response.data;
  }

  static async create(data: {
    firstName: string;
    lastName: string;
    email: string;
  }) {
    const response = await api.post("/clients", data);

    return response.data;
  }

  static async update(
    id: string,
    data: {
      firstName: string;
      lastName: string;
      email: string;
    },
  ) {
    const response = await api.patch(`/clients/${id}`, data);

    return response.data;
  }

  static async remove(id: string) {
    const response = await api.delete(`/clients/${id}`);

    return response.data;
  }
}
