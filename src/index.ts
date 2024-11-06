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
const eventEmitter = new EventEmitter();
const basket = new Basket();
const container = document.getElementById('modal-container') as HTMLElement;
const modalView = new ModalView(container);
const galleryElement = document.querySelector('.gallery') as HTMLElement;
const basketIcon = document.querySelector('#basket-icon') as HTMLElement;
const basketCounterElement = document.querySelector(
	'.header__basket-counter'
) as HTMLElement;


export async function fetchItems(): Promise<IItem[]> {
	try {
		const response = await api.get('/product/');
		return (response as ApiListResponse<IItem>).items; // Приведение ответа к типу ApiListResponse<IItem>
	} catch (error) {
		console.error('Ошибка при получении товаров:', error);
	}
}

export async function submit(data: any): Promise<string> {
	try {
		const response = await api.post('/order/', data);
		return (response as any).total;
	} catch (error) {
		console.error('Ошибка при сохранении заказа:', error);
	}
}

// Инициализация страницы
const mainPageView = new MainPageView(galleryElement);

fetchItems().then((items) => {
	if (galleryElement) {
		mainPageView.items = items;
	}
});

// Обработчики событий
eventEmitter.on('basket:changed', () => {
	basketCounterElement.textContent = basket.items.length.toString();
});

mainPageView.onItemClicked = (item: IItem) => {
	const cardElement = cloneTemplate('#card-preview');
	const itemContent = new ItemModalView(cardElement, item);
    itemContent.onItemAdded = (item) => basket.addItem(item);
    itemContent.isInBasket = basket.items.some(i => i.id === item.id)
	modalView.render(itemContent);
};

basketIcon.addEventListener('click', () => {
	const basketElement = cloneTemplate('#basket');
	const basketContent = new BasketModalView(
		basketElement
	);
	modalView.render(basketContent);
    basketContent.items = basket.items;
    basketContent.basketCounter = basket.total;
    basketContent.onOrderSubmit = () =>
		eventEmitter.emit('basket:completed');
    basketContent.onRemoveItem = (itemId) => {
        const item = basket.items.find((i) => i.id === itemId);
        basket.removeItem(item);		
        eventEmitter.emit('basket:changed');
        basketContent.basketCounter = basket.total;
        basketContent.items = basket.items;
        basketContent.render();
    }
});

eventEmitter.on('basket:completed', () => {
	const paymentElement = cloneTemplate('#order');
	const paymentContent = new PaymentModalView(paymentElement);
	modalView.render(paymentContent);
    paymentContent.onPaymentChanged = (address, payment) => {
        basket.populateOrderData({ address, payment });
        if (!basket.isFirstStepValid) {
            paymentContent.error = 'Необходимо заполнить все поля';
			return;
        }
        paymentContent.error = null;
    }
    paymentContent.onPaymentSubmit = () => {
        const contactsElement = cloneTemplate('#contacts');
        const contactsContent = new ContactsModalView(contactsElement);
        modalView.render(contactsContent);
        contactsContent.onContactsChanged = (email: string, phone: string) => {
            basket.populateOrderData({ email, phone });
            if (!basket.isValid) {
                contactsContent.error = 'Необходимо заполнить все поля';
                return;
            }
            contactsContent.error = null;
        };
        contactsContent.onContactsCompleted = () => {
            basket.requestSave();
            
        };
    };
});



eventEmitter.on('basket:itemAdded', (e: {item: IItem}) =>  basket.addItem(e.item));
eventEmitter.on('basket:itemRemoved', (e: {item: IItem}) =>  basket.removeItem(e.item));

eventEmitter.on('payment:completed', (e: {payment: string, address: string}) =>
    basket.populateOrderData(e)
);

basket.onChange = () => eventEmitter.emit('basket:changed');
basket.onSave = async (saveData: any) => {
    try {
		const total = await submit(saveData);

        basket.clear();
		eventEmitter.emit('basket:changed');
        const successElement = cloneTemplate('#success');
        const successContent = new SuccessOrderModalView(
            successElement
        );
        successContent.total = total;
        modalView.render(successContent);
	} catch (error) {
		console.error('Ошибка при сохранении корзины:', error);
	}
}

/* 
//const page = galleryElement.querySelector('.page__wrapper') as HTMLDivElement;
const page = document.querySelector('.page__wrapper') as HTMLElement;

// Блокируем прокрутку страницы если открыта модалка
eventEmitter.on('modal:open', () => {
	page.locked = true;
});

// ... и разблокируем
eventEmitter.on('modal:close', () => {
	page.locked = false;
});  */