import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('items')
class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  itemName: string;

  @Column('int2')
  amountCurrent: number;

  @Column('int2')
  amountMinimum: number;

  @Column('numeric')
  priceCost: string;

  @Column('numeric')
  priceSell: string;
}

export default Item;
