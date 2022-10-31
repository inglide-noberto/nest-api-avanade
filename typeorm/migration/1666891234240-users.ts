import { MigrationInterface, QueryRunner, Table } from "typeorm"
import { idColumn } from "../utils/idColumn";
import { varcharColumn } from "../utils/varcharColumns";

export class users1666891234240 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [idColumn('id'), 
            varcharColumn('name', '100', false),
            varcharColumn('email', '255', false, true),
            varcharColumn('password', '64', false)
        ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
