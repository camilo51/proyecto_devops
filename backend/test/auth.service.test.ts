import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AuthService } from '../src/auth/auth.service';
import { PrismaService } from '../src/prisma/prisma.service';

vi.mock('bcrypt');

describe('Servicio de autenticación', () => {
  let service: AuthService;

  const prismaMock = {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  };

  beforeEach(() => {
    service = new AuthService(prismaMock as unknown as PrismaService);

    vi.clearAllMocks();
  });

  describe('Registro', () => {
    it('Registra un nuevo abogado', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      vi.mocked(bcrypt.hash).mockResolvedValue('hashedPassword' as never);

      prismaMock.user.create.mockResolvedValue({
        id: '1',
        firstName: 'Camilo',
        lastName: 'Pereira',
        email: 'camilo@test.com',
        password: 'hashedPassword',
      });

      const result = await service.register({
        firstName: 'Camilo',
        lastName: 'Pereira',
        email: 'camilo@test.com',
        password: '12345678',
      });

      expect(result.user.email).toBe('camilo@test.com');
      expect(prismaMock.user.findUnique).toHaveBeenCalledOnce();
      expect(prismaMock.user.create).toHaveBeenCalledOnce();
      expect(bcrypt.hash).toHaveBeenCalledWith('12345678', 10);
    });

    it('Lanza una excepción cuando el correo ya existe', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: '1',
      });

      await expect(
        service.register({
          firstName: 'Camilo',
          lastName: 'Pereira',
          email: 'camilo@test.com',
          password: '12345678',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('Inicio de sesión', () => {
    it('Inicia sesión con credenciales válidas', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: '1',
        firstName: 'Camilo',
        lastName: 'Pereira',
        email: 'camilo@test.com',
        password: 'hashedPassword',
      });

      vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

      const result = await service.login({
        email: 'camilo@test.com',
        password: '12345678',
      });

      expect(result.user.email).toBe('camilo@test.com');

      expect(bcrypt.compare).toHaveBeenCalledWith('12345678', 'hashedPassword');
    });

    it('Lanza una excepción cuando el usuario no existe', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(
        service.login({
          email: 'camilo@test.com',
          password: '12345678',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('Lanza una excepción cuando la contraseña es incorrecta', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: '1',
        firstName: 'Camilo',
        lastName: 'Pereira',
        email: 'camilo@test.com',
        password: 'hashedPassword',
      });

      vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

      await expect(
        service.login({
          email: 'camilo@test.com',
          password: '12345678',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
