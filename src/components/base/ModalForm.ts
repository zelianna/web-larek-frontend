export abstract class ModalForm {
    protected modalElement: HTMLElement;

    constructor(modalElement: HTMLElement) {
        this.modalElement = modalElement;
    }

    // Открытие модального окна
    openModal(): void {
        //this.modalElement.style.display = 'block';
        this.modalElement.classList.add('modal_active');
    }

    // Закрытие модального окна
    closeModal(): void {
        this.modalElement.style.display = 'none';
        //this.modalElement.classList.remove('modal_active');
    }

    abstract render(): void 
}
