import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Role } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    const { firstName, lastName, email } = createClientDto;

    const existingClient = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingClient) {
      throw new ConflictException('Email already exists');
    }

    const inviteToken = randomUUID();

    const client = await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        role: Role.CLIENT,
        inviteToken,
        inviteExpires: new Date(
          Date.now() + 1000 * 60 * 60 * 24,
        ),
      },
    });

    return {
      message: 'Client created successfully',
      invitationLink: `http://localhost:3000/register/${inviteToken}`,
      client,
    };
  }

  async findAll() {
    return this.prisma.user.findMany({
      where: {
        role: Role.CLIENT,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string) {
    const client = await this.prisma.user.findFirst({
      where: {
        id,
        role: Role.CLIENT,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    await this.findOne(id);

    return this.prisma.user.update({
      where: {
        id,
      },
      data: updateClientDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Client deleted successfully',
    };
  }
}