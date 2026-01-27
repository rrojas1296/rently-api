import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreatePropertyDto } from '../dtos/createProperty.dto';
import { PropertiesService } from '../services/properties.service';
import { JwtGuard } from 'src/modules/guards/jwt.guard';
import { type RequestWithUser } from 'src/modules/auth/types/requestWithUser.interface';

@UseGuards(JwtGuard)
@Controller('properties')
export class PropertiesController {
  constructor(private readonly _propertiesService: PropertiesService) {}

  @Get()
  async getAllProperties(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    const properties = await this._propertiesService.getAllProperties(userId);
    return {
      message: 'Properties found successfully',
      status: 200,
      data: {
        properties,
        hasProperties: properties.length > 0,
      },
    };
  }

  @Post()
  async createProperty(
    @Req() req: RequestWithUser,
    @Body() data: CreatePropertyDto,
  ) {
    const userId = req.user.id;
    const id = await this._propertiesService.createProperty(data, userId);
    return { message: 'Property created successfully', status: 201, id };
  }
}
