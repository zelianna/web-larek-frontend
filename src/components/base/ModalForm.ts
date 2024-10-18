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
        this.modalElement.classList.add('page_wrapper_locked');
        this.container.style.display = 'flex';
        const bodyContainer = this.container.querySelector('.modal__content');
        // Очищаем элемент перед отображением
        bodyContainer.innerHTML = '';
        bodyContainer.append(this.modalElement);
    }

    // Закрытие модального окна
    closeModal(): void {
        this.container.style.display = 'none';
        this.modalElement.classList.remove('modal_active');
        this.modalElement.classList.remove('page_wrapper_locked');
    }

    abstract render(): void 
}
