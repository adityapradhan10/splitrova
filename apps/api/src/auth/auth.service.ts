import { ForbiddenException, Injectable } from '@nestjs/common';
import { metadata, module } from 'src/common/metadata';
import { SupabaseService } from './supabase.service';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  signup() {
    throw new ForbiddenException({
      code: metadata.AUTH.INVALID,
      module: module.AUTH,
    });
  }
  login() {
    throw new ForbiddenException({
      code: metadata.AUTH.INVALID,
      module: module.AUTH,
    });
  }
}
