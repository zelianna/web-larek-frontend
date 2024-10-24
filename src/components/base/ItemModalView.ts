import { ModalForm } from "./ModalForm";
import { CDN_URL } from '../../utils/constants';
import { IItem } from "../../types";
import { EventEmitter } from './events';

export class ItemModalView extends ModalForm {
    private item: IItem | null = null;
    private eventEmitter: EventEmitter;

    constructor(container: HTMLElement, modalElement: HTMLElement,  eventEmitter: EventEmitter) {
        super(container, modalElement);
        this.eventEmitter = eventEmitter;  // Инициализация eventEmitter
    }

    renderItem(item: IItem): void {
        this.item = item;
        this.render();  // Открываем модальное окно
    }

    render(): void {
        if (!this.item) return;  // Если нет товара, ничего не делаем
        const titleElement = this.modalElement.querySelector('.card__title') as HTMLElement;
        const priceElement = this.modalElement.querySelector('.card__price') as HTMLElement;
        const descriptionElement = this.modalElement.querySelector('.card__text') as HTMLElement;
        const imageElement = this.modalElement.querySelector('.card__image') as HTMLImageElement;
        // Заполнение данными товара
        titleElement.textContent = this.item.title;
        priceElement.textContent = this.item.price !== null ? `${this.item.price} синапсов` : 'Бесценно';
        descriptionElement.textContent = this.item.description;
        imageElement.src = CDN_URL + this.item.image;
        const addButton = this.modalElement.querySelector('.card__button') as HTMLElement;
        addButton.addEventListener('click', () => {
          this.eventEmitter.emit('basket:itemAdded', { item: this.item });

        });

        this.openModal();  // Открытие модального окна
    }

    // Обработчик для кнопки добавления товара в корзину
    /* onAddToBasketClick(callback: (item: IItem) => void): void {
        const addButton = this.modalElement.querySelector('.modal__button') as HTMLElement;
        addButton.addEventListener('click', () => {
            if (this.item) {
                callback(this.item);
            }
        });
    } */

}
