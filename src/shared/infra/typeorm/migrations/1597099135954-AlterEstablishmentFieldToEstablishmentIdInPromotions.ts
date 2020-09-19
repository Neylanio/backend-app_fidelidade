import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterEstablishmentFieldToEstablishmentIdInPromotions1597099135954
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('promotions', 'establishment');
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.addColumn(
      'promotions',
      new TableColumn({
        name: 'establishment_id',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'promotions',
      new TableForeignKey({
        name: 'PromotionEstablishment',
        columnNames: ['establishment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'establishments',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('promotions', 'PromotionEstablishment');
    await queryRunner.dropColumn('promotions', 'establishment_id');
    await queryRunner.addColumn(
      'promotions',
      new TableColumn({
        name: 'establishment',
        type: 'varchar',
      }),
    );
  }
}
