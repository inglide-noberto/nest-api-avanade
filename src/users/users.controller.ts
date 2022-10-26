import { 
    Controller, 
    Get, 
    Post, 
    Patch, 
    Delete, 
    Body, 
    Param,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    // criar
    @Post()
    async createUser(@Body() req: CreateUserDTO): Promise<string>{
        return this.usersService.createUser(req);
    }

    // listar todos
    @Get()
    async findAll(){
        this.usersService.findAll();
    }
    //  listar um
    @Get(':id')
    async findOne(@Param('id') id: string){
        this.usersService.findOne(id);
    }
    // atualizar 
    @Patch(':id')
    async update(@Param('id') id: string, @Body() req: UpdateUserDTO){
        return this.usersService.update(id, req);
    }
    // Deletar
}
