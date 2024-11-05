import { CDN_URL } from '../../utils/constants';
import { IItem } from '../../types';
import { Component } from './Component';

export class ItemModalView extends Component {

	private titleElement: HTMLElement;
	private priceElement: HTMLElement;
	private descriptionElement: HTMLElement;
	private imageElement: HTMLImageElement;
	private addButton: HTMLButtonElement;
	public onItemAdded: (item: IItem) => void;

	constructor(
		container: HTMLElement,
		item: IItem,
	) {
		super(container);
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
			this.onItemAdded(item);
			this.addButton.disabled = true;
		});
	}

	set item(item: IItem) {
		this.titleElement.textContent = item.title;
		this.priceElement.textContent =
			item.price !== null ? `${item.price} синапсов` : 'Бесценно';
		this.descriptionElement.textContent = item.description;
		this.imageElement.src = CDN_URL + item.image;
	}

	set isInBasket(value: boolean) {
		this.addButton.disabled = value;
	}


	render(): HTMLElement {
        super.render();
		return this.container;
	}
}
