import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterCustomerFieldToCustomerIdInCards1597100253986
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('cards', 'customer');
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.addColumn(
      'cards',
      new TableColumn({
        name: 'customer_id',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'cards',
      new TableForeignKey({
        name: 'CardCustomer',
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customers',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cards', 'CardCustomer');
    await queryRunner.dropColumn('cards', 'customer_id');
    await queryRunner.addColumn(
      'cards',
      new TableColumn({
        name: 'customer',
        type: 'varchar',
      }),
    );
  }
}
