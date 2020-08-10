import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterEstablishmentFieldToEstablishmentIdInEstablishmentCustomer1597097537928
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('establishment_customer', 'establishment');
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.addColumn(
      'establishment_customer',
      new TableColumn({
        name: 'establishment_id',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'establishment_customer',
      new TableForeignKey({
        name: 'EstablishmentId',
        columnNames: ['establishment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'establishments',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'establishment_customer',
      'EstablishmentId',
    );
    await queryRunner.dropColumn('establishment_customer', 'establishment_id');
    await queryRunner.addColumn(
      'establishment_customer',
      new TableColumn({
        name: 'establishment',
        type: 'varchar',
      }),
    );
  }
}
