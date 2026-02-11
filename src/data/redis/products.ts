import { redisClient } from './db';
import { type Product } from '../../models';

/**
 * Retrieves a single product by its ID from Redis.
 *
 * @param id The ID of the product to retrieve.
 * @returns The product object, or undefined if not found.
 */
export async function getProduct(id: string): Promise<Product | undefined> {
  const productKey = `product:${id}`;
  const productStr = await redisClient.get(productKey);

  if (!productStr) {
    return undefined;
  }
  
  try {
    const product = JSON.parse(productStr) as Product;
    return product;
  } catch (e) {
    console.error(`Failed to parse product data for key ${productKey}`, e);
    return undefined;
  }
}
