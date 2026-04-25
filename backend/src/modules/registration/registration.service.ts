import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegistrationService {
  constructor(private prisma: PrismaService) {}

  async register(data: any) {
    try {
      return await this.prisma.registration.create({
        data: {
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          university: data.university,
          origin: data.origin,
          gender: data.gender,
          status: 'pending',
        },
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw new InternalServerErrorException('Gagal memproses pendaftaran');
    }
  }

  async getAllRegistrations() {
    return this.prisma.registration.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
