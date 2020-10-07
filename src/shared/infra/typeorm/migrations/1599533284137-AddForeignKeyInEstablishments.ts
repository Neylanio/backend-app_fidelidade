import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddForeignKeyInEstablishments1599533284137
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('establishments', 'responsible_user');
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.addColumn(
      'establishments',
      new TableColumn({
        name: 'responsible_user_id',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'establishments',
      new TableForeignKey({
        name: 'UserEstablishment_id',
        columnNames: ['responsible_user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'establishments',
      'UserEstablishment_id',
    );
    await queryRunner.dropColumn('establishments', 'responsible_user_id');
    await queryRunner.addColumn(
      'establishments',
      new TableColumn({
        name: 'responsible_user',
        type: 'varchar',
      }),
    );
  }
}
