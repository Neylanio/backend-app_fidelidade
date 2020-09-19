import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AlterNameFieldToSurnameInEmployees1600471686998 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.changeColumn(
        'employees',
        'name',
        new TableColumn({
          name: 'surname',
          type: 'varchar',
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.changeColumn(
        'employees',
        'surname',
        new TableColumn({
          name: 'name',
          type: 'varchar',
        })
      );
    }

}
