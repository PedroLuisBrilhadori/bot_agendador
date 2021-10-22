import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente, ClienteDocument } from './entities/cliente.entity';

@Injectable()
export class ClientesService {

  constructor(
    @InjectModel(Cliente.name) private clienteModel: Model<ClienteDocument>
  ) {}

  create(createClienteDto: CreateClienteDto) {
    const cliente = new this.clienteModel(createClienteDto);
    return cliente.save();
  }

  findAll() {
    return this.clienteModel.find();
  }

  findOne(id: string) {
    return this.clienteModel.findById(id);
  }

  update(id: string, updateClienteDto: UpdateClienteDto) {
    return this.clienteModel.findByIdAndUpdate(
      {
        _id: id
      },
      {
        $new: updateClienteDto
      },
      {
        new: true
      }
    );
  }

  remove(id: string) {
    return this.clienteModel.deleteOne({
      _id: id
    })
    .exec();
  }
}
