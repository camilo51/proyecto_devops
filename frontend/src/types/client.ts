export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "CLIENT";
  inviteToken: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClientDto {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UpdateClientDto {
  firstName: string;
  lastName: string;
  email: string;
}
