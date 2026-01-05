import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AUTH_SERVICE_KEY, AUTH_SERVICE_URL } from 'src/common/constants';

@Injectable()
export class ExternalService implements OnModuleInit {
  private supabase!: SupabaseClient;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const supabaseUrl = this.configService.get<string>(AUTH_SERVICE_URL);
    const supabaseKey = this.configService.get<string>(AUTH_SERVICE_KEY);

    if (!supabaseUrl || !supabaseKey) {
      throw new Error();
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  signup(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }

  login(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }
}
