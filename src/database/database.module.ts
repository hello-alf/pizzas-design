import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Global()
@Module({
  providers: [
    {
      provide: 'MONGO',
      useFactory: async () => {
        const uri =
          'mongodb://mongo:secret@localhost:27018/?authMechanism=DEFAULT';
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db('pizzas');
        return database;
      },
    },
  ],
  exports: ['MONGO'],
})
export class DatabaseModule {}
