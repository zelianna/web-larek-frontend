import { ModalForm } from './ModalForm';
import { Basket } from './Basket'; 
import { EventEmitter } from './events';
import { cloneTemplate } from '../../utils/utils';

export class ContactsModalView extends ModalForm {
  private eventEmitter: EventEmitter;
  private basket: Basket;

  constructor(container: HTMLElement, contactsElement: HTMLElement, basket: Basket, eventEmitter: EventEmitter) {
    super(container, contactsElement);
    this.basket = basket;
    this.eventEmitter = eventEmitter;
  }
  
  render(): void {
    console.log('>>>>>>>>>: ', 'openContacts');
    this.openModal();
    /* const paymentButtons = this.container.querySelectorAll('.order__buttons button');
    console.log('>>>>>>', this.container)
    this.addressInput = this.container.querySelector('input[name="address"]') as HTMLInputElement;
    this.submitButton = this.container.querySelector('.order__button') as HTMLButtonElement;

    // Добавляем обработчики событий
    paymentButtons.forEach((button) => {
      button.addEventListener('click', (event) => this.onPaymentMethodSelect(event));
    });
    this.addressInput.addEventListener('input', () => this.validateForm());

    // Начальная валидация (кнопка будет отключена)
    this.validateForm(); */
  }
}
  

