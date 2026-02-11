// Mock Redis client
export const redisClient = {
  data: new Map<string, string>(),
  get: async (key: string): Promise<string | null> => {
    return redisClient.data.get(key) || null;
  },
  set: async (key: string, value: string): Promise<void> => {
    redisClient.data.set(key, value);
  },
};

// Initialize mock data
redisClient.set('product:1', JSON.stringify({ id: '1', name: 'Mock Redis Product 1', price: 100 }));
redisClient.set('product:2', JSON.stringify({ id: '2', name: 'Mock Redis Product 2', price: 200 }));
