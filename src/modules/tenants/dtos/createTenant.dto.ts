import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { DocumentType } from 'generated/prisma/enums';

export class CreateTenantDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(DocumentType)
  documentType: DocumentType;

  @IsString()
  documentNumber: string;

  @IsString()
  nationality: string;

  @IsString()
  phone: string;

  @IsString()
  emergencyPhone: string;

  @IsEmail()
  email: string;

  @IsString()
  property: string;

  @IsString()
  entryDate: string;

  @IsString()
  @IsOptional()
  exitDate?: string;

  @IsNumber()
  paymentDay: number;
}
