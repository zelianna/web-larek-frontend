
import { IItem, IOrderData } from '../../types/index';

export class Basket {
  items: IItem[] = [];
  total: number = 0;
  orderData: IOrderData | null = null;  
  buyerId: string = '';
  statusOrder: string = 'pending';
  public isValid: boolean = false;
  public isFirstStepValid: boolean = false;
  public onChange: () => void;
  public onSave: (saveData: any) => void;

  constructor() {
  }

  populateOrderData(data: IOrderData) {
    this.orderData = {...this.orderData, ...data};
    const isAddressValid = this.orderData.address?.length > 0;
		const isPaymentMethodSelected = !!this.orderData.payment;
    const isEmailValid = this.orderData.email?.length > 0;
		const isPhoneValid = this.orderData.phone?.length > 0;

    this.isFirstStepValid = isAddressValid && isPaymentMethodSelected;
    this.isValid = isEmailValid && isPhoneValid && isAddressValid && isPaymentMethodSelected;
  }

  addItem(item: IItem): void {
    this.items.push(item);
    this.updateTotal();
    this.onChange();
  }

  removeItem(item: IItem): void {
    const itemId = item.id;
    this.items = this.items.filter(item => item.id !== itemId);
    this.updateTotal();
    this.onChange();
  }

  clear(): void {
    this.items = [];
    this.updateTotal();
    this.onChange();
  }

  getTotalPrice(): number {
    return this.total;
  }

  updateTotal(): void {
    this.total = 0;
    this.total = this.items.reduce((sum, item) => sum + item.price, 0);
  }

  requestSave(): void {
    if (!this.orderData) {
      console.error('Order data is incomplete');
      return;
    }

    const items = this.items.filter(i => i.price > 0).map(i => i.id);
    const saveData = {
      ...this.orderData,
      items,
      total: this.total,
    };
    this.onSave(saveData);
  }

}
