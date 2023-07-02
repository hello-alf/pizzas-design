import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pizza } from '../entities/pizza.entity';
import { CreatePizzaDto } from '../dtos/pizza.dtos';

@Injectable()
export class MenuService {
  constructor(@InjectModel(Pizza.name) private pizzaModel: Model<Pizza>) {}

  findAll() {
    return this.pizzaModel.find().exec();
  }

  createPizza(data: CreatePizzaDto) {
    const newPizza = new this.pizzaModel(data);
    return newPizza.save();
  }
}
