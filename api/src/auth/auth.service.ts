import { Injectable } from '@nestjs/common';
import { CredentialsSignupDto } from './dto/credentials-signup.dto';
import { CredentialsSigninDto } from './dto/credentials-signin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionsService } from 'src/settings/exceptions';
import { hashPassword, comparePassword } from 'src/utils/funcs';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { JWT_CONSTANS } from 'src/utils/constans';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
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

      return await this.generateTokens(user);
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

  async generateRefreshToken(id: string) {
    try {
      const user = await this.prismaService.user.findUniqueOrThrow({
        where: {
          id,
        },
      });

      return await this.generateTokens(user);
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

  async logout(id: string) {
    await this.prismaService.sessions.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Successfully logged out',
      code: 200,
    };
  }

  private async generateSession({ accessToken, refreshToken, user }: any) {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 8);

    await this.prismaService.sessions.create({
      data: {
        user_id: user.id,
        expires: expiresAt,
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    });
  }

  async checkActiveSession(user: User) {
    return await this.prismaService.sessions.findFirst({
      where: {
        user_id: user.id,
        expires: {
          gt: new Date(),
        },
      },
    });
  }

  private async generateTokens(user: User) {
    const payload = {
      id: user.id,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: JWT_CONSTANS.ACCESS_SECRET,
        expiresIn: JWT_CONSTANS.ACCESS_EXPIRES_IN,
      }),
      this.jwtService.signAsync(payload, {
        secret: JWT_CONSTANS.REFRESH_SECRET,
        expiresIn: JWT_CONSTANS.REFRESH_EXPIRES_IN,
      }),
    ]);
    await this.generateSession({
      user,
      accessToken,
      refreshToken,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}
