import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterColumnTypeNumberInEstablishments1599525874697
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'establishments',
      'number',
      new TableColumn({
        name: 'number',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'establishments',
      'number',
      new TableColumn({
        name: 'number',
        type: 'int',
      }),
    );
  }
}
