import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    async createUser(req): Promise<string> {
        return 'Usuário cadastrado com sucessso!'
    }
    async findAll() {
        return 'Lista de usuários';
    }
    async findOne(id: string) {
        return `Usuário ${id}`;
    }
    async update(id: string , req) {
        return `Usuário ${id} atualizado com sucesso!`;
    }

}
