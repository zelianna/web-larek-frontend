import { Component } from "./Component";

export class ModalView {
    protected container: HTMLElement;
    protected isRendered: boolean;

    constructor(container: HTMLElement) {
        this.container = container;
        const closeButton = this.container.querySelector('.modal__close') as HTMLElement;
        closeButton.addEventListener('click', () => {
            this.closeModal();
        });
        this.container.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target === this.container) {
                this.closeModal();
            }
        });
        this.isRendered = false;
    }

    closeModal(): void {
        this.container.style.display = 'none';
        this.isRendered = false;
    }

    render(view: Component): void {
        this.container.style.display = 'flex';
        const bodyContainer = this.container.querySelector('.modal__content');
        bodyContainer.innerHTML = "";
        bodyContainer.classList.add('modal_active');
        //bodyContainer.classList.add('page__wrapper_locked');
        bodyContainer.appendChild(view.render({}));
        this.isRendered = true;
    }
}
