import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pizza } from '../entities/pizza.entity';

@Injectable()
export class PizzaRepository {
  constructor(@InjectModel(Pizza.name) private pizzaModel: Model<Pizza>) {}

  async find(): Promise<Pizza[]> {
    return this.pizzaModel.find().exec();
  }

  async findOneById(menuId: string): Promise<Pizza> {
    return this.pizzaModel.findById(menuId).exec();
  }
}
