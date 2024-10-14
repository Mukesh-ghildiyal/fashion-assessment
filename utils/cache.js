const cacheStore = new Map(); // Use Redis in production

const cache = (key, data, ttl = 3600) => {
    cacheStore.set(key, { data, expireAt: Date.now() + ttl * 1000 });
};

const getCachedData = (key) => {
    const cached = cacheStore.get(key);
    if (cached && cached.expireAt > Date.now()) {
        return cached.data;
    }
    return null;
};

module.exports = { cache, getCachedData };
