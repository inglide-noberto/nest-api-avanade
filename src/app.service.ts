import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getLogin(): string {
    return 'Aqui virá o login!';
  }
  getRegister(): string {
    return 'Aqui virá o cadastro!';
  }
}
