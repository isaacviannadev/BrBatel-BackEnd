import Item from '../models/item';

interface Total {
  totalItems: number;
  grossProfit: number;
}

class TotalsService {
  public async execute(items: Item[]): Promise<Total> {
    const totalItems = items.reduce(
      (total, item) => total + item.amountCurrent,
      0,
    );

    const totalRevenue = items.reduce(
      (total, item) => total + Number(item.priceSell) * item.amountCurrent,
      0,
    );

    const totalCost = items.reduce(
      (total, item) => total + item.amountCurrent * Number(item.priceCost),
      0,
    );

    const gross = Number((totalRevenue - totalCost).toFixed(2));

    return {
      totalItems,
      grossProfit: gross,
    };
  }
}

export default TotalsService;
