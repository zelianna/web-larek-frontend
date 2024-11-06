import { IItem } from '../../types/index';
import { CDN_URL } from '../../utils/constants';

export class MainPageView {
	private galleryElement: HTMLElement;
	private basketCounterElement: HTMLElement;
	public onItemClicked: (item: IItem) => void;

	constructor(
		galleryElement: HTMLElement
	) {
		this.galleryElement = galleryElement;

		// Cчётчик корзины
		this.basketCounterElement = document.querySelector(
			'.header__basket-counter'
		) as HTMLElement;
	}

	set counter(counter: number){
		this.basketCounterElement.textContent = counter.toString();
	}

	set items(items: IItem[]) {
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
			this.galleryElement.appendChild(clone);
			card.addEventListener('click', () => this.onItemClicked(item));
		});
	}

	/* set locked(value: boolean) {
        if (value) {
            this.galleryElement.classList.add('page__wrapper_locked');
        } else {
            this.galleryElement.classList.remove('page__wrapper_locked');
        }
    } */

	showError(message: string): void {
		this.galleryElement.innerHTML = `<div class="error">${message}</div>`;
	}
}
