import { Component } from './Component';
import { EventEmitter } from './events';

export class SuccessOrderModalView extends Component {
  private eventEmitter: EventEmitter;

  constructor(container: HTMLElement, eventEmitter: EventEmitter) {
    super(container);
    this.eventEmitter = eventEmitter;
  }
  
  updateTotal(total: number): void {
    const descriptionElement = this.container.querySelector('.order-success__description') as HTMLElement;
    descriptionElement.textContent = `Списано ${total} синапсов`;
  }
}