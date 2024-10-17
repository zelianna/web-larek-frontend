import './scss/styles.scss';
import { MainPageView } from './components/base/MainPageView';
import { fetchItems } from './components/base/itemsService';
import { ItemModalView } from './components/base/ItemModalView'; 
import { EventEmitter } from './components/base/events';
import { IItem } from './types';
import { cloneTemplate } from './utils/utils';

const eventEmitter = new EventEmitter();


// Загрузка товаров на главной странице
document.addEventListener('DOMContentLoaded', async () => {
    const galleryElement = document.querySelector('.gallery') as HTMLElement;
    if (galleryElement) {
        const mainPageView = new MainPageView(galleryElement, eventEmitter);
        const items = await fetchItems();
        console.log(items);
        mainPageView.renderItems(items);
    }
}); 


eventEmitter.on('card-preview:select', (event: { data: IItem }) => {
    const modalElement = cloneTemplate('#card-preview');
    const newItemModalView = new ItemModalView(
        modalElement,
        eventEmitter
    );
    const container = document.getElementById('modal-content');
    console.log('>>>>>', container.parentElement);
    console.log('>>>>>', container.parentElement.parentElement);
    container.parentElement.parentElement.style.display = 'flex';
    container.append(modalElement);
    newItemModalView.renderItem(event.data);
})
