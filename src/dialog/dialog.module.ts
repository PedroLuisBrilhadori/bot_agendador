import { Module } from '@nestjs/common';
import { DialogService } from './services/dialog.service';
import { DialogController } from './dialog.controller';
import { DialogCadastroService } from './services/dialog-cadastro.service';


@Module({
  controllers: [DialogController],
  providers: [DialogService, DialogCadastroService]
})
export class DialogModule {}
