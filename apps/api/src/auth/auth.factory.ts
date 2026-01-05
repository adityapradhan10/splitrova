import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/common/constants';

export function authJwtFactory(configService: ConfigService): JwtModuleOptions {
  return {
    secret: configService.get<string>(JWT_SECRET),
    signOptions: {
      expiresIn: '7d',
    },
  };
}
