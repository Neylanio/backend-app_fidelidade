import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterEstablishmentFieldToEstablishmentIdInEstablishmentLinks1597884304611
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('establishment_links', 'establishment');
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.addColumn(
      'establishment_links',
      new TableColumn({
        name: 'establishment_id',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'establishment_links',
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
    await queryRunner.dropForeignKey('establishment_links', 'EstablishmentId');
    await queryRunner.dropColumn('establishment_links', 'establishment_id');
    await queryRunner.addColumn(
      'establishment_links',
      new TableColumn({
        name: 'establishment',
        type: 'varchar',
      }),
    );
  }
}
