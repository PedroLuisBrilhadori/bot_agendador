import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DialogModule } from './dialog/dialog.module';
import { DialogCadastroService } from './dialog/services/dialog-cadastro.service';
const { linkDB } = require('../config.json')

@Module({
  imports: [
    // MongooseModule.forRoot(linkDB),
    // ClientesModule,
    DialogModule, 
  ],
  controllers: [AppController],
  providers: [AppService, DialogCadastroService],
})
export class AppModule {}