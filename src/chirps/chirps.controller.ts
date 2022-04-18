import { Controller } from '@nestjs/common';
import { ChirpsService } from './chirps.service';

@Controller('chirps')
export class ChirpsController {
  constructor(private readonly chirpsService: ChirpsService) {}
}
