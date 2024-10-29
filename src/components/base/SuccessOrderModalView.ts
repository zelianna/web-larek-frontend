import { ModalForm } from './ModalForm';
import { Basket } from './Basket'; 
import { EventEmitter } from './events';

export class SuccessOrderModalView extends ModalForm {
  private eventEmitter: EventEmitter;
  private basket: Basket;

  constructor(container: HTMLElement, successElement: HTMLElement, basket: Basket, eventEmitter: EventEmitter) {
    super(container, successElement);
    this.basket = basket;
    this.eventEmitter = eventEmitter;
  }
  
  render(): void {
    this.openModal();

  }
}
  

