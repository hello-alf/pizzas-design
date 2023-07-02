import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

import { environments } from './environments';
import { OrdersModule } from './orders/orders.module';
import { MenuModule } from './menu/menu.module';
import config from './config';
import { DatabaseInitializer } from './database/initialize';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    DatabaseModule,
    OrdersModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseInitializer],
})
export class AppModule {}
