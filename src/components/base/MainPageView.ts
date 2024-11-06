import { IItem } from '../../types/index';

export class MainPageView {
	private galleryElement: HTMLElement;
	private basketCounterElement: HTMLElement;

	constructor(
		galleryElement: HTMLElement
	) {
		this.galleryElement = galleryElement;
		this.basketCounterElement = document.querySelector(
			'.header__basket-counter'
		) as HTMLElement;
	}

	set counter(counter: number){
		this.basketCounterElement.textContent = counter.toString();
	}

	set itemsViews(views: HTMLElement[]) {
		this.galleryElement.innerHTML = '';
		views.forEach((view) => {
			this.galleryElement.appendChild(view);
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
