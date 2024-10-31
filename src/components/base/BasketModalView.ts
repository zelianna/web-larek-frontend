import { IItem } from '../../types/index';
import { Basket } from './Basket';
import { ModalView } from './ModalView';
import { EventEmitter } from './events';
import { cloneTemplate } from '../../utils/utils';
/* 
export class BasketModalView extends ModalView {
	private basket: Basket;
	private eventEmitter: EventEmitter;

	private submitButton: HTMLElement;
	private totalElement: HTMLElement;
	private basketItemsContainer: HTMLElement;

	constructor(
		container: HTMLElement,
		modalElement: HTMLElement,
		basket: Basket,
		eventEmitter: EventEmitter
	) {
		super(container, modalElement);
		this.basket = basket;
		this.eventEmitter = eventEmitter;
		this.eventEmitter.on('basket:changed', () => {
			if (this.isRendered) {
				this.render();
			}
		});
	}

	render(): void {
		this.openModal();
		this.basketItemsContainer = this.modalElement.querySelector(
			'.basket__list'
		) as HTMLElement;
		this.totalElement = this.modalElement.querySelector(
			'.basket__price'
		) as HTMLElement;
		this.submitButton = this.modalElement.querySelector(
			'.button'
		) as HTMLButtonElement;
		this.updateBasketItems();
		this.updateBasketCounter();
		this.toggleSubmitButton();
		this.addRemoveItemListeners();
		this.submitButton.addEventListener('click', this.onOrderSubmit.bind(this));
	}

	// Обработчик нажатия на кнопку Оформить
	private onOrderSubmit(): void {
		this.closeModal();
		this.eventEmitter.emit('basket:completed');
	}

	updateBasketCounter(): void {
		this.totalElement.textContent = `${this.basket.getTotalPrice()} синапсов`;
	}

	updateBasketItems(): void {
		this.basketItemsContainer.innerHTML = '';
		if (this.basket.items.length === 0) {
			this.basketItemsContainer.innerHTML =
				'<p>В корзине нет добавленных товаров.</p>';
			return;
		}
		this.basket.items.forEach((item, index) => {
			const itemElement = this.renderBasketItem(item, index);
			this.basketItemsContainer.appendChild(itemElement);
		});
	}

	private renderBasketItem(item: IItem, index: number): HTMLElement {
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
		const removeButtons = this.modalElement.querySelectorAll(
			'.basket__item-delete'
		);
		removeButtons.forEach((button) => {
			button.addEventListener('click', (event: Event) => {
				const target = event.target as HTMLElement;
				const itemId = target.dataset.id!;
				const item = this.basket.items.find((i) => i.id === itemId);
				this.removeItem(item);
			});
		});
	}

	private removeItem(item: IItem): void {
		this.basket.removeItem(item);
		this.eventEmitter.emit('basket:changed');
	}

	// Метод для включения/выключения кнопки Оформить
	private toggleSubmitButton(): void {
		// Если в корзине только бесценный товар - кнопка покупки неактивна
		// Пустая корзина - кнопка покупки неактивна
		const hasPurchasableItems = this.basket.items.some(
			(item) => item.price && item.price > 0
		);

		if (hasPurchasableItems) {
			this.submitButton.removeAttribute('disabled'); // Кнопка активна, если есть товары с ненулевой ценой
		} else {
			this.submitButton.setAttribute('disabled', 'disabled');
		}
	}
}
 */