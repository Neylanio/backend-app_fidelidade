import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddResponsibleEmployeeInEstablishment1599522834921
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'establishments',
      new TableColumn({
        name: 'responsible_employee',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('establishments', 'responsible_employee');
  }
}
