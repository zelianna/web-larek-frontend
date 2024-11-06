import { Component } from './Component';

export class BasketModalView extends Component {
	private submitButton: HTMLElement;
	private totalElement: HTMLElement;
	private basketItemsContainer: HTMLElement;
	public onRemoveItem: (itemId: string) => void;
	public onOrderSubmit: () => void;

	constructor(
		container: HTMLElement
	) {
		super(container);

		this.basketItemsContainer = this.container.querySelector(
			'.basket__list'
		) as HTMLElement;
		this.totalElement = this.container.querySelector(
			'.basket__price'
		) as HTMLElement;
		this.submitButton = this.container.querySelector(
			'.button'
		) as HTMLButtonElement;
	}

	set basketCounter(value: number) {
		this.totalElement.textContent = `${value} синапсов`;
	}

	set hasPurchasableItems(value: boolean) {
		if (value) {
			this.submitButton.removeAttribute('disabled');
		} else {
			this.submitButton.setAttribute('disabled', 'disabled');
		}
	}

	set itemsViews(views: HTMLElement[]) {
		this.basketItemsContainer.innerHTML = '';
		if (views.length === 0) {
			this.basketItemsContainer.innerHTML =
				'<p>В корзине нет добавленных товаров.</p>';
			return;
		}
		views.forEach((view) => {
			this.basketItemsContainer.appendChild(view);
		});
		this.submitButton.addEventListener('click', () => {
			this.onOrderSubmit();
		});
	}

	render(): HTMLElement {
		super.render();
		return this.container;
	}
}
