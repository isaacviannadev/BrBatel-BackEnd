import { getCustomRepository } from 'typeorm';

import Item from '../models/item';
import ItemsRepository from '../repositories/ItemsRepository';

interface Request {
  id: string;
  itemName: string;
  amountCurrent: number;
  amountMinimum: number;
  priceCost: string;
  priceSell: string;
}

class UpdateItemService {
  public async execute({
    id,
    itemName,
    amountCurrent,
    amountMinimum,
    priceCost,
    priceSell,
  }: Request): Promise<Item> {
    const itemsRepository = getCustomRepository(ItemsRepository);

    const item = await itemsRepository.findById(id);

    if (!item) {
      throw Error('This item is not exists');
    }

    item.itemName = itemName;
    item.amountCurrent = amountCurrent;
    item.amountMinimum = amountMinimum;
    item.priceCost = priceCost;
    item.priceSell = priceSell;

    await itemsRepository.save(item);

    return item;
  }
}

export default UpdateItemService;
