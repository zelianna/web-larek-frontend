import { ModalForm } from './ModalForm';
import { Basket } from './Basket';
import { EventEmitter } from './events';
export class PaymentModalView extends ModalForm {
	private eventEmitter: EventEmitter;
	private basket: Basket;
	private selectedPaymentMethod: string | null = null;
	private addressInput: HTMLInputElement | null = null;
	private submitButton: HTMLButtonElement | null = null;
	private paymentButtons: NodeListOf<HTMLButtonElement> | null = null;

	constructor(
		container: HTMLElement,
		orderElement: HTMLElement,
		basket: Basket,
		eventEmitter: EventEmitter
	) {
		super(container, orderElement);
		this.basket = basket;
		this.eventEmitter = eventEmitter;
	}

	render(): void {
		this.openModal();
		this.paymentButtons = this.container.querySelectorAll(
			'.order__buttons button'
		);

		this.addressInput = this.container.querySelector(
			'input[name="address"]'
		) as HTMLInputElement;
		this.submitButton = this.container.querySelector(
			'.order__button'
		) as HTMLButtonElement;

		this.paymentButtons.forEach((button) => {
			button.addEventListener('click', (event) =>
				this.onPaymentMethodSelect(event)
			);
		});
		this.addressInput.addEventListener('input', () => this.validateForm());

		// Начальная валидация (кнопка будет отключена)
		this.validateForm();
		this.submitButton.addEventListener(
			'click',
			this.onPaymentSubmit.bind(this)
		);
	}
	private onPaymentMethodSelect(event: Event): void {
		const button = event.target as HTMLButtonElement;

		// Сначала убираем класс .button_alt-active у всех кнопок
		this.paymentButtons.forEach((btn) => {
			btn.classList.remove('button_alt-active');
		});

		// Добавляем класс .button_alt-active к выбранной кнопке
		button.classList.add('button_alt-active');

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
		this.eventEmitter.emit('payment:completed', {
			paymentMethod,
			shippingAddress,
		});
	}

	showError(message: string): void {
		this.container.innerHTML = `<div class="error">${message}</div>`;
	}
}
