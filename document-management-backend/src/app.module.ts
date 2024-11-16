import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentModule } from './modules/document/document.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
        type: configService.get<string>('DB_TYPE') as any,
        url: configService.get<string>('DB_URL'),
        synchronize: false,
        useUnifiedTopology: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
    }),
    DocumentModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
