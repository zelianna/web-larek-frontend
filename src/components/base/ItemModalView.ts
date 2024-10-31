import { CDN_URL } from '../../utils/constants';
import { IItem } from '../../types';
import { EventEmitter } from './events';
import { Component } from './Component';

export class ItemModalView extends Component {
	private eventEmitter: EventEmitter;
	private isItemInBasket: boolean = false;

	private titleElement: HTMLElement;
	private priceElement: HTMLElement;
	private descriptionElement: HTMLElement;
	private imageElement: HTMLImageElement;
	private addButton: HTMLButtonElement;

	constructor(
		container: HTMLElement,
		item: IItem,
		eventEmitter: EventEmitter,
	) {
		super(container);
		this.eventEmitter = eventEmitter;
		this.titleElement = container.querySelector(
			'.card__title'
		) as HTMLElement;
		this.priceElement = container.querySelector(
			'.card__price'
		) as HTMLElement;
		this.descriptionElement = container.querySelector(
			'.card__text'
		) as HTMLElement;
		this.imageElement = container.querySelector(
			'.card__image'
		) as HTMLImageElement;
		this.addButton = container.querySelector(
			'.card__button'
		) as HTMLButtonElement;
		this.item = item;
		this.addButton.addEventListener('click', () => {
			this.eventEmitter.emit('basket:itemAdded', { item });
			this.isItemInBasket = true;
			this.addButton.disabled = true;
		});
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
		*/
	}


	render(): HTMLElement {
        super.render();
		return this.container;
	}
}
