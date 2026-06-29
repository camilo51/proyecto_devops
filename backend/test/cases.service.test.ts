import { NotFoundException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CasesService } from '../src/cases/cases.service';
import { PrismaService } from '../src/prisma/prisma.service';

describe('CasesService', () => {
  let service: CasesService;

  const prisma = {
    user: {
      findUnique: vi.fn(),
    },
    case: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  };

  beforeEach(() => {
    service = new CasesService(prisma as unknown as PrismaService);
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('Crea un caso correctamente', async () => {
      prisma.user.findUnique
        .mockResolvedValueOnce({ id: 'lawyer-id' })
        .mockResolvedValueOnce({ id: 'client-id' });

      prisma.case.create.mockResolvedValue({
        id: 'case-id',
        title: 'Caso de prueba',
      });

      const result = await service.create({
        title: 'Caso de prueba',
        description: 'Descripción',
        lawyerId: 'lawyer-id',
        clientId: 'client-id',
      });

      expect(result.id).toBe('case-id');
      expect(prisma.case.create).toHaveBeenCalledOnce();
    });

    it('Lanza una excepción cuando el abogado no existe', async () => {
      prisma.user.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.create({
          title: 'Caso',
          description: 'Descripción',
          lawyerId: 'lawyer-id',
          clientId: 'client-id',
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('Lanza una excepción cuando el cliente no existe', async () => {
      prisma.user.findUnique
        .mockResolvedValueOnce({ id: 'lawyer-id' })
        .mockResolvedValueOnce(null);

      await expect(
        service.create({
          title: 'Caso',
          description: 'Descripción',
          lawyerId: 'lawyer-id',
          clientId: 'client-id',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('Obtiene todos los casos', async () => {
      prisma.case.findMany.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(prisma.case.findMany).toHaveBeenCalledOnce();
    });
  });

  describe('findOne', () => {
    it('Obtiene un caso por id', async () => {
      prisma.case.findUnique.mockResolvedValue({
        id: 'case-id',
      });

      const result = await service.findOne('case-id');

      expect(result.id).toBe('case-id');
    });

    it('Lanza una excepción cuando el caso no existe', async () => {
      prisma.case.findUnique.mockResolvedValue(null);

      await expect(service.findOne('case-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('Actualiza un caso', async () => {
      prisma.case.findUnique.mockResolvedValue({
        id: 'case-id',
      });

      prisma.case.update.mockResolvedValue({
        id: 'case-id',
        title: 'Caso actualizado',
      });

      const result = await service.update('case-id', {
        title: 'Caso actualizado',
      });

      expect(result.title).toBe('Caso actualizado');
      expect(prisma.case.update).toHaveBeenCalledOnce();
    });
  });

  describe('remove', () => {
    it('Elimina un caso', async () => {
      prisma.case.findUnique.mockResolvedValue({
        id: 'case-id',
      });

      prisma.case.delete.mockResolvedValue({});

      const result = await service.remove('case-id');

      expect(result.message).toBe('Case deleted successfully');
      expect(prisma.case.delete).toHaveBeenCalledOnce();
    });
  });
});
