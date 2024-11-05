export abstract class Component {

    constructor(protected readonly container: HTMLElement) {
    }

    toggleClass(element: HTMLElement, className: string, force?: boolean) {
        element.classList.toggle(className, force);
    }

    protected setText(element: HTMLElement, value: unknown) {
        if (element) {
            element.textContent = String(value);
        }
    }

    setDisabled(element: HTMLElement, state: boolean) {
        if (element) {
            if (state) element.setAttribute('disabled', 'disabled');
            else element.removeAttribute('disabled');
        }
    }

    protected setHidden() {/* 
        element.style.display = 'none';
        this.modalElement.classList.remove('modal_active');
        this.modalElement.classList.remove('page_wrapper_locked'); */
    }

    protected setVisible() {
        //element.style.removeProperty('display');
    }

    render(data?: any): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}