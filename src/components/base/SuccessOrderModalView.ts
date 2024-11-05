import { Component } from './Component';
import { EventEmitter } from './events';

export class SuccessOrderModalView extends Component {
  private eventEmitter: EventEmitter;
  private descriptionElement: HTMLElement;

  constructor(container: HTMLElement, eventEmitter: EventEmitter) {
    super(container);
    this.eventEmitter = eventEmitter;
    this.descriptionElement = this.container.querySelector('.order-success__description') as HTMLElement;
  }
  
  updateTotal(total: number): void {
    this.descriptionElement.textContent = `Списано ${total} синапсов`;
  }
}