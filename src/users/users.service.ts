import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { users } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async verifyUSerExists(email: string): Promise<boolean> {
        const user = await this.prisma.users.findFirst({
            where: {
                email,
            },
        });
        if (user) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Email já cadastrado',
                },
                HttpStatus.BAD_REQUEST,

            )
        }
        return false;
    }

    async createUser(data): Promise<users> {
        const { name, email, password } = data;

        const checkUser = await this.verifyUSerExists(email);

        if (!checkUser) {

            const user = await this.prisma.users.create({
                data: {
                    name,
                    email,
                    password
                },
            });

            if (!user) {
                throw new Error("Erro ao criar o usuário");
            }

            return user;
        }
    }
    async findAll() {
        return 'Lista de usuários';
    }
    async findOne(id: string) {
        return `Usuário ${id}`;
    }
    async update(id: string, req) {
        return `Usuário ${id} atualizado com sucesso!`;
    }

}
