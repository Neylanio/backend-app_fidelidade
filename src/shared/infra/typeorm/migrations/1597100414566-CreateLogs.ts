import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateLogs1597100414566 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(
      new Table({
        name: 'logs',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'ip',
            type: 'varchar',
          },
          {
            name: 'user',
            type: 'varchar',
          },
          {
            name: 'establishment',
            type: 'varchar',
          },
          {
            name: 'where',
            type: 'varchar',
          },
          {
            name: 'what',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('logs');
  }
}
