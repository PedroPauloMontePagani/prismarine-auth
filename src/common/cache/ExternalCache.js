class ExternalCache {
  constructor(cacheUrl) {
    this.cacheUrl = cacheUrl;
  }

  async reset() {
    try {
      const response = await fetch(this.cacheUrl.href, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ })
      }), body = await response.json();

      return body.ok;
    } catch {
      return false;
    }
  }

  async loadInitialValue() {
    try {
      const response = await fetch(this.cacheUrl.href),
            json = await response.json();

      return json;
    } catch {
      return this.reset();
    }
  }

  async getCached() {
    if(this.cache === undefined) {
      this.cache = await this.loadInitialValue();
    }

    return this.cache;
  }

  async setCached(cached) {
    this.cache = cached;

    try {
      const response = await fetch(this.cacheUrl.href, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cached)
      }), body = await response.json();

      return body.ok;
    } catch {
      return false;
    }
  }

  setCachedPartial(cached) {
    return this.setCached({
      ...this.cache,
      ...cached
    });
  }
}

module.exports = ExternalCache;