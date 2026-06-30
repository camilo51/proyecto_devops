import { api } from "@/lib/api";
import { Client, CreateClientDto, UpdateClientDto } from "@/types/client";

export class ClientService {
  static async findAll() {
    const response = await api.get<Client[]>("/clients");

    return response.data;
  }

  static async findOne(id: string) {
    const response = await api.get<Client>(`/clients/${id}`);

    return response.data;
  }

  static async create(data: CreateClientDto) {
    const response = await api.post<Client>("/clients", data);

    return response.data;
  }

  static async update(id: string, data: UpdateClientDto) {
    const response = await api.patch<Client>(`/clients/${id}`, data);

    return response.data;
  }

  static async remove(id: string) {
    await api.delete(`/clients/${id}`);
  }
}
