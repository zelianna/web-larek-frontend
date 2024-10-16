import './scss/styles.scss';
import { MainPageView } from './components/base/MainPageView';
import { fetchItems } from './components/base/itemsService';


// Загрузка товаров на главной странице
document.addEventListener('DOMContentLoaded', async () => {
    const galleryElement = document.querySelector('.gallery') as HTMLElement;
    if (galleryElement) {
        const mainPageView = new MainPageView(galleryElement);
        const items = await fetchItems();
        console.log(items);
        mainPageView.renderItems(items);  // Отображаем товары на главной странице
    }
}); 
