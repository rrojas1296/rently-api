import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PropertiesRepository } from '../repositories/properties.repository';
import { CreatePropertyDto } from '../dtos/createProperty.dto';
import { v4 as uuidv4 } from 'uuid';
import { UsersProfileRepository } from 'src/modules/users/repositories/usersProfile.repository';

@Injectable()
export class PropertiesService {
  constructor(
    private readonly propertiesRepository: PropertiesRepository,
    private readonly _usersProfileRepository: UsersProfileRepository,
  ) {}

  async createProperty(data: CreatePropertyDto, ownerId: string) {
    try {
      const id = uuidv4();
      const userProfile = await this._usersProfileRepository.getByUser(ownerId);
      const property = await this.propertiesRepository.create({
        ...data,
        owner: {
          connect: {
            id: userProfile?.id,
          },
        },
        id,
      });
      return property.id;
    } catch (err) {
      console.error(err);
      throw new HttpException('bad_request', HttpStatus.BAD_REQUEST);
    }
  }

  async getAllProperties(ownerId: string) {
    const userProfile = await this._usersProfileRepository.getByUser(ownerId);
    if (!userProfile) {
      throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.propertiesRepository.findAll(userProfile.id);
  }

  getAvailableProperties(ownerId: string) {
    return this.propertiesRepository.getAvailable(ownerId);
  }
}
