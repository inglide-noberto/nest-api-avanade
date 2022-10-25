import { 
    Body, 
    Controller, 
    HttpException, 
    HttpStatus, 
    Post 
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    //injeção de dependencia
    constructor(private readonly authService: AuthService ) { }

    @Post('login')
    async validaLogin(@Body() req) {
        const { login, password } = req;

        if(!login){
            // return{ error: true, msg: 'Login não encontrado!'};
            throw new HttpException('Login não encontrado', HttpStatus.FORBIDDEN)
        }

        console.log('login' , login);
        console.log('senha' , password);
        return this.authService.validaLogin(login, password);
    }
}
