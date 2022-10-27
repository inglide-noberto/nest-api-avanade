import { MigrationInterface, QueryRunner } from "typeorm"

export class userSeed1666895126223 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO users (name, email, password) VALUES ('Inglide Noberto', 'inglidenoberto@gmail.com', '123456')`,
        );
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM users WHERE email = 'inglidenoberto@gmail.com'`,
          );      
    }

}
