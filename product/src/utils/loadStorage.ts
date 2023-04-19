import _ from 'lodash';

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
  items: IItemCart[]
}


interface IGlobalStorage {
  getCartData(): ICartData | null;
  addItemToCart(item: IItemCart): void;
}

class globalStorageClass {
  private getLocalStorage(name: string) {
    return localStorage.getItem(name);
  }

  private setLocalStorage(name: string, val: string | object) {
    if (typeof val !== 'string') {
      val = JSON.stringify(val);
    }

    return localStorage.setItem(name, val);
  }

  private removeLocalStorage(name: string) {
    return localStorage.removeItem(name);
  }

  public getCartData() {
    const data = this.getLocalStorage('mfcart');
    return data ? JSON.parse(data) : null;
  }
  public addItemToCart(item: IItemCart) {
    const currentData = this.getCartData();
    const userId = null;
    if (!currentData) {
      const defaultData: ICartData = {
        userId,
        totalItems: 1,
        subTotal: item.price,
        grandTotal: item.price,
        items: [item]
      }

      return this.setLocalStorage('mfcart', defaultData);
    }

    currentData.userId = userId;
    if (currentData.items.length > 0) {
      const findIndex = _.findIndex(currentData.items,(o: IItemCart) => o.id === item.id);
      if (findIndex !== -1) {
        const checkData = currentData.items[findIndex];
        checkData.qty += item.qty;
        checkData.price = item.price;
        currentData.items[findIndex] = checkData;
        currentData.subTotal += item.price;
        currentData.grandTotal = currentData.subTotal;

        return this.setLocalStorage('mfcart', currentData);
      }
    }

    currentData.totalItems += 1;
    currentData.subTotal += item.qty * item.price;
    currentData.grandTotal = currentData.subTotal;
    currentData.items = currentData.items.concat(item);

    return this.setLocalStorage('mfcart', currentData);
  }
}

const globalStorage: IGlobalStorage = new globalStorageClass();
export default globalStorage;
