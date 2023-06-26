import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(@Inject('MONGO') private database: Db) {}

  get_delivery_free(): any {
    const delivery = [4];
    return delivery;
  }

  get_two_per_one(): any {
    const days = [2, 3];
    return days;
  }

  getPizzas(): any {
    const pizzas = [
      {
        nro: 1,
        pizza: 'Pizza Margarita',
        ingredientes: 'salsa de tomate, queso mozzarella, albahaca fresca',
        precio: 60,
      },
      {
        nro: 2,
        pizza: 'Pizza Pepperoni',
        ingredientes: 'salsa de tomate, queso mozzarella, pepperoni.',
        precio: 60,
      },
      {
        nro: 3,
        pizza: 'Pizza Hawaiana',
        ingredientes: 'salsa de tomate, queso mozzarella, jamón, piña',
        precio: 55,
      },
      {
        nro: 4,
        pizza: 'Pizza BBQ',
        ingredientes:
          'salsa barbacoa, queso cheddar, pollo a la parrilla, cebolla roja',
        precio: 60,
      },
      {
        nro: 5,
        pizza: 'Pizza Vegetariana',
        ingredientes:
          'salsa de tomate, queso mozzarella, champiñones, pimientos, cebolla, aceitunas.',
        precio: 70,
      },
      {
        nro: 6,
        pizza: 'Pizza Cuatro Quesos',
        ingredientes:
          'salsa de tomate, queso mozzarella, queso cheddar, queso azul, queso parmesano.',
        precio: 65,
      },
    ];

    return pizzas;
  }

  obtenerOrden(array1, array2) {
    return array1.filter((item1) =>
      array2.some((item2) => item1.id === item2.id),
    );
  }

  async processOrder(body) {
    const { order, day } = body;
    // const actual_order = order.findall();
    const ordersCollection = this.database.collection('orders');
    const orders = await ordersCollection.find().toArray();
    console.log('orders', orders);
    return { message: 'Orden registrada' };
  }
}
