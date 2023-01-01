const clientStorage = {
  getItem:
    typeof window !== 'undefined'
      ? window.localStorage.getItem.bind(window.localStorage)
      : () => null,
  setItem:
    typeof window !== 'undefined'
      ? window.localStorage.setItem.bind(window.localStorage)
      : () => null,
  removeItem:
    typeof window !== 'undefined'
      ? window.localStorage.removeItem.bind(window.localStorage)
      : () => null,
  setWithExpiry: function setWithExpiry(key: string, value: any, ttl: number) {
    const item = {
      value: value,
      expiry: new Date().getTime() + ttl,
    };

    this.setItem(key, JSON.stringify(item));
  },
  getWithExpiry: function getWithExpiry(key: string) {
    const itemString = this.getItem(key);
    if (!itemString) return null;

    const item = JSON.parse(itemString);
    const isExpired = new Date().getTime() > item.expiry;

    if (isExpired) {
      this.removeItem(key);
      return null;
    }

    return item.value;
  },
};

export default clientStorage;
