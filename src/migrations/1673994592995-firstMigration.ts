import { MigrationInterface, QueryRunner } from "typeorm";

export class firstMigration1673994592995 implements MigrationInterface {
    name = 'firstMigration1673994592995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "restaurant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(180) NOT NULL, "cnpj" character varying(14) NOT NULL, "address" character varying(480) NOT NULL, "phone" character varying(11) NOT NULL, "openTimes" json NOT NULL, "typeId" integer NOT NULL, CONSTRAINT "UQ_acb75cd4c977e0aaf0b59a30aa0" UNIQUE ("id", "name", "cnpj"), CONSTRAINT "PK_649e250d8b8165cb406d99aa30f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "type" ("id" SERIAL NOT NULL, "name" character varying(60) NOT NULL, CONSTRAINT "UQ_069f02c3c26ea8fbc3fc0ce9d9f" UNIQUE ("id", "name"), CONSTRAINT "PK_40410d6bf0bedb43f9cadae6fef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_6de9a3c6383a140eb4575c141ed" FOREIGN KEY ("typeId") REFERENCES "type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_6de9a3c6383a140eb4575c141ed"`);
        await queryRunner.query(`DROP TABLE "type"`);
        await queryRunner.query(`DROP TABLE "restaurant"`);
    }

}
