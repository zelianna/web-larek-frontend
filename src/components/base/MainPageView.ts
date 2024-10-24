import { IItem } from '../../types/index';  
import { CDN_URL } from '../../utils/constants';
import { ItemModalView } from './ItemModalView';
import { EventEmitter } from '../../components/base/events';

export class MainPageView {
    private galleryElement: HTMLElement;
    private itemModalView: ItemModalView;
    private eventEmitter: EventEmitter;


    constructor(galleryElement: HTMLElement, eventEmitter: EventEmitter) {
        this.galleryElement = galleryElement;
        this.eventEmitter = eventEmitter;
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
            cardPrice.textContent = item.price !== null ? `${item.price} синапсов` : 'Бесценно';
            cardCategory.textContent = item.category;
            cardImage.src = CDN_URL+item.image;
            let cl = "";
            switch(item.category) {
                case "софт-скил":
                    cl = 'card__category_soft';
                    break;
                case "другое":
                    cl = 'card__category_other'; 
                    break;
                case "дополнительное":
                    cl = 'card__category_additional'; 
                    break;
                case "кнопка":
                    cl = 'card__category_button'; 
                    break;
                case "хард-скил":
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
