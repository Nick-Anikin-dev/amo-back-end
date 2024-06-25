import { Module } from '@nestjs/common';
import { LeadsModule } from './leads/leads.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LeadsModule
  ],
})
export class AppModule {}
