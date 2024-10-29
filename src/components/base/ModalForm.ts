export abstract class ModalForm {
    protected modalElement: HTMLElement;
    protected container: HTMLElement;
    protected isRendered: boolean;

    constructor(container: HTMLElement, modalElement: HTMLElement) {
        this.container = container;
        this.modalElement = modalElement;
        // Закрытие модального окна
        const closeButton = this.container.querySelector('.modal__close') as HTMLElement;
        closeButton.addEventListener('click', () => {
            this.closeModal();
        });
        // Закрытие по клику на оверлей
        this.container.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target === this.container) {
                this.closeModal();
            }
        });

        this.isRendered = false;
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
        this.isRendered = true;
    }

    // Закрытие модального окна
    closeModal(): void {
        this.container.style.display = 'none';
        this.modalElement.classList.remove('modal_active');
        this.modalElement.classList.remove('page_wrapper_locked');
        this.isRendered = false;
    }

    abstract render(): void 
}
