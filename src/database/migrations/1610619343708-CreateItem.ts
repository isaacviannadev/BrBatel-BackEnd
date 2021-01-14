import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateItem1610619343708 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'items',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'itemName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'amountCurrent',
            type: 'smallint',
            isNullable: false,
          },
          {
            name: 'amountMinimum',
            type: 'smallint',
            isNullable: false,
          },
          {
            name: 'priceCost',
            type: 'numeric',
            isNullable: false,
            default: 0.0,
          },
          {
            name: 'priceSell',
            type: 'numeric',
            isNullable: false,
            default: 0.0,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('items');
  }
}
