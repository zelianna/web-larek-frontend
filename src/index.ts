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
const basket = new Basket(eventEmitter);
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
		throw error;
	}
}

export async function submit(data: any): Promise<string> {
	try {
		const response = await api.post('/order/', data);
		console.log('>>>', response);
		return (response as any).total;
	} catch (error) {
		console.error('Ошибка при сохранении заказа:', error);
		throw error;
	}
}

// Инициализация страницы
const mainPageView = new MainPageView(galleryElement, eventEmitter, basket);

fetchItems().then((items) => {
	if (galleryElement) {
		mainPageView.renderItems(items);
	}
});

// Обработчики событий
eventEmitter.on('basket:changed', () => {
	basketCounterElement.textContent = basket.items.length.toString();
});

eventEmitter.on('card-preview:open', (event: { data: IItem }) => {
	const cardElement = cloneTemplate('#card-preview');
	const itemContent = new ItemModalView(cardElement, event.data, eventEmitter);
	modalView.render(itemContent);
});

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
	const paymentContent = new PaymentModalView(paymentElement, eventEmitter);
	modalView.render(paymentContent);
});

eventEmitter.on('payment:completed', () => {
	const contactsElement = cloneTemplate('#contacts');
	const contactsContent = new ContactsModalView(contactsElement, eventEmitter);
	modalView.render(contactsContent);
});

eventEmitter.on('contacts:completed', () => {
	const successElement = cloneTemplate('#success');
	const successContent = new SuccessOrderModalView(
		successElement,
		eventEmitter
	);
	modalView.render(successContent);
});

eventEmitter.on('basket:saveRequest', async (data: any) => {
	try {
		const total = await submit(data);
		eventEmitter.emit('basket:saved', { total });
		basket.clear();
		eventEmitter.emit('basket:changed');
	} catch (error) {
		console.error('Ошибка при сохранении корзины:', error);
	}
});
