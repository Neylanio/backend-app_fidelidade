import {TableColumn, MigrationInterface, QueryRunner} from "typeorm";

export default class AddTelFieldInEstablishments1601837788637 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'establishments',
            new TableColumn({
              name: 'tel',
              type: 'varchar',
              isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('establishments', 'tel');
    }

}
