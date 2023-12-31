import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/order2')
  processOrder(@Body() body): any {
    return this.appService.processOrder(body);
  }
}
