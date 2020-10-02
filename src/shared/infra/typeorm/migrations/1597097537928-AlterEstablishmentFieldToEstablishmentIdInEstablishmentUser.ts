import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterEstablishmentFieldToEstablishmentIdInEstablishmentUser1597097537928
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('establishment_user', 'establishment');
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.addColumn(
      'establishment_user',
      new TableColumn({
        name: 'establishment_id',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'establishment_user',
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
      'establishment_user',
      'EstablishmentId',
    );
    await queryRunner.dropColumn('establishment_user', 'establishment_id');
    await queryRunner.addColumn(
      'establishment_user',
      new TableColumn({
        name: 'establishment',
        type: 'varchar',
      }),
    );
  }
}
