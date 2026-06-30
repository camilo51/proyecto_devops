import { beforeEach, describe, expect, it, vi } from 'vitest';

import { api } from '../src/lib/api';
import { AuthService } from '../src/services/auth.service';

vi.mock('../src/lib/api', () => ({
  api: {
    post: vi.fn(),
  },
}));

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('Inicia sesión correctamente', async () => {
      vi.mocked(api.post).mockResolvedValue({
        data: {
          message: 'Login successful',
          user: {
            id: '1',
            firstName: 'Cristian',
            lastName: 'Pereira',
            email: 'cristian@test.com',
            role: 'LAWYER',
          },
        },
      });

      const response = await AuthService.login({
        email: 'cristian@test.com',
        password: '12345678',
      });

      expect(api.post).toHaveBeenCalledWith('/auth/login', {
        email: 'cristian@test.com',
        password: '12345678',
      });

      expect(response.message).toBe('Login successful');
      expect(response.user.email).toBe('cristian@test.com');
      expect(response.user.role).toBe('LAWYER');
    });
  });

  describe('completeRegistration', () => {
    it('Completa el registro correctamente', async () => {
      vi.mocked(api.post).mockResolvedValue({
        data: {
          message: 'Registration completed successfully',
        },
      });

      const response =
        await AuthService.completeRegistration({
          token: 'token-123',
          password: '12345678',
        });

      expect(api.post).toHaveBeenCalledWith(
        '/clients/complete-registration',
        {
          token: 'token-123',
          password: '12345678',
        },
      );

      expect(response.message).toBe(
        'Registration completed successfully',
      );
    });
  });
});