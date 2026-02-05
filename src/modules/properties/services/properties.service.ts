import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PropertiesRepository } from '../repositories/properties.repository';
import { CreatePropertyDto } from '../dtos/createProperty.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PropertiesService {
  constructor(private readonly propertiesRepository: PropertiesRepository) {}

  async createProperty(data: CreatePropertyDto, ownerId: string) {
    try {
      const id = uuidv4();
      console.log({ ownerId });
      const property = await this.propertiesRepository.create({
        ...data,
        owner: {
          connect: {
            id: ownerId,
          },
        },
        id,
      });
      return property.id;
    } catch (err) {
      console.error({
        err,
      });
      throw new HttpException('bad_request', HttpStatus.BAD_REQUEST);
    }
  }

  async getAllProperties(ownerId: string) {
    return this.propertiesRepository.findAll(ownerId);
  }

  async getAvailableProperties(ownerId: string) {
    return this.propertiesRepository.getAvailable(ownerId);
  }
}
