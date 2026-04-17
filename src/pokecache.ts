

export type CacheEntry<T> = {
  createdAt: number; 
  val: T;
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    let entry = {
      createdAt: Date.now(),
      val: val
    }
    this.#cache.set(key, entry);
  }

  get<T>(key: string): T | undefined {
    let entry = this.#cache.get(key);
    if (!entry) {
      return undefined;
    }

    return entry.val as T;
  }

  #reap() {
    const expirationTime = Date.now() - this.#interval;
    for (const [name, data] of this.#cache.entries()) {
        const isExpired = data.createdAt <= expirationTime;  
        if (isExpired) {
        this.#cache.delete(name);
      }
    }
  }

  stopReapLoop() {
    if (this.#reapIntervalId) {
      clearInterval(this.#reapIntervalId)
      this.#reapIntervalId = undefined;
    }
  }

  #startReapLoop() {
    let intervalID = setInterval(() => {
      this.#reap();
    }, this.#interval)

    this.#reapIntervalId = intervalID;
  }
}
