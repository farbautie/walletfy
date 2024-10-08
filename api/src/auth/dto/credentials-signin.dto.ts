import { PartialType, OmitType } from '@nestjs/swagger';
import { CredentialsSignupDto } from './credentials-signup.dto';

export class CredentialsSigninDto extends PartialType(
  OmitType(CredentialsSignupDto, ['confirmPassword']),
) {}
