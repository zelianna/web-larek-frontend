import './scss/styles.scss';
import { MainPageView } from './components/base/MainPageView';
import { fetchItems } from './components/base/itemsService';
import { ItemModalView } from './components/base/ItemModalView'; 
import { EventEmitter } from './components/base/events';
import { Basket } from './components/base/Basket';
import { BasketModalView } from './components/base/BasketModalView';
import { PaymentModalView } from './components/base/PaymentModalView';
import { IItem } from './types';
import { cloneTemplate } from './utils/utils';

const eventEmitter = new EventEmitter();
const basket = new Basket(eventEmitter);

// Загрузка товаров на главной странице
document.addEventListener('DOMContentLoaded', async () => {
    const galleryElement = document.querySelector('.gallery') as HTMLElement;
    const basketElement = document.querySelector('.basket') as HTMLElement;
    const orderTemplate = cloneTemplate('#order');
    const container = document.getElementById('modal-container') as HTMLElement;
    const basketModalView = new BasketModalView(container, basketElement, basket, eventEmitter);
    const paymentModalView = new PaymentModalView(container, orderTemplate, basket, eventEmitter);  
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
    eventEmitter.on('basket:completed', () => {
        paymentModalView.render();
    })

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
