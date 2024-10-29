import { IItem } from '../../types/index';
import { CDN_URL } from '../../utils/constants';
import { ItemModalView } from './ItemModalView';
import { EventEmitter } from '../../components/base/events';
import { Basket } from './Basket';

export class MainPageView {
	private galleryElement: HTMLElement;
	private itemModalView: ItemModalView;
	private eventEmitter: EventEmitter;
	private basketCounterElement: HTMLElement;
	private basket: Basket;

	constructor(
		galleryElement: HTMLElement,
		eventEmitter: EventEmitter,
		basket: Basket
	) {
		this.galleryElement = galleryElement;
		this.eventEmitter = eventEmitter;
		this.basket = basket;

		// Cчётчик корзины
		this.basketCounterElement = document.querySelector(
			'.header__basket-counter'
		) as HTMLElement;
		this.eventEmitter.on('basket:changed', this.updateBasketCounter.bind(this));
	}

	updateBasketCounter(): void {
		const itemCount = this.getBasketItemCount();
		this.basketCounterElement.textContent = itemCount.toString();
	}

	private getBasketItemCount(): number {
		return this.basket?.items.length ?? 0;
	}

	renderItems(items: IItem[]): void {
		this.galleryElement.innerHTML = '';
		const template = document.getElementById(
			'card-catalog'
		) as HTMLTemplateElement;

		// Для каждого товара создаём карточку
		items.forEach((item) => {
			const clone = document.importNode(template.content, true);
			const card = clone.querySelector('.gallery__item') as HTMLElement;
			const cardTitle = card.querySelector('.card__title') as HTMLElement;
			const cardPrice = card.querySelector('.card__price') as HTMLElement;
			const cardCategory = card.querySelector('.card__category') as HTMLElement;
			const cardImage = card.querySelector('.card__image') as HTMLImageElement;

			cardTitle.textContent = item.title;
			cardPrice.textContent =
				item.price !== null ? `${item.price} синапсов` : 'Бесценно';
			cardCategory.textContent = item.category;
			cardImage.src = CDN_URL + item.image;
			let cl = '';
			switch (item.category) {
				case 'софт-скил':
					cl = 'card__category_soft';
					break;
				case 'другое':
					cl = 'card__category_other';
					break;
				case 'дополнительное':
					cl = 'card__category_additional';
					break;
				case 'кнопка':
					cl = 'card__category_button';
					break;
				case 'хард-скил':
					cl = 'card__category_hard';
					break;
				default:
					cl = 'card__category_other';
			}
			cardCategory.classList.add(cl);

			// Открытие модального окна при клике на карточку товара
			card.addEventListener('click', () => {
				this.eventEmitter.emit('card-preview:open', { data: item });
			});
			// Добавляем карточку в галерею
			this.galleryElement.appendChild(clone);
		});
	}

	showError(message: string): void {
		this.galleryElement.innerHTML = `<div class="error">${message}</div>`;
	}
}
