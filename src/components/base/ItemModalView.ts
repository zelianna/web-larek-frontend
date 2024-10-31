import { CDN_URL } from '../../utils/constants';
import { IItem } from '../../types';
import { EventEmitter } from './events';
import { Basket } from './Basket';
import { Component } from './Component';

export class ItemModalView extends Component {
	private eventEmitter: EventEmitter;
	private isItemInBasket: boolean = false;
	private basket: Basket;
	private modalElement: HTMLElement;

	private titleElement: HTMLElement;
	private priceElement: HTMLElement;
	private descriptionElement: HTMLElement;
	private imageElement: HTMLImageElement;
	private addButton: HTMLButtonElement;

	constructor(
		modalElement: HTMLElement,
		item: IItem,
		eventEmitter: EventEmitter,
		basket: Basket
	) {
		super(modalElement);
		this.modalElement = modalElement;
		this.eventEmitter = eventEmitter;
		this.basket = basket;
		this.titleElement = this.modalElement.querySelector(
			'.card__title'
		) as HTMLElement;
		this.priceElement = this.modalElement.querySelector(
			'.card__price'
		) as HTMLElement;
		this.descriptionElement = this.modalElement.querySelector(
			'.card__text'
		) as HTMLElement;
		this.imageElement = this.modalElement.querySelector(
			'.card__image'
		) as HTMLImageElement;
		this.addButton = this.modalElement.querySelector(
			'.card__button'
		) as HTMLButtonElement;
		this.item = item;
	}

	set item(item: IItem) {
		this.titleElement.textContent = item.title;
		this.priceElement.textContent =
			item.price !== null ? `${item.price} синапсов` : 'Бесценно';
		this.descriptionElement.textContent = item.description;
		this.imageElement.src = CDN_URL + item.image;
		/* this.isItemInBasket = this.basket.items.some(
			(basketItem) => basketItem.id === item.id
		); 
		this.addButton.disabled = this.isItemInBasket; // Делаем кнопку неактивной, если товар уже в корзине
		
		this.addButton.addEventListener('click', () => {
			if (this.item && !this.isItemInBasket) {
				this.eventEmitter.emit('basket:itemAdded', { item: this.item });
				this.isItemInBasket = true;
				this.addButton.disabled = true;
			}
		});*/
	}

	render(): HTMLElement {
        super.render();
		return this.modalElement;
	}
}
