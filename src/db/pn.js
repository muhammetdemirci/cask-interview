import {LocalStorage} from './base';

export class PNStorage extends LocalStorage {
  async saveNotification(notification) {
    var newArr = [notification];
    const data = await this.getData();
    if (data) newArr = [...newArr, ...data];
    await this.storeData(newArr);
  }
}

export const pnStorage = new PNStorage('notification-key');
