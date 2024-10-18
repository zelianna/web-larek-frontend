
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
    //this.basket.addItem(item);
  }

  addItem(item: IItem): void {
    this.items.push(item);
    this.updateTotal();
  }

  removeItem(itemId: string): void {
    this.items = this.items.filter(item => item.id !== itemId);
    this.updateTotal();
  }

  getTotalPrice(): number {
    return this.total;
  }

  updateTotal(): void {
    this.total = this.items.reduce((sum, item) => sum + item.price, 0);
    this.eventEmitter.emit('basket:changed');
  }

  clearBasket(): void {
    this.items = [];
    this.updateTotal();
    this.eventEmitter.emit('basket:cleared'); // Генерируем событие при очистке корзины
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
