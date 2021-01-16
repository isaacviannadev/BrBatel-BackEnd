import { getRepository } from 'typeorm';

import Item from '../models/item';

interface Request {
  item_id: string;
}

class ShowItemService {
  public async execute({ item_id }: Request): Promise<Item> {
    const itemsRepository = getRepository(Item);

    const item = await itemsRepository.findOne(item_id);

    if (!item) {
      throw new Error('Item not found');
    }

    return item;
  }
}

export default ShowItemService;
