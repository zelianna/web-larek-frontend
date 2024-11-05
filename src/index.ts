import './scss/styles.scss';
import { MainPageView } from './components/base/MainPageView';
import { ItemModalView } from './components/base/ItemModalView'; 
import { BasketModalView } from './components/base/BasketModalView';
import { EventEmitter } from './components/base/events';
import { Basket } from './components/base/Basket';
import { PaymentModalView } from './components/base/PaymentModalView';
import { ContactsModalView } from './components/base/ContactsModalView';
import { SuccessOrderModalView } from './components/base/SuccessOrderModalView';
import { IItem } from './types';
import { cloneTemplate } from './utils/utils';
import { ModalView } from './components/base/ModalView';
import { Api, ApiListResponse } from './components/base/api';
import { API_URL } from './utils/constants'; 

const api = new Api(API_URL);

export async function fetchItems(): Promise<IItem[]> {
    try {
        const response = await api.get('/product/');
        return (response as ApiListResponse<IItem>).items; // Приведение ответа к типу ApiListResponse<IItem>
    } catch (error) {
        console.error('Ошибка при получении товаров:', error);
        throw error; 
    }
}


export async function submit(data: any): Promise<string> {
    try {
        const response = await api.post('/order/', data);
        console.log('>>>', response)
        return (response as any).total;
    } catch (error) {
        console.error('Ошибка при сохранении заказа:', error);
        throw error; 
    }
}


const eventEmitter = new EventEmitter();
const basket = new Basket(eventEmitter);
let modalView: ModalView;

// Загрузка товаров на главной странице
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('modal-container') as HTMLElement;
    modalView = new ModalView(container);
    const galleryElement = document.querySelector('.gallery') as HTMLElement;
    
    
    /* 
    const contactsModalView = new ContactsModalView(container, contactsTemplate, eventEmitter);  
    const successOrderModalView = new SuccessOrderModalView(container, successTemplate, eventEmitter); 
    // Открытие корзины
    const basketIcon = document.querySelector('#basket-icon') as HTMLElement;
    
    eventEmitter.on('basket:completed', () => {
        paymentModalView.render();
    });
    eventEmitter.on('payment:completed', () => {
        contactsModalView.render();
    });
    eventEmitter.on('basket:saved', (event: { total: number }) => {
        successOrderModalView.render();
        successOrderModalView.updateTotal(event.total);
    });
    */
    // Рендер товаров на главной странице
    if (galleryElement) {
        const mainPageView = new MainPageView(galleryElement, eventEmitter, basket);
        const items = await fetchItems();
        //console.log(items);
        mainPageView.renderItems(items);
    }

    
    // Обновление счётчика при изменении корзины
    eventEmitter.on('basket:changed', () => {
        const basketCounterElement = document.querySelector('.header__basket-counter') as HTMLElement;
        basketCounterElement.textContent = basket.items.length.toString();
    });

    eventEmitter.on('card-preview:open', (event: { data: IItem }) => {
        const cardElement = cloneTemplate('#card-preview');
        const itemContent = new ItemModalView(
            cardElement,
            event.data,
            eventEmitter,
    
        );
        modalView.render(itemContent);
    });
    
    const basketIcon = document.querySelector('#basket-icon') as HTMLElement;
    basketIcon.addEventListener('click', () => {
        const basketElement = cloneTemplate('#basket');
        const basketContent = new BasketModalView(
            basketElement,
            basket,
            eventEmitter
        );
        modalView.render(basketContent);
    });

    eventEmitter.on('basket:completed', () => {
        const paymentElement = cloneTemplate('#order');
        const paymentContent = new PaymentModalView(
            paymentElement,
            eventEmitter
        );
        modalView.render(paymentContent);
    });

    eventEmitter.on('payment:completed', () => {
        const contactsElement = cloneTemplate('#contacts');
        const contactsContent = new ContactsModalView(
            contactsElement,
            eventEmitter
        );
        modalView.render(contactsContent);
    });

    eventEmitter.on('contacts:completed', () => {
        const successElement = cloneTemplate('#success');
        const successContent = new SuccessOrderModalView(
            successElement,
            eventEmitter
        );
        modalView.render(successContent);
    })
}); 


