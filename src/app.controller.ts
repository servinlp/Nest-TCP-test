import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'

@Controller()
export class AppController {
  constructor() {}

  @MessagePattern('sum')
  sum(data: number[]): number {
    console.log(data)
    return data.reduce((a, b) => a + b, 0)
  }
}
