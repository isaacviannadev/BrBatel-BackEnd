import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import Item from '../models/item';

interface Request {
  item_id: string;
  imageFilename: string;
}

class UpdateItemImageService {
  public async execute({ item_id, imageFilename }: Request): Promise<Item> {
    const itemsRepository = getRepository(Item);

    const item = await itemsRepository.findOne(item_id);

    if (!item) {
      throw new Error('Item not found');
    }

    if (item.image) {
      const itemImageFilePath = path.join(uploadConfig.directory, item.image);
      const itemImageFileExists = await fs.promises.stat(itemImageFilePath);

      if (itemImageFileExists) {
        await fs.promises.unlink(itemImageFilePath);
      }
    }

    item.image = imageFilename;

    await itemsRepository.save(item);

    return item;
  }
}

export default UpdateItemImageService;
