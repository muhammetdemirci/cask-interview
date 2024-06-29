import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocalStorage {
  constructor(key) {
    this.key = key;
  }
  async storeData(value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(this.key, jsonValue);
    } catch (e) {
      console.warn(e);
    }
  }

  async getData() {
    try {
      const value = await AsyncStorage.getItem(this.key);
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (e) {
      console.warn(e);
    }
    return null;
  }
}
