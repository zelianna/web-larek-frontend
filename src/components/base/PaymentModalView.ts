import { ModalForm } from './ModalForm';
import { Basket } from './Basket'; 
import { EventEmitter } from './events';
import { cloneTemplate } from '../../utils/utils';

export class PaymentModalView extends ModalForm {
  private eventEmitter: EventEmitter;
  private basket: Basket;
  private selectedPaymentMethod: string | null = null;
  private addressInput: HTMLInputElement | null = null;
  private submitButton: HTMLButtonElement | null = null;


  constructor(container: HTMLElement, orderElement: HTMLElement, basket: Basket, eventEmitter: EventEmitter) {
    super(container, orderElement);
    this.basket = basket;
    this.eventEmitter = eventEmitter;
  }
  
  render(): void {
    this.openModal();
    const paymentButtons = this.container.querySelectorAll('.order__buttons button');
    this.addressInput = this.container.querySelector('input[name="address"]') as HTMLInputElement;
    this.submitButton = this.container.querySelector('.order__button') as HTMLButtonElement;

    // Добавляем обработчики событий
    paymentButtons.forEach((button) => {
      button.addEventListener('click', (event) => this.onPaymentMethodSelect(event));
    });
    this.addressInput.addEventListener('input', () => this.validateForm());

    // Начальная валидация (кнопка будет отключена)
    this.validateForm();
    this.submitButton.addEventListener('click', this.onPaymentSubmit.bind(this));
  }
    // Метод для обработки выбора способа оплаты
  private onPaymentMethodSelect(event: Event): void {
    const button = event.target as HTMLButtonElement;
    /* button.classList.remove('.button_alt');
    button.classList.add('.button_alt-active'); */
    this.selectedPaymentMethod = button.name; 
    this.validateForm();
  }

  private validateForm(): void {
    const isAddressValid = this.addressInput?.value.trim().length > 0; // Адрес не пустой
    const isPaymentMethodSelected = this.selectedPaymentMethod !== null; // Выбран способ оплаты

    if (isAddressValid && isPaymentMethodSelected) {
      this.submitButton?.removeAttribute('disabled'); 
    } else {
      this.submitButton?.setAttribute('disabled', 'true'); 
    }
  }

  onPaymentSubmit(event: Event): void {
    event.preventDefault();
    const shippingAddress = this.addressInput?.value.trim();
    const paymentMethod = this.selectedPaymentMethod;
    if (!paymentMethod || !shippingAddress) {
      this.showError('Необходимо заполнить все поля');
      return;
    }
    this.closeModal();
    this.eventEmitter.emit('payment:completed', { paymentMethod, shippingAddress  }); 
  } 

  showError(message: string): void {
    this.container.innerHTML = `<div class="error">${message}</div>`;
  }





/* 
      form.addEventListener('submit', (event: Event) => {
        event.preventDefault();
        this.eventEmitter.emit('basket:placed', { data: this.basket });
        const paymentMethod = (form.querySelector('#payment-method') as HTMLSelectElement).value;
        const shippingAddress = (form.querySelector('input[name="address"]') as HTMLInputElement).value; 
        //this.onPaymentSubmit({ /*paymentMethod, shippingAddress });
      }); */

 
  

}
  

