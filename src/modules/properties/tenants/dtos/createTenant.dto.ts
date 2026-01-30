import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTenantDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  documentType: string;

  @IsNumber()
  documentNumber: number;

  @IsString()
  nationality: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  emergencyPhone: string;

  @IsString()
  property: string;

  @IsDate()
  entryDate: Date;

  @IsDate()
  @IsOptional()
  exitDate?: Date;

  @IsNumber()
  paymentDay: number;
}
