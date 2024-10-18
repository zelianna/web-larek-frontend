
import { IItem, IBasket } from '../../types/index';
import { Basket } from './Basket'; 
import { ModalForm } from './ModalForm'; 
import { EventEmitter } from './events';

export class BasketModalView extends ModalForm {
    private basket: Basket;
    private eventEmitter: EventEmitter;
  
    constructor(container: HTMLElement, modalElement: HTMLElement, basket: Basket, eventEmitter: EventEmitter) {
      super(container, modalElement);
      this.basket = basket;
      this.eventEmitter = eventEmitter;
  
      // Подписываемся на события корзины
      //this.eventEmitter.on('basket:changed', () => this.render());
      this.eventEmitter.on('basket:itemRemoved', () => this.render());
      this.eventEmitter.on('basket:totalUpdated', () => this.updateBasketCounter());
      this.eventEmitter.on('basket:cleared', () => this.render());
    }
  
    render(): void {
      this.openModal();
      const basketItemsContainer = this.modalElement.querySelector('.basket__list');
      basketItemsContainer.innerHTML = '';
  
      if (this.basket.items.length === 0) {
        basketItemsContainer.innerHTML = '<p>Корзина пуста</p>';
        return;
      }
  
      this.basket.items.forEach(item => {
        const itemElement = this.renderBasketItem(item);
        basketItemsContainer.appendChild(itemElement);
      });
  
      const totalElement = this.modalElement.querySelector('.basket__price')!;
      totalElement.textContent = `Итого: ${this.basket.getTotalPrice().toFixed(2)} ₽`;
  
      //this.updateBasketCounter();
      this.addRemoveItemListeners();
    }
  
    updateBasketCounter(): void {
      const basketCounter = document.querySelector('.basket-counter')!;
      basketCounter.textContent = `${this.basket.items.length}`;
    }
  
    private renderBasketItem(item: IItem): HTMLElement {
      const itemElement = this.modalElement.cloneNode(true) as HTMLElement;
  
      const itemImage = itemElement.querySelector('.item-image') as HTMLImageElement;
      const itemTitle = itemElement.querySelector('.item-title') as HTMLElement;
      const itemPrice = itemElement.querySelector('.item-price') as HTMLElement;
      const removeButton = itemElement.querySelector('.remove-item') as HTMLElement;
  /* 
      itemImage.src = item.image;
      itemTitle.textContent = item.title;
      itemPrice.textContent = `${item.price} ₽`;
      removeButton.dataset.id = item.id; */
  
      return itemElement;
    }
  
    private addRemoveItemListeners(): void {
      const removeButtons = this.modalElement.querySelectorAll('.remove-item');
      removeButtons.forEach(button => {
        button.addEventListener('click', (event: Event) => {
          const target = event.target as HTMLElement;
          const itemId = target.dataset.id!;
          this.removeItem(itemId);
        });
      });
    }
  
    private removeItem(itemId: string): void {
      this.basket.removeItem(itemId);
    }
  }
  