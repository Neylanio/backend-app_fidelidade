import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterCustomerFieldToCustomerIdInCards1597100253986
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('cards', 'user');
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.addColumn(
      'cards',
      new TableColumn({
        name: 'user_id',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'cards',
      new TableForeignKey({
        name: 'CardUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cards', 'CardUser');
    await queryRunner.dropColumn('cards', 'user_id');
    await queryRunner.addColumn(
      'cards',
      new TableColumn({
        name: 'user',
        type: 'varchar',
      }),
    );
  }
}
