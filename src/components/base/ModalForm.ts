export abstract class ModalForm {
    protected modalElement: HTMLElement;
    protected container: HTMLElement;

    constructor(container: HTMLElement, modalElement: HTMLElement) {
        this.container = container;
        this.modalElement = modalElement;
        // Закрытие модального окна
        const closeButton = this.container.querySelector('.modal__close') as HTMLElement;
        closeButton.addEventListener('click', () => {
            this.closeModal();
        });
    }

    // Открытие модального окна
    openModal(): void {
        this.modalElement.classList.add('modal_active');
        this.container.style.display = 'flex';
        const bodyContainer = this.container.querySelector('.modal__content');
        bodyContainer.append(this.modalElement);
    }

    // Закрытие модального окна
    closeModal(): void {
        this.container.style.display = 'none';
        this.modalElement.classList.remove('modal_active');
    }

    abstract render(): void 
}
