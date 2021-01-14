import { uuid } from 'uuidv4';

class Item {
  id: string;

  itemName: string;

  amountCurrent: number;

  amountMinimum: number;

  priceCost: string;

  priceSell: string;

  constructor({
    itemName,
    amountCurrent,
    amountMinimum,
    priceCost,
    priceSell,
  }: Omit<Item, 'id'>) {
    this.id = uuid();
    this.itemName = itemName;
    this.amountCurrent = amountCurrent;
    this.amountMinimum = amountMinimum;
    this.priceCost = priceCost;
    this.priceSell = priceSell;
  }
}

export default Item;
