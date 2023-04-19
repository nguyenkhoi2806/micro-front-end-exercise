import jwt_decode from 'jwt-decode';
import Cookies, { CookieGetOptions, CookieSetOptions } from 'universal-cookie';

export interface IItemCart {
  id: number;
  title: string;
  qty: number;
  price: number;
}

export interface ICartData {
  userId: number | null;
  totalItems: number;
  subTotal: number;
  grandTotal: number;
  items: IItemCart[]
}

interface IGlobalStorage {
  getToken(): any | null;
}

class globalStorageClass {
  private cookies;

  constructor() {
    this.cookies = new Cookies();
  }

  private getCookie(name: string, opt?: CookieGetOptions) {
    return this.cookies.get(name, opt);
  }

  public getAllCookies(opt?: CookieGetOptions) {
    return this.cookies.getAll(opt);
  }

  private setCookie(name: string, val: string | object, opt?: CookieSetOptions) {
    if (typeof val !== 'string') {
      val = JSON.stringify(val);
    }
    return this.cookies.set(name, val, opt);
  }

  private removeCookie(name: string, opt?: CookieSetOptions) {
    return this.cookies.remove(name, opt);
  }

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

  public getToken() {
    const token = this.getLocalStorage(`logto:${process.env.LOGTO_KEY}:idToken`);
    return token ? jwt_decode(token) : null;
  }
}

const globalStorage: IGlobalStorage = new globalStorageClass();
export default globalStorage;
