import { Injectable } from '@nestjs/common';
import { CredentialsSignupDto } from './dto/credentials-signup.dto';
import { CredentialsSigninDto } from './dto/credentials-signin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionsService } from 'src/settings/exceptions';
import { hashPassword, comparePassword } from 'src/utils/funcs';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly exceptionService: ExceptionsService,
  ) {}

  async signup(payload: CredentialsSignupDto): Promise<Partial<User>> {
    try {
      return await this.prismaService.user.create({
        data: {
          email: payload.email,
          password: await hashPassword(payload.password),
        },
        select: {
          id: true,
          email: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        this.exceptionService.conflicException({
          message: 'The email is already in use',
          code: 409,
        });
      }
      this.exceptionService.internalServerErrorException({
        message: error.message,
        code: 500,
      });
    }
  }

  async signin(payload: CredentialsSigninDto) {
    try {
      const user = await this.prismaService.user.findUniqueOrThrow({
        where: {
          email: payload.email,
        },
      });

      const isMatch = await comparePassword(payload.password, user.password);
      if (!isMatch) {
        this.exceptionService.badRequestException({
          message: 'The email or password is incorrect',
          code: 400,
        });
      }

      // TODO: Add JWT
      return {
        id: user.id,
        email: user.email,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        this.exceptionService.notFoundException({
          message: 'The email or password is incorrect',
          code: 400,
        });
      }
      throw error;
    }
  }
}
