import { Module } from '@nestjs/common';
import { ChirpsService } from './chirps.service';
import { ChirpsController } from './chirps.controller';

@Module({
  controllers: [ChirpsController],
  providers: [ChirpsService]
})
export class ChirpsModule {}
