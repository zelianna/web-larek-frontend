import './scss/styles.scss';
import { MainPageView } from './components/base/MainPageView';
import { fetchItems } from './components/base/itemsService';

//import { IItem } from '../types/index';
// Инициализация представления для главной страницы
document.addEventListener('DOMContentLoaded', async () => {
    const galleryElement = document.querySelector('.gallery') as HTMLElement;  // Основной элемент для рендеринга товаров
    if (galleryElement) {
        const mainPageView = new MainPageView(galleryElement);
        const items = await fetchItems();
        mainPageView.renderItems(items);  // Отображаем товары
    }
}); 
