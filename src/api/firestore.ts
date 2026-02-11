import {type Context} from 'hono';

import {listProducts, getProduct} from '../data/firestore/products';

/**
 * Service for interacting with Firestore data.
 */
export class FirestoreService {
  /**
   * Lists all products from Firestore.
   * @param c The Hono context.
   * @returns A JSON response with all products.
   */
  getProducts = async (c: Context) => {
    try {
      const products = await listProducts();
      return c.json(products, 200);
    } catch (error: any) {
      return c.json({error: 'Failed to fetch products', details: error.message}, 500);
    }
  };

  /**
   * Gets a single product by ID from Firestore.
   * @param c The Hono context.
   * @returns A JSON response with the product, or 404 if not found.
   */
  getProduct = async (c: Context) => {
    const id = c.req.param('id');
    try {
      const product = await getProduct(id);
      if (!product) {
        return c.json({error: 'Product not found'}, 404);
      }
      return c.json(product, 200);
    } catch (error: any) {
      return c.json({error: 'Failed to fetch product', details: error.message}, 500);
    }
  };
}
