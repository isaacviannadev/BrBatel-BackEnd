import { Request, Response } from 'express';

import UpdateItemService from '../services/UpdateItemService';
import ShowItemService from '../services/ShowItemService';
import DeleteItemService from '../services/DeleteItemService';

export default class ItemController {
  public async show(req: Request, res: Response): Promise<Response> {
    const item_id = req.params.id;

    const showItem = new ShowItemService();

    const item = await showItem.execute({ item_id });

    return res.json(item);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const {
        id,
        itemName,
        amountCurrent,
        amountMinimum,
        priceCost,
        priceSell,
      } = req.body;

      const updateItem = new UpdateItemService();

      const item = await updateItem.execute({
        id,
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
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const item_id = req.params.id;

    const deleteItem = new DeleteItemService();

    const item = await deleteItem.execute(item_id, id);

    itemsRepository.delete(item);

    return res.json(item);
  }
}
