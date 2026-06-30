import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findStats() {
    const [
      totalClients,
      totalCases,
      activeCases,
      pendingInvitations,
      recentClients,
      recentCases,
    ] = await Promise.all([
      this.prisma.user.count({
        where: {
          role: 'CLIENT',
        },
      }),

      this.prisma.case.count(),

      this.prisma.case.count({
        where: {
          status: 'OPEN',
        },
      }),

      this.prisma.user.count({
        where: {
          role: 'CLIENT',
          inviteToken: {
            not: null,
          },
        },
      }),

      this.prisma.user.findMany({
        where: {
          role: 'CLIENT',
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 5,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          createdAt: true,
        },
      }),

      this.prisma.case.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        take: 5,
        select: {
          id: true,
          title: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    return {
      totalClients,
      totalCases,
      activeCases,
      pendingInvitations,
      recentClients,
      recentCases,
    };
  }
}