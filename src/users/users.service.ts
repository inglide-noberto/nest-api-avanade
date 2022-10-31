import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { users } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async getUserById(id: string) {
        const user = await this.prisma.users.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!user) {
            throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async verifyUSerExists(email: string): Promise<boolean> {
        const user = await this.prisma.users.findUnique({
            where: {
                email,
            },
        });

        return user ? true : false;
    }

    async createUser(data): Promise<users> {
        const { name, email, password } = data;

        const checkUser = await this.verifyUSerExists(email);

        if (!checkUser) {
            const user = await this.prisma.users.create({
                data: {
                    name,
                    email,
                    password,
                },
            });

            if (!user) {
                throw new Error("Erro ao criar o usuário.");
            }
            return user;
        } else {
            throw new HttpException('Usuário já existe.', HttpStatus.BAD_REQUEST)
        }
    }
    async findAll() {
        console.log("Listando todos!");
        return await this.prisma.users.findMany();
    }
    async findOne(id: string) {
        return await this.prisma.users.findUnique({
            where: {
                id: Number(id),
            },
        });
    }
    async update(id: string, req) {
        const user = await this.getUserById(id);
        // extraindo as informações para alterar o usuario
        const { name, email, password } = req;

        const updateUser = await this.prisma.users.update({
            where: {
                id: Number(id),
            },
            data: {
                name: name? name : user.name,
                email: email? email: user.email,
                password: password? password: user.password,
            },
        });
        if (!updateUser) {
            throw new HttpException('Erro ao atualizar o usuário', HttpStatus.BAD_REQUEST,);
        }
        return {msg:`Usuário ${id} atualizado com sucesso!`};
    }
    async remove(id: string): Promise<object>{
        const user = await this.getUserById(id);

        const deleteUser = await this.prisma.users.delete({
            where:{
                id: Number(id),
            },
        });
        if(!deleteUser){
            throw new HttpException('Erro ao deletar o usuário.', HttpStatus.BAD_REQUEST,);
        }
        return {msg: `Usuário ${user.name} deletado com sucesso!`};
    }
}
