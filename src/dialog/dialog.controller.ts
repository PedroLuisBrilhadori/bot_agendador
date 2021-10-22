import { Controller, Post, Req, Res} from '@nestjs/common';
import { DialogService } from './services/dialog.service';
import { Request, Response } from 'express';


@Controller('dialog')
export class DialogController {


  constructor(private readonly dialogService: DialogService) {}


  @Post() 
  redirectFunction(@Req() req: Request, @Res() res: Response): void {
    this.dialogService.redirectFunction(req, res);
  }

}
