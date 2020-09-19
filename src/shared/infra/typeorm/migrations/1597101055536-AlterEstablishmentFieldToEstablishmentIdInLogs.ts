import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterEstablishmentFieldToEstablishmentIdInLogs1597101055536
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('logs', 'establishment');
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.addColumn(
      'logs',
      new TableColumn({
        name: 'establishment_id',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'logs',
      new TableForeignKey({
        name: 'LogEstablishment',
        columnNames: ['establishment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'establishments',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('logs', 'LogEstablishment');
    await queryRunner.dropColumn('logs', 'establishment_id');
    await queryRunner.addColumn(
      'logs',
      new TableColumn({
        name: 'establishment',
        type: 'varchar',
      }),
    );
  }
}
