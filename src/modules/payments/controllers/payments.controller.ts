import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { PaymentsService } from '../services/payments.service';
import { type RequestWithUser } from 'src/modules/auth/types/requestWithUser.interface';
import { JwtGuard } from 'src/modules/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly _paymentsService: PaymentsService) {}

  @Get('filters')
  async getFilters(@Req() req: RequestWithUser) {
    const ownerId = req.user.id;
    const data = await this._paymentsService.getFilters(ownerId);
    return {
      message: 'Filters found successfully',
      status: 200,
      data,
    };
  }
}
