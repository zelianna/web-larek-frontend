import { IItem } from '../../types/index';
import { CDN_URL } from '../../utils/constants';

export class ItemCardView {
	public onItemClicked: (item: IItem) => void;
	private cardTitle: HTMLElement;
	private cardPrice: HTMLElement;
	private cardCategory: HTMLElement;
	private cardImage: HTMLImageElement;

    constructor(protected readonly container: HTMLElement) {
		this.cardTitle = container.querySelector('.card__title') as HTMLElement;
		this.cardPrice = container.querySelector('.card__price') as HTMLElement;
		this.cardCategory = container.querySelector('.card__category') as HTMLElement;
		this.cardImage = container.querySelector('.card__image') as HTMLImageElement;
    }

	set item(item: IItem){
		this.container.addEventListener('click', () => this.onItemClicked(item));
		this.title = item.title;
		this.price = item.price;
		this.category = item.category;
		this.image = item.image;
	}

	set title(value: string) {
		this.cardTitle.textContent = value;
	}
	set price(value: number) {
		this.cardPrice.textContent = value !== null ? `${value} синапсов` : 'Бесценно';
	}
	set category(value: string) {
		this.cardCategory.textContent = value;
		let cl = '';
		switch (value) {
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
		this.cardCategory.classList.add(cl);
	}
	set image(value: string) {
		this.cardImage.src = CDN_URL + value;
	}

	render(): HTMLElement {
        return this.container;
    }
}
