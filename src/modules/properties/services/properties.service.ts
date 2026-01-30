import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PropertiesRepository } from '../repositories/properties.repository';
import { CreatePropertyDto } from '../dtos/createProperty.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PropertiesService {
  constructor(private readonly propertiesRepository: PropertiesRepository) {}

  async createProperty(data: CreatePropertyDto, userId: string) {
    try {
      const id = uuidv4();
      const property = await this.propertiesRepository.create({
        ...data,
        owner: {
          connect: {
            id: userId,
          },
        },
        id,
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
