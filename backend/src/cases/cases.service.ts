import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';

@Injectable()
export class CasesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCaseDto: CreateCaseDto) {
    const { lawyerId, clientId } = createCaseDto;

    const lawyer = await this.prisma.user.findUnique({
      where: {
        id: lawyerId,
      },
    });

    if (!lawyer) {
      throw new NotFoundException('Lawyer not found');
    }

    const client = await this.prisma.user.findUnique({
      where: {
        id: clientId,
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return this.prisma.case.create({
      data: createCaseDto,
    });
  }

  async findAll() {
    return this.prisma.case.findMany({
      include: {
        lawyer: true,
        client: true,
      },
    });
  }

  async findOne(id: string) {
    const legalCase = await this.prisma.case.findUnique({
      where: {
        id,
      },
      include: {
        lawyer: true,
        client: true,
      },
    });

    if (!legalCase) {
      throw new NotFoundException('Case not found');
    }

    return legalCase;
  }

  async update(id: string, updateCaseDto: UpdateCaseDto) {
    await this.findOne(id);

    return this.prisma.case.update({
      where: {
        id,
      },
      data: updateCaseDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.case.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Case deleted successfully',
    };
  }
}
