import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CaseStatus } from '../../../generated/prisma/client';

export class CreateCaseDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(CaseStatus)
  @IsOptional()
  status?: CaseStatus;

  @IsString()
  @IsNotEmpty()
  lawyerId!: string;

  @IsString()
  @IsNotEmpty()
  clientId!: string;
}
