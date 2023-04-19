class chatStorageClass {
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

  public getChatData() {
    const data = this.getLocalStorage('mfchat');
    return data ? JSON.parse(data) : null;
  }

  public addMessage(msg:any) {
    this.setLocalStorage('mfchat', msg)
  }
}

const globalStorage = new chatStorageClass();
export default globalStorage;
