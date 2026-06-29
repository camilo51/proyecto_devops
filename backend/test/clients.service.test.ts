import {
    ConflictException,
    NotFoundException,
} from '@nestjs/common';
import {
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from 'vitest';
import { Role } from './../generated/prisma/client';
import { ClientsService } from './../src/clients/clients.service';
import { PrismaService } from './../src/prisma/prisma.service';

describe('ClientsService', () => {
  let service: ClientsService;

  const prisma = {
    user: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  };

  beforeEach(() => {
    service = new ClientsService(prisma as unknown as PrismaService);
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('Crea un cliente correctamente', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      prisma.user.create.mockResolvedValue({
        id: '1',
        firstName: 'Juan',
        lastName: 'Perez',
        email: 'juan@test.com',
        role: Role.CLIENT,
        inviteToken: 'token',
        inviteExpires: new Date(),
      });

      const result = await service.create({
        firstName: 'Juan',
        lastName: 'Perez',
        email: 'juan@test.com',
      });

      expect(result.client.email).toBe('juan@test.com');
      expect(prisma.user.create).toHaveBeenCalledOnce();
    });

    it('Lanza una excepción cuando el correo ya existe', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: '1',
      });

      await expect(
        service.create({
          firstName: 'Juan',
          lastName: 'Perez',
          email: 'juan@test.com',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('Obtiene todos los clientes', async () => {
      prisma.user.findMany.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(prisma.user.findMany).toHaveBeenCalledOnce();
    });
  });

  describe('findOne', () => {
    it('Obtiene un cliente por id', async () => {
      prisma.user.findFirst.mockResolvedValue({
        id: '1',
        firstName: 'Juan',
      });

      const result = await service.findOne('1');

      expect(result.id).toBe('1');
    });

    it('Lanza una excepción cuando el cliente no existe', async () => {
      prisma.user.findFirst.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('Actualiza un cliente', async () => {
      prisma.user.findFirst.mockResolvedValue({
        id: '1',
      });

      prisma.user.update.mockResolvedValue({
        id: '1',
        firstName: 'Pedro',
      });

      const result = await service.update('1', {
        firstName: 'Pedro',
      });

      expect(result.firstName).toBe('Pedro');
      expect(prisma.user.update).toHaveBeenCalledOnce();
    });
  });

  describe('remove', () => {
    it('Elimina un cliente', async () => {
      prisma.user.findFirst.mockResolvedValue({
        id: '1',
      });

      prisma.user.delete.mockResolvedValue({});

      const result = await service.remove('1');

      expect(result.message).toBe('Client deleted successfully');
      expect(prisma.user.delete).toHaveBeenCalledOnce();
    });
  });
});