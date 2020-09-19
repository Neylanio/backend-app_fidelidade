import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddTypeColumnInUsers1599016570395
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'type',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'type');
  }
}
