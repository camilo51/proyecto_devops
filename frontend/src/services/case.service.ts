import { api } from "@/lib/api";
import { Case, CreateCaseDto, UpdateCaseDto } from "@/types/case";

export class CaseService {
  static async findAll() {
    const response = await api.get<Case[]>("/cases");

    return response.data;
  }

  static async findOne(id: string) {
    const response = await api.get<Case>(`/cases/${id}`);

    return response.data;
  }

  static async create(data: CreateCaseDto) {
    const response = await api.post<Case>("/cases", data);

    return response.data;
  }

  static async update(id: string, data: UpdateCaseDto) {
    const response = await api.patch<Case>(`/cases/${id}`, data);

    return response.data;
  }

  static async remove(id: string) {
    await api.delete(`/cases/${id}`);
  }
}
