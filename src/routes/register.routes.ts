import { Router } from 'express';

import ItemsRepository from '../repositories/ItemsRepository';
import RegisterItemService from '../services/RegisterItemService';

const registerRouter = Router();
const itemsRepository = new ItemsRepository();

registerRouter.get('/', (req, res) => {
  const items = itemsRepository.all();

  return res.json(items);
});

registerRouter.post('/', (req, res) => {
  try {
    const {
      itemName,
      amountCurrent,
      amountMinimum,
      priceCost,
      priceSell,
    } = req.body;

    const registerItem = new RegisterItemService(itemsRepository);

    const item = registerItem.execute({
      itemName,
      amountCurrent,
      amountMinimum,
      priceCost,
      priceSell,
    });

    return res.json(item);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default registerRouter;
