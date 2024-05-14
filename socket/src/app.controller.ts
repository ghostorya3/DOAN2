import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { EventsGateway } from 'src/Socket/events.gateway';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly eventsGateway: EventsGateway
  ) { }
  @Post()
  returnResultForClient(@Body() data: any) {
    return this.eventsGateway.handleSendResult(data)
  }
}
