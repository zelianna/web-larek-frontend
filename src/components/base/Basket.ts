
import { IItem, IOrderData } from '../../types/index';
import { EventEmitter } from './events';
import { submit } from '../../index';

export class Basket {
  items: IItem[] = [];
  total: number = 0;
  orderData: any;
  buyerId: string = '';
  statusOrder: string = 'pending'; 
  private eventEmitter: EventEmitter;

  constructor(eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter;
    this.eventEmitter.on('basket:itemAdded', (e: {item: IItem}) =>  this.addItem(e.item));
    this.eventEmitter.on('basket:itemRemoved', (e: {item: IItem}) =>  this.removeItem(e.item));
    this.eventEmitter.on('contacts:completed', (e: {email: string, phone: string}) => {
      this.populateOrderData(e);
      this.save();
    });
    this.eventEmitter.on('payment:completed', (e: {payment: string, address: string}) => this.populateOrderData(e));
  }

  populateOrderData(data: IOrderData) {
    this.orderData = {...this.orderData, ...data};
  }

  addItem(item: IItem): void {
    this.items.push(item);
    this.updateTotal();
    this.eventEmitter.emit('basket:changed'); 
  }

  removeItem(item: IItem): void {
    const itemId = item.id;
    this.items = this.items.filter(item => item.id !== itemId);
    this.updateTotal();
    this.eventEmitter.emit('basket:changed');
  }

  clear(): void {
    this.items = [];
    this.total = 0;
  }

  getTotalPrice(): number {
    return this.total;
  }

  updateTotal(): void {
    this.total = 0;
    this.total = this.items.reduce((sum, item) => sum + item.price, 0);
  }

  async save(): Promise<void> {
    const items = this.items.filter(i => i.price > 0).map(i => i.id);
    try {
      const total = await submit({
        ...this.orderData,
        ...{items, total: this.total}
      });
      this.eventEmitter.emit('basket:saved', {total});
      this.clear(); 
    this.eventEmitter.emit('basket:changed');
    } catch(e) {
      console.log('>>>> OH MY GOD!', e);
    }
  }
}
