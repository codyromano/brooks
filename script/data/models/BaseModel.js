import store from 'store';

/**
* @private
*/
const getStorageKey = (namespace, key) => {
  return [namespace, key].join('-');
};

export default class BaseModel {
  static getStorageKey(namespace, key) {
    return [namespace, key].join('-');
  }
  constructor(storageNamespace) {
    this.namespace = storageNamespace;
  }
  synchronize() {
    const synchronizeValues = this.synchronizeFn();
    for (const [key, value] of Object.entries(synchronizeValues)) {
      this.set(key, value);
    }
  }
  set(key, value) {
    const storageKey = getStorageKey(this.namespace, key);
    return store.set(storageKey, value);
  }
  get(key) {
    const storageKey = getStorageKey(this.namespace, key);
    return store.get(storageKey);
  }
}
