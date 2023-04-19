import _ from "lodash";

export interface IItemCart {
  id: number;
  title: string;
  qty: number;
  price: number;
  img: string;
}

export interface ICartData {
  userId: number | null;
  totalItems: number;
  subTotal: number;
  grandTotal: number;
  items: IItemCart[];
}

export interface IOderData {
  orderId?: number;
  userId: number | null;
  totalItems: number;
  subTotal: number;
  grandTotal: number;
  paymentMethod: string;
  paymentStatus: string;
}

interface IGlobalStorage {
  getCartData(): ICartData | null;
  removeItemFromCart(item: IItemCart, token?: string | null): void;
  removeCartData(): void;
  setCartData(data: ICartData): void;
  saveOrder(data: IOderData): void;
  getOrderData(): IOderData;
}

class globalStorageClass implements IGlobalStorage {
  private getLocalStorage(name: string) {
    return localStorage.getItem(name);
  }

  private setLocalStorage(name: string, val: string | object) {
    if (typeof val !== "string") {
      val = JSON.stringify(val);
    }

    return localStorage.setItem(name, val);
  }

  private removeLocalStorage(name: string) {
    return localStorage.removeItem(name);
  }

  public getCartData() {
    const data = this.getLocalStorage("mfcart");
    return data ? JSON.parse(data) : null;
  }

  public setCartData(data: ICartData) {
    this.setLocalStorage("mfcart", data);
  }

  public saveOrder(data: IOderData) {
    this.setLocalStorage("mforder", data);
  }

  public getOrderData() {
    const data = this.getLocalStorage("mforder");
    return data ? JSON.parse(data) : null;
  }

  public removeCartData() {
    this.removeLocalStorage("mfcart");
  }

  public removeItemFromCart(item: IItemCart, token: string | null = null) {
    const data = this.getCartData();
    const userId = null;
    if (!data || !data.items.length) {
      return;
    }

    const findIndex = _.findIndex(
      data.items,
      (o: IItemCart) => o.id === item.id
    );
    if (findIndex !== -1) {
      const newData = _.filter(data.items, (o) => o.id !== item.id);
      if (newData.length > 0) {
        data.items = newData;
        data.totalItems -= 1;
        data.subTotal -= item.price * item.qty;
        data.grandTotal = data.subTotal;
        this.setLocalStorage("mfcart", data);
      } else {
        this.removeLocalStorage("mfcart");
      }
    }
  }
}

const globalStorage: IGlobalStorage = new globalStorageClass();
export default globalStorage;
