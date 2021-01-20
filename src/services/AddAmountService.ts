import { getCustomRepository } from 'typeorm';
import Item from '../models/item';
import ItemsRepository from '../repositories/ItemsRepository';

interface Request {
  id: string;
  addAmount: number;
}

class AddAmountService {
  public async execute({ id, addAmount }: Request): Promise<Item> {
    const itemsRepository = getCustomRepository(ItemsRepository);

    const item = await itemsRepository.findOne({ where: { id } });

    if (!item) throw new Error('Item not found');

    if (addAmount < 0) {
      throw new Error('Zero/Negative is not allowed');
    }

    await itemsRepository.update(item.id, {
      amountCurrent: addAmount,
    });

    item.amountCurrent = addAmount;
    const newItem = item;

    console.log(item)
    return newItem;
  }
}

export default AddAmountService;
