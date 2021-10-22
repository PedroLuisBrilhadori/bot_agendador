import { Controller } from '@nestjs/common';
import { DialogService } from './dialog.service';

@Controller('dialog')
export class DialogController {
  constructor(private readonly dialogService: DialogService) {}
}
