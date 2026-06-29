import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CasesModule } from './cases/cases.module';
import { ClientsModule } from './clients/clients.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, PrismaModule, ClientsModule, CasesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
