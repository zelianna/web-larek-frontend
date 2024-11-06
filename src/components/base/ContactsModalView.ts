import { Component } from './Component';
 
export class ContactsModalView extends Component {
	private emailInput: HTMLInputElement | null = null;
	private phoneInput: HTMLButtonElement | null = null;
	private submitButton: HTMLButtonElement | null = null;
	public onContactsChanged: (email: string, phone: string) => void = () => {};
	public onContactsCompleted: () => void;

	constructor(container: HTMLElement) {
		super(container);
		this.submitButton = this.container.querySelector('.button') as HTMLButtonElement;
		this.emailInput = this.container.querySelector('input[name="email"]') as HTMLInputElement;
		this.phoneInput = this.container.querySelector('input[name="phone"]') as HTMLInputElement;

		this.emailInput.addEventListener('input', () => this.triggerChanged());
		this.phoneInput.addEventListener('input', () => this.triggerChanged());
		this.submitButton.addEventListener('click', (event) => {
			event.preventDefault();
			event.stopPropagation();
			this.onContactsCompleted();
		});
	}

	render(): HTMLElement {
		this.triggerChanged()
		return this.container;
	}

	private triggerChanged() {
		const phone = this.phoneInput.value.trim();
		const email = this.emailInput.value.trim();
		this.onContactsChanged(email, phone);
	}

	set error(message: string | null) {
		const errorElement = this.container.querySelector('.form__errors');
		if (!message) {
			errorElement.innerHTML = '';
			this.submitButton?.removeAttribute('disabled');
			return;
		}
		this.submitButton?.setAttribute('disabled', 'true');
		errorElement.innerHTML = message;
	}

}
