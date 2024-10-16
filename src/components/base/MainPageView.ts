import { IItem } from '../../types/index';  
import { CDN_URL } from '../../utils/constants';

export class MainPageView {
    private galleryElement: HTMLElement;

    constructor(galleryElement: HTMLElement) {
        this.galleryElement = galleryElement;
    }

    // Метод для отображения товаров
    renderItems(items: IItem[]): void {
        // Очищаем элемент перед отображением
        this.galleryElement.innerHTML = '';

        // Получаем шаблон карточки товара
        const template = document.getElementById('card-catalog') as HTMLTemplateElement;

        // Для каждого товара создаём карточку
        items.forEach(item => {
            const clone = document.importNode(template.content, true);
            const card = clone.querySelector('.gallery__item') as HTMLElement;
            const cardTitle = card.querySelector('.card__title') as HTMLElement;
            const cardPrice = card.querySelector('.card__price') as HTMLElement;
            const cardCategory = card.querySelector('.card__category') as HTMLElement;
            const cardImage = card.querySelector('.card__image') as HTMLImageElement;

            // Устанавливаем данные в карточку
            cardTitle.textContent = item.title;
            //cardPrice.textContent = `${item.price} синапсов`;
            cardPrice.textContent = item.price !== null ? `${item.price} синапсов` : 'Бесценно';
            cardCategory.textContent = item.category;
            cardImage.src = CDN_URL+item.image;

            // Добавляем обработчик для кнопки "В корзину"
            /* const addButton = card.querySelector('.button') as HTMLElement;
            addButton.addEventListener('click', () => this.onAddToBasketClick(item));
 */
            // Добавляем карточку в галерею
            this.galleryElement.appendChild(clone);
        });
    }

    // Метод для обработки добавления товара в корзину
    onAddToBasketClick(item: IItem): void {
        console.log('Товар добавлен в корзину:', item.title);
        // Здесь можно будет вызвать метод для добавления в корзину
    }

    // Метод для отображения ошибок
    showError(message: string): void {
        this.galleryElement.innerHTML = `<div class="error">${message}</div>`;
    }
}
