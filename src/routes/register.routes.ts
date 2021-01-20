import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import multer from 'multer';
import uploadConfig from '../config/upload';

import ItemController from '../controllers/ItemController';

import ItemsRepository from '../repositories/ItemsRepository';
import RegisterItemService from '../services/RegisterItemService';
import UpdateItemImageService from '../services/UpdateItemImageService';
import UpdateItemService from '../services/UpdateItemService';

import ensureAuth from '../middlewares/ensureAuth';
import AddAmountService from '../services/AddAmountService';
import TotalsService from '../services/TotalsService';

const registerRouter = Router();
registerRouter.use(ensureAuth);

const itemController = new ItemController();

const upload = multer(uploadConfig);

registerRouter.get('/', async (req, res) => {
  const itemsRepository = getCustomRepository(ItemsRepository);
  const items = await itemsRepository.find();

  return res.json(items);
});

registerRouter.post('/', async (req, res) => {
  console.log(req.headers);

  try {
    const {
      itemName,
      amountCurrent,
      amountMinimum,
      priceCost,
      priceSell,
      image,
    } = req.body;

    const registerItem = new RegisterItemService();

    const item = await registerItem.execute({
      itemName,
      amountCurrent,
      amountMinimum,
      priceCost,
      priceSell,
      image,
    });

    return res.json(item);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

registerRouter.patch('/item/:id', async (req, res) => {
  try {
    const { addAmount } = req.body;
    const { id } = req.params;

    const changeAmount = new AddAmountService();

    const newItem = await changeAmount.execute({
      id,
      addAmount,
    });

    return res.json(newItem);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

registerRouter.get('/balance', async (req, res) => {
  const itensRepository = getCustomRepository(ItemsRepository);
  const itens = await itensRepository.find();
  const getBalance = new TotalsService();
  const balance = await getBalance.execute(itens);

  return res.json({ balance });
});

registerRouter.patch('/image/:id', upload.single('image'), async (req, res) => {
  const itemId = req.params.id;

  const fileImage = req.file.filename;
  try {
    const updateItemImage = new UpdateItemImageService();

    const item = await updateItemImage.execute({
      item_id: itemId,
      imageFilename: fileImage,
    });

    return res.json(item);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

registerRouter.get('/:id', itemController.show);

registerRouter.put('/item/', itemController.update);
registerRouter.put('/item/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      itemName,
      amountCurrent,
      amountMinimum,
      priceCost,
      priceSell,
    } = req.body;
    const updateItem = new UpdateItemService();
    const newProduct = await updateItem.execute({
      id,
      itemName,
      amountCurrent,
      amountMinimum,
      priceCost,
      priceSell,
    });

    return res.json(newProduct);
  } catch (err) {
    // console.log('Erro', err.message);
    return res.status(400).json({ error: err.message });
  }
});

registerRouter.delete('/item/:id', async (req, res) => {
  const item_id = req.params.id;
  try {
    const itemsRepository = getCustomRepository(ItemsRepository);
    const item = await itemsRepository.delete(item_id);

    return res.json(item);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
});

export default registerRouter;
