
import { IItem, IOrderData } from '../../types/index';

export class Basket {
  items: IItem[] = [];
  total: number = 0;
  orderData: any;
  buyerId: string = '';
  statusOrder: string = 'pending';
  public onChange: any;
  public onSave: any;

  constructor() {
  }

  populateOrderData(data: IOrderData) {
    this.orderData = {...this.orderData, ...data};
  }

  addItem(item: IItem): void {
    this.items.push(item);
    this.updateTotal();
    this.onChange();
  }

  removeItem(item: IItem): void {
    const itemId = item.id;
    this.items = this.items.filter(item => item.id !== itemId);
    this.updateTotal();
    this.onChange();
  }

  clear(): void {
    this.items = [];
    this.updateTotal();
    this.onChange();
  }

  getTotalPrice(): number {
    return this.total;
  }

  updateTotal(): void {
    this.total = 0;
    this.total = this.items.reduce((sum, item) => sum + item.price, 0);
  }

  requestSave(): void {
    const items = this.items.filter(i => i.price > 0).map(i => i.id);
    const saveData = {
      ...this.orderData,
      items,
      total: this.total,
    };
    this.onSave(saveData);
  }

}
