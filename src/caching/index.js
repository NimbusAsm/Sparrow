// Cache management logic
const cache = new Map();

function setCache(key, value, ttl) {
  const expiry = Date.now() + ttl * 1000;
  cache.set(key, { value, expiry });
}

function getCache(key) {
  const entry = cache.get(key);
  if (entry && entry.expiry > Date.now()) {
    return entry.value;
  } else {
    cache.delete(key);
    return null;
  }
}

function clearCache() {
  cache.clear();
}

export default { setCache, getCache, clearCache };
