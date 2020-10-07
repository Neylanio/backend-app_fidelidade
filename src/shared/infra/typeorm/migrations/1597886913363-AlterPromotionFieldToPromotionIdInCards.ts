import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterPromotionFieldToPromotionIdInCards1597886913363
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('cards', 'promotion');
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.addColumn(
      'cards',
      new TableColumn({
        name: 'promotion_id',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'cards',
      new TableForeignKey({
        name: 'PromotionId',
        columnNames: ['promotion_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'promotions',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cards', 'PromotionId');
    await queryRunner.dropColumn('cards', 'promotion_id');
    await queryRunner.addColumn(
      'cards',
      new TableColumn({
        name: 'promotion',
        type: 'varchar',
      }),
    );
  }
}
