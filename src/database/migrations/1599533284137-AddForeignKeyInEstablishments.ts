import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddForeignKeyInEstablishments1599533284137
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('establishments', 'responsible_employee');
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.addColumn(
      'establishments',
      new TableColumn({
        name: 'responsible_employee_id',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'establishments',
      new TableForeignKey({
        name: 'EmployeeEstablishment_id',
        columnNames: ['responsible_employee_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'employees',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'establishments',
      'EmployeeEstablishment_id',
    );
    await queryRunner.dropColumn('establishments', 'responsible_employee_id');
    await queryRunner.addColumn(
      'emplestablishmentsoyees',
      new TableColumn({
        name: 'responsible_employee',
        type: 'varchar',
      }),
    );
  }
}
