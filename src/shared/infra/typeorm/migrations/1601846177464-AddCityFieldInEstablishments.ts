import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddCityFieldInEstablishments1601846177464 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'establishments',
        new TableColumn({
          name: 'city',
          type: 'varchar'
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('establishments', 'city');
    }

}
