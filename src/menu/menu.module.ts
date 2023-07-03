import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pizza, PizzaSchema } from './entities/pizza.entity';
import { MenuController } from './controller/menu.controller';
import { MenuService } from './services/menu.service';
import { PizzaRepository } from './repositories/pizza.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Pizza.name,
        schema: PizzaSchema,
      },
    ]),
  ],
  controllers: [MenuController],
  providers: [MenuService, PizzaRepository],
  exports: [PizzaRepository],
})
export class MenuModule {}
