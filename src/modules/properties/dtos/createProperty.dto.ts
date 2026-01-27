import {
  PropertyCondition,
  PropertyCurrency,
  PropertyStatus,
} from 'generated/prisma/enums';

export class CreatePropertyDto {
  name: string;
  address: string;
  internalCode: string;
  floor: number;
  area: number;
  status: PropertyStatus;
  ownerId: string;
  monthlyPayment: number;
  garanty: number;
  currency: PropertyCurrency;
  monthlyFee?: number;
  persons: number;
  rooms: number;
  bathrooms: number;
  floors: number;
  condition: PropertyCondition;
  furnished: boolean;
  pets: boolean;
}
