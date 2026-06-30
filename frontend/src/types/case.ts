export interface Case {
  id: string;
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  clientId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCaseDto {
  title: string;
  description: string;
  clientId: string;
}

export interface UpdateCaseDto {
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
}
