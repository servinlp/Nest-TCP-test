import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { configService } from './environment/config.service'
import { Transport } from '@nestjs/common/enums/transport.enum'

async function bootstrap() {
  // Have to turn port into number (even if it is already a number)
  const port = Number(configService.get('PORT'))
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      port,
    },
  })
  app.listen(() => console.log('Residence microservice is listening'))
}
bootstrap()
