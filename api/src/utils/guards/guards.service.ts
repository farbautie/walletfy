import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionsService } from 'src/settings/exceptions';

@Injectable()
export class GuardsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly exceptionService: ExceptionsService,
  ) {}

  async validateAccess(token: string) {
    const session = await this.prismaService.sessions.findFirst({
      where: {
        access_token: token,
        expires: { gt: new Date() },
      },
      select: {
        id: true,
        access_token: true,
      },
    });
    if (!session) {
      this.exceptionService.forbiddenException({
        message: 'Invalid access token',
        code: 403,
      });
    }
    return session;
  }

  async validateRefresh(token: string) {
    const session = await this.prismaService.sessions.findFirst({
      where: {
        refresh_token: token,
        expires: { gt: new Date() },
      },
      select: {
        id: true,
        refresh_token: true,
      },
    });

    if (!session) {
      this.exceptionService.forbiddenException({
        message: 'Invalid refresh token',
        code: 403,
      });
    }
    return session;
  }
}
