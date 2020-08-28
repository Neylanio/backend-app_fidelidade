import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePromotions1597098756813
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(
      new Table({
        name: 'promotions',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'limit_date',
            type: 'timestamp with time zone',
          },
          {
            name: 'establishment',
            type: 'varchar',
          },
          {
            name: 'total_stamps',
            type: 'int',
          },
          {
            name: 'active',
            type: 'char',
            length: '2',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('promotions');
  }
}
