import {
  Controller,
  Post,
  Body,
  Get,
} from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './dto/register.dto';

@Controller('registrations')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  async register(@Body() dto: CreateRegistrationDto) {
    return this.registrationService.register(dto);
  }

  @Get()
  async findAll() {
    return this.registrationService.getAllRegistrations();
  }
}
