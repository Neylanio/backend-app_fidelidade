import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterEmployeeFieldToEmployeeIdInLogs1597100810492
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('logs', 'employee');
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.addColumn(
      'logs',
      new TableColumn({
        name: 'employee_id',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'logs',
      new TableForeignKey({
        name: 'LogEmployee',
        columnNames: ['employee_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'employees',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('logs', 'LogEmployee');
    await queryRunner.dropColumn('logs', 'employee_id');
    await queryRunner.addColumn(
      'logs',
      new TableColumn({
        name: 'employee',
        type: 'varchar',
      }),
    );
  }
}
