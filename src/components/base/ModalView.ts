import { Component } from "./Component";

export class ModalView {
    protected container: HTMLElement;
    protected isRendered: boolean;
    protected wrapper: HTMLElement;
    protected bodyContainer: HTMLElement;

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
        this.wrapper = document.querySelector('.page__wrapper');
        this.bodyContainer = this.container.querySelector('.modal__content');
    }

    closeModal(): void {
        this.container.style.display = 'none';
        this.isRendered = false;
        this.wrapper.classList.remove('page__wrapper_locked');
    }

    render(view: Component): void {
        this.container.style.display = 'flex';
        this.bodyContainer.innerHTML = "";
        this.bodyContainer.classList.add('modal_active');
        this.wrapper.classList.add('page__wrapper_locked');
        this.bodyContainer.appendChild(view.render({}));
        this.isRendered = true;
    }
}
