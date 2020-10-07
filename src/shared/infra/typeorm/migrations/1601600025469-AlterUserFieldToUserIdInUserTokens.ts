import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AlterUserFieldToUserIdInUserTokens1601600025469 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user_tokens', 'user');
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.addColumn(
      'user_tokens',
      new TableColumn({
        name: 'user_id',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'user_tokens',
      new TableForeignKey({
        name: 'UserId',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'user_tokens',
      'UserId',
    );
    await queryRunner.dropColumn('user_tokens', 'user_id');
    await queryRunner.addColumn(
      'user_tokens',
      new TableColumn({
        name: 'user',
        type: 'varchar',
      }),
    );
  }

}
