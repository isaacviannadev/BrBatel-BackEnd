import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import multer from 'multer';
import uploadConfig from '../config/upload';

import ItemController from '../controllers/ItemController';

import ItemsRepository from '../repositories/ItemsRepository';
import RegisterItemService from '../services/RegisterItemService';
import UpdateItemImageService from '../services/UpdateItemImageService';

import ensureAuth from '../middlewares/ensureAuth';

const registerRouter = Router();
registerRouter.use(ensureAuth);

const itemController = new ItemController();

const upload = multer(uploadConfig);

registerRouter.get('/', async (req, res) => {
  const itemsRepository = getCustomRepository(ItemsRepository);
  const items = await itemsRepository.find();

  return res.json(items);
});

registerRouter.post('/register', async (req, res) => {
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
