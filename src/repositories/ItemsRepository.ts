import { EntityRepository, Repository } from 'typeorm';
import Item from '../models/item';

@EntityRepository(Item)
class ItemsRepository extends Repository<Item> {
  public async findByName(itemName: string): Promise<Item | null> {
    const findItem = await this.findOne({
      where: { itemName },
    });

    return findItem || null;
  }

  public async findById(id: string): Promise<Item | null> {
    const findItem = await this.findOne({ where: { id } });

    return findItem || null;
  }

  public async deleteOne(id: string): Promise<Item | null> {
    const findItem = await this.findOne({ where: { id } });

    return findItem || null;
  }
}

export default ItemsRepository;
