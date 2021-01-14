import { getCustomRepository } from 'typeorm';

import Item from '../models/item';
import ItemsRepository from '../repositories/ItemsRepository';

interface Request {
  itemName: string;
  amountCurrent: number;
  amountMinimum: number;
  priceCost: string;
  priceSell: string;
}

class RegisterItemService {
  public async execute({
    itemName,
    amountCurrent,
    amountMinimum,
    priceCost,
    priceSell,
  }: Request): Promise<Item> {
    const itemsRepository = getCustomRepository(ItemsRepository);

    const findItemOnDB = await itemsRepository.findByName(itemName);

    if (findItemOnDB) {
      throw Error('This item is already exists');
    }

    const item = itemsRepository.create({
      itemName,
      amountCurrent,
      amountMinimum,
      priceCost,
      priceSell,
    });

    await itemsRepository.save(item);

    return item;
  }
}

export default RegisterItemService;
