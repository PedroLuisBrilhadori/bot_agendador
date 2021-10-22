import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://pedrin:p3dr1nh0lb@cluster0.e0amz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
    ClientesModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}