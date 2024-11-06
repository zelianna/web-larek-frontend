import { Component } from './Component';

export class BasketItemView extends Component {
    private removeButton: HTMLElement;
    private itemIndex: HTMLElement;
    private itemTitle: HTMLElement;
    private itemPrice: HTMLElement;
	public onRemove: (itemId: string) => void;

	constructor(
		container: HTMLElement
	) {
		super(container);

		this.removeButton = this.container.querySelector(
			'.basket__item-delete') as HTMLElement;
        this.removeButton.addEventListener('click', (event: Event) => {
            const target = event.target as HTMLElement;
            const itemId = target.dataset.id!;
            this.onRemove(itemId);
        });
		
        this.itemIndex = this.container.querySelector(
			'.basket__item-index'
		) as HTMLElement;
		this.itemTitle = this.container.querySelector('.card__title') as HTMLElement;
		this.itemPrice = this.container.querySelector('.card__price') as HTMLElement;
	}

    set id(value: string) {
        this.removeButton.dataset.id = value;
    }
    set index(value: number) {
        this.itemIndex.textContent = (value + 1).toString();
    }
    set title(value: string) {
        this.itemTitle.textContent = value;
    }
    set price(value: number) {
        this.itemPrice.textContent = `${value ?? 0} синапсов`;
    }

	render(): HTMLElement {
		super.render();
		return this.container;
	}
}
