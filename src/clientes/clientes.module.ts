import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import {Cliente, ClienteSchema } from './entities/cliente.entity';  
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: Cliente.name, schema: ClienteSchema}])],
  controllers: [ClientesController],
  providers: [ClientesService]
})
export class ClientesModule {}
