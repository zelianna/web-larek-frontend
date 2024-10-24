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
    console.log('>>>>>>', this.container)
    this.addressInput = this.container.querySelector('input[name="address"]') as HTMLInputElement;
    this.submitButton = this.container.querySelector('.order__button') as HTMLButtonElement;

    // Добавляем обработчики событий
    paymentButtons.forEach((button) => {
      button.addEventListener('click', (event) => this.onPaymentMethodSelect(event));
    });
    this.addressInput.addEventListener('input', () => this.validateForm());

    // Начальная валидация (кнопка будет отключена)
    this.validateForm();
  }
    // Метод для обработки выбора способа оплаты
  private onPaymentMethodSelect(event: Event): void {
    const button = event.target as HTMLButtonElement;
    this.selectedPaymentMethod = button.name; // Сохраняем выбранный способ оплаты
    this.validateForm(); // Проверяем условия для активации кнопки
  }

  // Метод для проверки условий и активации/деактивации кнопки
  private validateForm(): void {
    const isAddressValid = this.addressInput?.value.trim().length > 0; // Адрес не должен быть пустым
    const isPaymentMethodSelected = this.selectedPaymentMethod !== null; // Должен быть выбран способ оплаты

    if (isAddressValid && isPaymentMethodSelected) {
      this.submitButton?.removeAttribute('disabled'); // Активируем кнопку
    } else {
      this.submitButton?.setAttribute('disabled', 'true'); // Отключаем кнопку
    }
  }

  onPaymentSubmit(paymentDetails: { paymentMethod: string, shippingAddress: string }): void {
          const { paymentMethod, shippingAddress } = paymentDetails;

    // Простая валидация данных
    if (!paymentMethod || !shippingAddress) {
      this.showError('Необходимо заполнить все поля');
      return;
    } 

     // Эмитим событие подтверждения заказа
    this.eventEmitter.emit('payment:completed', { paymentMethod, shippingAddress }); 

    // Закрываем модальное окно после подтверждения
    this.closeModal();
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
  

