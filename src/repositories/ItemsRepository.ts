import Item from '../models/item';

interface CreateItemDTO {
  itemName: string;
  amountCurrent: number;
  amountMinimum: number;
  priceCost: string;
  priceSell: string;
}

class ItemsRepository {
  private items: Item[];

  constructor() {
    this.items = [];
  }

  public all(): Item[] {
    return this.items;
  }

  public findByName(itemName: string): Item | null {
    const findItem = this.items.find(item => itemName === item.itemName);

    return findItem || null;
  }

  public create({
    itemName,
    amountCurrent,
    amountMinimum,
    priceCost,
    priceSell,
  }: CreateItemDTO): Item {
    const item = new Item({
      itemName,
      amountCurrent,
      amountMinimum,
      priceCost,
      priceSell,
    });

    this.items.push(item);

    return item;
  }
}

export default ItemsRepository;
