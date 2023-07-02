import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pizza } from '../menu/entities/pizza.entity';
import Size from 'src/menu/enums/size.enum';

@Injectable()
export class DatabaseInitializer implements OnModuleInit {
  constructor(@InjectModel(Pizza.name) private pizzaModel: Model<Pizza>) {}

  async onModuleInit() {
    await this.initializeOrders();
  }

  async initializeOrders() {
    const existingOrders = await this.pizzaModel.find().exec();

    if (existingOrders.length !== 0) return;

    const ordersData = [
      {
        name: 'Pizza Hawaiana',
        size: Size.SMALL,
        unitPrice: 25,
        ingredients: ['Piña', 'Queso', 'Jamon'],
      },
      {
        name: 'Pizza Hawaiana',
        size: Size.MEDIUM,
        unitPrice: 50,
        ingredients: ['Piña', 'Queso', 'Jamon'],
      },
      {
        name: 'Pizza Hawaiana',
        size: Size.BIG,
        unitPrice: 85,
        ingredients: ['Piña', 'Queso', 'Jamon'],
      },
      {
        name: 'Pizza Carnivora',
        size: Size.SMALL,
        unitPrice: 30,
        ingredients: ['Carne molida', 'Tocino', 'Jamon', 'Queso'],
      },
      {
        name: 'Pizza Carnivora',
        size: Size.MEDIUM,
        unitPrice: 30,
        ingredients: ['Carne molida', 'Tocino', 'Jamon', 'Queso'],
      },
      {
        name: 'Pizza Carnivora',
        size: Size.BIG,
        unitPrice: 30,
        ingredients: ['Carne molida', 'Tocino', 'Jamon', 'Queso'],
      },
      {
        name: 'Pizza Vegetariana',
        size: Size.SMALL,
        unitPrice: 20,
        ingredients: ['Tomate', 'Pimiento', 'Cebolla', 'Aceitunas'],
      },
      {
        name: 'Pizza Vegetariana',
        size: Size.MEDIUM,
        unitPrice: 40,
        ingredients: ['Tomate', 'Pimiento', 'Cebolla', 'Aceitunas'],
      },
      {
        name: 'Pizza Vegetariana',
        size: Size.BIG,
        unitPrice: 70,
        ingredients: ['Tomate', 'Pimiento', 'Cebolla', 'Aceitunas'],
      },
      {
        name: 'Pizza Margherita',
        size: Size.SMALL,
        unitPrice: 15,
        ingredients: ['Tomate', 'Queso', 'Albahaca'],
      },
      {
        name: 'Pizza Margherita',
        size: Size.MEDIUM,
        unitPrice: 30,
        ingredients: ['Tomate', 'Queso', 'Albahaca'],
      },
      {
        name: 'Pizza Margherita',
        size: Size.BIG,
        unitPrice: 50,
        ingredients: ['Tomate', 'Queso', 'Albahaca'],
      },
      {
        name: 'Pizza BBQ',
        size: Size.SMALL,
        unitPrice: 30,
        ingredients: ['Pollo', 'Cebolla', 'Queso', 'Salsa BBQ'],
      },
      {
        name: 'Pizza BBQ',
        size: Size.MEDIUM,
        unitPrice: 55,
        ingredients: ['Pollo', 'Cebolla', 'Queso', 'Salsa BBQ'],
      },
      {
        name: 'Pizza BBQ',
        size: Size.BIG,
        unitPrice: 90,
        ingredients: ['Pollo', 'Cebolla', 'Queso', 'Salsa BBQ'],
      },
      {
        name: 'Pizza Pepperoni',
        size: Size.SMALL,
        unitPrice: 25,
        ingredients: ['Pepperoni', 'Queso', 'Tomate'],
      },
      {
        name: 'Pizza Pepperoni',
        size: Size.MEDIUM,
        unitPrice: 45,
        ingredients: ['Pepperoni', 'Queso', 'Tomate'],
      },
      {
        name: 'Pizza Pepperoni',
        size: Size.BIG,
        unitPrice: 75,
        ingredients: ['Pepperoni', 'Queso', 'Tomate'],
      },
    ];

    for (const orderData of ordersData) {
      const order = new this.pizzaModel(orderData);
      await order.save();
    }
  }
}
