import { Body, Controller, Post } from '@nestjs/common';
import { MenuService } from '../services/menu.service';
import { CreatePizzaDto } from '../dtos/pizza.dtos';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() payload: CreatePizzaDto) {
    return this.menuService.createPizza(payload);
  }
}
