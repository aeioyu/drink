import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MachinesModule } from './machines/machines.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { InventoriesModule } from './inventories/inventories.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      ssl: {
        rejectUnauthorized: false, // [TODO]: need to set "true" on production
      },
      autoLoadEntities: true,
      synchronize: true, // [TODO]: need to set "false" on production
    }),
    MachinesModule,
    ProductsModule,
    InventoriesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
