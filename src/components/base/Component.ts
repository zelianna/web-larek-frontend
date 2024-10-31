export abstract class Component {
    protected constructor(protected readonly container: HTMLElement) {
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

    protected setHidden(element: HTMLElement) {/* 
        element.style.display = 'none';
        this.modalElement.classList.remove('modal_active');
        this.modalElement.classList.remove('page_wrapper_locked'); */
    }

    protected setVisible(element: HTMLElement) {
        element.style.removeProperty('display');
    }

    protected setImage(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            if (alt) {
                element.alt = alt;
            }
        }
    }

    render(data?: any): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}