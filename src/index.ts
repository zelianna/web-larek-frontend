import './scss/styles.scss';
import { MainPageView } from './components/base/MainPageView';
import { fetchItems } from './components/base/itemsService';
import { ItemModalView } from './components/base/ItemModalView'; 
import { EventEmitter } from './components/base/events';
import { Basket } from './components/base/Basket';
import { BasketModalView } from './components/base/BasketModalView';
import { PaymentModalView } from './components/base/PaymentModalView';
import { ContactsModalView } from './components/base/ContactsModalView';
import { SuccessOrderModalView } from './components/base/SuccessOrderModalView';
import { IItem } from './types';
import { cloneTemplate } from './utils/utils';

const eventEmitter = new EventEmitter();
const basket = new Basket(eventEmitter);

// Загрузка товаров на главной странице
document.addEventListener('DOMContentLoaded', async () => {
    const galleryElement = document.querySelector('.gallery') as HTMLElement;
    const basketElement = document.querySelector('.basket') as HTMLElement;
    const orderTemplate = cloneTemplate('#order');
    const contactsTemplate = cloneTemplate('#contacts');
    const successTemplate = cloneTemplate('#success');
    const container = document.getElementById('modal-container') as HTMLElement;
    const basketModalView = new BasketModalView(container, basketElement, basket, eventEmitter);
    const paymentModalView = new PaymentModalView(container, orderTemplate, basket, eventEmitter);  
    const contactsModalView = new ContactsModalView(container, contactsTemplate, basket, eventEmitter);  
    const successOrderModalView = new SuccessOrderModalView(container, successTemplate, basket, eventEmitter);
    // Рендер товаров на главной странице
    if (galleryElement) {
        const mainPageView = new MainPageView(galleryElement, eventEmitter, basket);
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
    });
    eventEmitter.on('payment:completed', () => {
        contactsModalView.render();
    });
    eventEmitter.on('contacts:completed', () => {
        successOrderModalView.render();
    });
    // Обновление счётчика при изменении корзины
    eventEmitter.on('basket:changed', () => {
        const basketCounterElement = document.querySelector('.header__basket-counter') as HTMLElement;
        basketCounterElement.textContent = basket.items.length.toString();
    });


}); 

eventEmitter.on('card-preview:open', (event: { data: IItem }) => {
    const modalElement = cloneTemplate('#card-preview');
    const container = document.getElementById('modal-container');
    const newItemModalView = new ItemModalView(
        container,
        modalElement, 
        eventEmitter,
        basket
    );
    newItemModalView.renderItem(event.data);
})
