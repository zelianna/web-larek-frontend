import './scss/styles.scss';
import { MainPageView } from './components/base/MainPageView';
import { fetchItems } from './components/base/itemsService';
import { ItemModalView } from './components/base/ItemModalView'; 
import { EventEmitter } from './components/base/events';
import { Basket } from './components/base/Basket';
import { BasketModalView } from './components/base/BasketModalView';
import { IItem } from './types';
import { cloneTemplate } from './utils/utils';

const eventEmitter = new EventEmitter();
const basket = new Basket(eventEmitter);

// Загрузка товаров на главной странице
document.addEventListener('DOMContentLoaded', async () => {
    const galleryElement = document.querySelector('.gallery') as HTMLElement;
    const modalElement = document.querySelector('.basket') as HTMLElement;
    const container = document.getElementById('modal-container');
    const basketModalView = new BasketModalView(container, modalElement, basket, eventEmitter);

    // Рендер товаров на главной странице
    if (galleryElement) {
        const mainPageView = new MainPageView(galleryElement, eventEmitter);
        const items = await fetchItems();
        //console.log(items);
        mainPageView.renderItems(items);
    }

    // Открытие корзины
    const basketIcon = document.querySelector('#basket-icon') as HTMLElement;
    basketIcon.addEventListener('click', () => {
        basketModalView.render();
    });

}); 

eventEmitter.on('card-preview:open', (event: { data: IItem }) => {
    const modalElement = cloneTemplate('#card-preview');
    const container = document.getElementById('modal-container');
    const newItemModalView = new ItemModalView(
        container,
        modalElement, 
        eventEmitter
    );
    newItemModalView.renderItem(event.data);
})
