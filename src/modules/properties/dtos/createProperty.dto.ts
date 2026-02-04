import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  PropertyCondition,
  PropertyCurrency,
  PropertyStatus,
} from 'generated/prisma/enums';

export class CreatePropertyDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  internalCode: string;

  @IsNumber()
  floor: number;

  @IsNumber()
  area: number;

  @IsEnum(PropertyStatus)
  status: PropertyStatus;

  @IsNumber()
  monthlyPayment: number;

  @IsNumber()
  garanty: number;

  @IsEnum(PropertyCurrency)
  currency: PropertyCurrency;

  @IsNumber()
  @IsOptional()
  monthlyFee?: number;

  @IsNumber()
  persons: number;

  @IsNumber()
  rooms: number;

  @IsNumber()
  bathrooms: number;

  @IsNumber()
  floors: number;

  @IsEnum(PropertyCondition)
  condition: PropertyCondition;

  @IsBoolean()
  furnished: boolean;

  @IsBoolean()
  pets: boolean;
}
