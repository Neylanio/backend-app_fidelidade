import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterCustomerFieldToCustomerIdInEstablishmentCustomer1597098318757
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('establishment_customer', 'customer');
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.addColumn(
      'establishment_customer',
      new TableColumn({
        name: 'customer_id',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'establishment_customer',
      new TableForeignKey({
        name: 'CustomerId',
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customers',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('establishment_customer', 'CustomerId');
    await queryRunner.dropColumn('establishment_customer', 'customer_id');
    await queryRunner.addColumn(
      'establishment_customer',
      new TableColumn({
        name: 'customer',
        type: 'varchar',
      }),
    );
  }
}
