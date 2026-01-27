import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PropertiesRepository } from '../repositories/properties.repository';
import { CreatePropertyDto } from '../dtos/createProperty.dto';

@Injectable()
export class PropertiesService {
  constructor(private readonly propertiesRepository: PropertiesRepository) {}

  async createProperty(data: CreatePropertyDto, userId: string) {
    try {
      const property = await this.propertiesRepository.create({
        ...data,
        owner: {
          connect: {
            id: userId,
          },
        },
      });
      return property.id;
    } catch {
      throw new HttpException('bad_request', HttpStatus.BAD_REQUEST);
    }
  }

  async getAllProperties(userId: string) {
    return this.propertiesRepository.findAll(userId);
  }
}
