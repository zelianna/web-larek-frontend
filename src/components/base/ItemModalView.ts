import { ModalForm } from './ModalForm';
import { CDN_URL } from '../../utils/constants';
import { IItem } from '../../types';
import { EventEmitter } from './events';
import { Basket } from './Basket';

export class ItemModalView extends ModalForm {
	private item: IItem | null = null;
	private eventEmitter: EventEmitter;
	private isItemInBasket: boolean = false;
	private basket: Basket;

	constructor(
		container: HTMLElement,
		modalElement: HTMLElement,
		eventEmitter: EventEmitter,
		basket: Basket
	) {
		super(container, modalElement);
		this.eventEmitter = eventEmitter;
		this.basket = basket;
	}

	renderItem(item: IItem): void {
		this.item = item;
		this.isItemInBasket = this.basket.items.some(
			(basketItem) => basketItem.id === item.id
		);
		this.render();
	}

	render(): void {
		if (!this.item) return;
		const titleElement = this.modalElement.querySelector(
			'.card__title'
		) as HTMLElement;
		const priceElement = this.modalElement.querySelector(
			'.card__price'
		) as HTMLElement;
		const descriptionElement = this.modalElement.querySelector(
			'.card__text'
		) as HTMLElement;
		const imageElement = this.modalElement.querySelector(
			'.card__image'
		) as HTMLImageElement;
		const addButton = this.modalElement.querySelector(
			'.card__button'
		) as HTMLButtonElement;
		// Заполнение данными товара
		titleElement.textContent = this.item.title;
		priceElement.textContent =
			this.item.price !== null ? `${this.item.price} синапсов` : 'Бесценно';
		descriptionElement.textContent = this.item.description;
		imageElement.src = CDN_URL + this.item.image;

		addButton.disabled = this.isItemInBasket; // Делаем кнопку неактивной, если товар уже в корзине

		addButton.addEventListener('click', () => {
			if (this.item && !this.isItemInBasket) {
				this.eventEmitter.emit('basket:itemAdded', { item: this.item });
				this.isItemInBasket = true;
				addButton.disabled = true;
			}
		});

		this.openModal();
	}

	// Обработчик для кнопки добавления товара в корзину
	/* onAddToBasketClick(callback: (item: IItem) => void): void {
        const addButton = this.modalElement.querySelector('.modal__button') as HTMLElement;
        addButton.addEventListener('click', () => {
            if (this.item) {
                callback(this.item);
            }
        });
    } */
}
