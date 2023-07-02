import { Body, Controller, Post, Get } from '@nestjs/common';
import { MenuService } from '../services/menu.service';
import { CreatePizzaDto } from '../dtos/pizza.dtos';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('/')
  findAll() {
    return this.menuService.findAll();
  }

  @Post()
  create(@Body() payload: CreatePizzaDto) {
    return this.menuService.createPizza(payload);
  }
}
