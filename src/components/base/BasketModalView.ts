import { Component } from './Component';
import { IItem } from '../../types';
import { cloneTemplate } from '../../utils/utils';

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

	set items(items: IItem[]) {
		const hasPurchasableItems = items.some(
			(item) => item.price && item.price > 0
		);

		if (hasPurchasableItems) {
			this.submitButton.removeAttribute('disabled');
		} else {
			this.submitButton.setAttribute('disabled', 'disabled');
		}

		this.basketItemsContainer.innerHTML = '';
		if (items.length === 0) {
			this.basketItemsContainer.innerHTML =
				'<p>В корзине нет добавленных товаров.</p>';
			return;
		}
		items.forEach((item, index) => {
			const itemElement = this.renderBasketItem(item, index);
			this.basketItemsContainer.appendChild(itemElement);
		}); 
		this.addRemoveItemListeners();
		this.submitButton.addEventListener('click', () => {
			this.onOrderSubmit();
		});
	}

	render(): HTMLElement {
		super.render();
		return this.container;
	}

	private renderBasketItem(item: IItem, index: number) : HTMLElement  {
		const itemElement = cloneTemplate('#card-basket');
		const itemIndex = itemElement.querySelector(
			'.basket__item-index'
		) as HTMLElement;
		const itemTitle = itemElement.querySelector('.card__title') as HTMLElement;
		const itemPrice = itemElement.querySelector('.card__price') as HTMLElement;
		const removeButton = itemElement.querySelector(
			'.basket__item-delete'
		) as HTMLElement;

		itemIndex.textContent = (index + 1).toString();
		itemTitle.textContent = item.title;
		itemPrice.textContent = `${item.price ?? 0} синапсов`;
		removeButton.dataset.id = item.id;

		return itemElement; 
	}

	private addRemoveItemListeners(): void {
		const removeButtons = this.container.querySelectorAll(
			'.basket__item-delete'
		);
		removeButtons.forEach((button) => {
			button.addEventListener('click', (event: Event) => {
				const target = event.target as HTMLElement;
				const itemId = target.dataset.id!;
				this.onRemoveItem(itemId);
			});
		});
	}
}
