
import { IItem } from '../../types/index';
import { EventEmitter } from './events';

export class Basket {
  items: IItem[] = [];
  total: number = 0;
  paymentMethod: string = '';
  shippingAddress: string = '';
  buyerId: string = '';
  statusOrder: string = 'pending'; // статус заказа, по умолчанию "pending"
  private eventEmitter: EventEmitter;

  constructor(eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter;
    this.eventEmitter.on('basket:itemAdded', (e: {item: IItem}) =>  this.addItem(e.item));
    this.eventEmitter.on('basket:itemRemoved', (e: {item: IItem}) =>  this.removeItem(e.item));
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

  getTotalPrice(): number {
    return this.total;
  }

  updateTotal(): void {
    this.total = 0;
    this.total = this.items.reduce((sum, item) => sum + item.price, 0);
  }

  submitOrder(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.items.length === 0) {
          reject('Корзина пуста, заказ не может быть отправлен.');
        } else {
          this.statusOrder = 'submitted';
          this.eventEmitter.emit('basket:orderSubmitted', { statusOrder: this.statusOrder });
          resolve('Заказ успешно отправлен!');
        }
      }, 1000); // эмуляция отправки на сервер с задержкой
    });
  }
}
