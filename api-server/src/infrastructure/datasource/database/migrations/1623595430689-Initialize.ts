import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1623595430689 implements MigrationInterface {
    name = 'Initialize1623595430689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "game_log" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying(50) NOT NULL, "key" character varying(50) NOT NULL, "lang" character varying(10) NOT NULL, "value" character varying(1000), CONSTRAINT "PK_aa6bf6801cc1fa8f93d4e1ef3d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "num_param" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying(50) NOT NULL, "key" character varying(50) NOT NULL, "value" double precision, CONSTRAINT "PK_ba488abc790513da6a79e3bbf9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "str_param" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying(50) NOT NULL, "key" character varying(50) NOT NULL, "value" character varying(1000), CONSTRAINT "PK_23b5ceed509b3a1cd1a6d4554e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_id_link" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "linked_id_name" character varying(50) NOT NULL, "linked_id" character varying(500) NOT NULL, CONSTRAINT "PK_d0afa2ab8664fbc8797dbe4c5b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(20) NOT NULL, "location" character varying(50) NOT NULL, "lang" character varying(10) NOT NULL, "role" smallint NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_id_link" ADD CONSTRAINT "FK_bdf0c4fda9595b31b591562cd42" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "query-result-cache"`);
        await queryRunner.query(`ALTER TABLE "user_id_link" DROP CONSTRAINT "FK_bdf0c4fda9595b31b591562cd42"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_id_link"`);
        await queryRunner.query(`DROP TABLE "str_param"`);
        await queryRunner.query(`DROP TABLE "num_param"`);
        await queryRunner.query(`DROP TABLE "game_log"`);
    }

}
