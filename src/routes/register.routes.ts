import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ItemsRepository from '../repositories/ItemsRepository';
import RegisterItemService from '../services/RegisterItemService';

const registerRouter = Router();

registerRouter.get('/', async (req, res) => {
  const itemsRepository = getCustomRepository(ItemsRepository);
  const items = await itemsRepository.find();

  return res.json(items);
});

registerRouter.post('/', async (req, res) => {
  try {
    const {
      itemName,
      amountCurrent,
      amountMinimum,
      priceCost,
      priceSell,
    } = req.body;

    const registerItem = new RegisterItemService();

    const item = await registerItem.execute({
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
