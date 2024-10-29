import { ModalForm } from './ModalForm';
import { Basket } from './Basket';
import { EventEmitter } from './events';

export class ContactsModalView extends ModalForm {
	private eventEmitter: EventEmitter;
	private basket: Basket;
	private emailInput: HTMLInputElement | null = null;
	private phoneInput: HTMLButtonElement | null = null;
	private submitButton: HTMLButtonElement | null = null;

	constructor(
		container: HTMLElement,
		contactsElement: HTMLElement,
		basket: Basket,
		eventEmitter: EventEmitter
	) {
		super(container, contactsElement);
		this.basket = basket;
		this.eventEmitter = eventEmitter;
	}

	render(): void {
		this.openModal();

		this.submitButton = this.container.querySelector('.button');
		this.emailInput = this.container.querySelector(
			'input[name="email"]'
		) as HTMLInputElement;
		this.phoneInput = this.container.querySelector(
			'input[name="phone"]'
		) as HTMLInputElement;
		this.emailInput.addEventListener('input', () => this.validateForm());
		this.phoneInput.addEventListener('input', () => this.validateForm());

		// Начальная валидация (кнопка будет отключена)
		this.validateForm();
		this.submitButton.addEventListener(
			'click',
			this.onSubmitContactForm.bind(this)
		);
	}

	private validateForm(): void {
		const isEmailValid = this.emailInput?.value.trim().length > 0;
		const isPhoneValid = this.phoneInput?.value.trim().length > 0;

		if (isEmailValid && isPhoneValid) {
			this.submitButton?.removeAttribute('disabled');
		} else {
			this.submitButton?.setAttribute('disabled', 'true');
		}
	}

	async onSubmitContactForm(event: Event): Promise<void> {
		event.preventDefault();
		event.stopPropagation();
		const email = this.emailInput?.value.trim();
		const phone = this.phoneInput?.value.trim();
		if (!email || !phone) {
			this.showError('Необходимо заполнить все поля');
			return;
		}
		//this.closeModal();
		//this.eventEmitter.emit('contacts:completed', { email, phone });
		try {
			const responseMessage = await this.basket.submitOrder(); // Асинхронный вызов
			console.log('Order submitted:', responseMessage);
			this.basket.clear(); // Очищаем корзину
			this.eventEmitter.emit('basket:changed'); // Обновляем счётчик корзины
			this.closeModal();
			this.eventEmitter.emit('contacts:completed'); // Переход к SuccessModalView
		} catch (error) {
			this.showError(`Ошибка отправки заказа: ${error}`);
		}
	}
	showError(message: string): void {
		this.container.innerHTML = `<div class="error">${message}</div>`;
	}
}
