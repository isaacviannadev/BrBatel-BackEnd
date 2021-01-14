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
  private itemsRepository: ItemsRepository;

  constructor(itemsRepository: ItemsRepository) {
    this.itemsRepository = itemsRepository;
  }

  public execute({
    itemName,
    amountCurrent,
    amountMinimum,
    priceCost,
    priceSell,
  }: Request): Item {
    const findItemOnDB = this.itemsRepository.findByName(itemName);

    if (findItemOnDB) {
      throw Error('This item is already exists');
    }

    const item = this.itemsRepository.create({
      itemName,
      amountCurrent,
      amountMinimum,
      priceCost,
      priceSell,
    });

    return item;
  }
}

export default RegisterItemService;
