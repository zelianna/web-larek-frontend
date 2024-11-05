import { Component } from './Component';

export class SuccessOrderModalView extends Component {
  private descriptionElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this.descriptionElement = this.container.querySelector('.order-success__description') as HTMLElement;
  }
  
  updateTotal(total: number): void {
    this.descriptionElement.textContent = `Списано ${total} синапсов`;
  }
}