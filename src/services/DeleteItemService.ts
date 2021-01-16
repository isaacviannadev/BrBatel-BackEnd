import { getRepository } from 'typeorm';

import Item from '../models/item';

interface Request {
  item_id: string;
}

class DeleteItemService {
  public async execute({ item_id }: Request, res): Promise<Item> {
    const itemsRepository = getRepository(Item);

    const item = await itemsRepository.deleteOne(item_id);

    if (!item) {
      throw new Error('Item not found');
    }

    itemsRepository.delete(item);

    return res.json({ message: 'Item deleted' });
  }
}

export default DeleteItemService;
