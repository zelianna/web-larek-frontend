import { Component } from './Component';

export class PaymentModalView extends Component {
	private payment: string | null;
	private addressInput: HTMLInputElement | null = null;
	private submitButton: HTMLButtonElement | null = null;
	private paymentButtons: NodeListOf<HTMLButtonElement> | null = null;
	public onPaymentChanged: (shipping: string, payment: string) => void = () => {};
	public onPaymentSubmit: () => void;

	constructor(container: HTMLElement) {
		super(container);
		
		this.paymentButtons = this.container.querySelectorAll('.order__buttons button');
		this.addressInput = this.container.querySelector('input[name="address"]') as HTMLInputElement;
		this.submitButton = this.container.querySelector('.order__button') as HTMLButtonElement;

		this.paymentButtons.forEach((button) => {
			button.addEventListener('click', (event) => this.onPaymentMethodSelect(event));
		});
		this.addressInput.addEventListener('input', () => {
			const address = this.addressInput?.value;
			this.onPaymentChanged(this.payment, address);
		});
		this.submitButton.addEventListener('click', () => this.onPaymentSubmit());
	}

	render(): HTMLElement {
		return this.container;
	}
	private onPaymentMethodSelect(event: Event): void {
		const button = event.target as HTMLButtonElement;

		this.paymentButtons.forEach((btn) => {
			btn.classList.remove('button_alt-active');
		});

		button.classList.add('button_alt-active');
		this.payment = button.name;
		const address = this.addressInput?.value;
		this.onPaymentChanged(this.payment, address);
	}

	set error(message: string) {
		const errorElement = this.container.querySelector('.form__errors');
		if (message) {
			errorElement.innerHTML = `<div class="error">${message}</div>`;
			this.submitButton?.setAttribute('disabled', 'true');
			return;
		}
		errorElement.innerHTML = "";
		this.submitButton?.removeAttribute('disabled');
	}
}