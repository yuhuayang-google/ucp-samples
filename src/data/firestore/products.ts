import {db} from './db';
import {type Product} from '../../models';

/**
 * Retrieves a single product by its ID from Firestore.
 *
 * @param id The ID of the product to retrieve.
 * @returns The product object, or undefined if not found.
 */
export async function getProduct(id: string): Promise<Product|undefined> {
  const productRef = db.collection('products').doc(id);
  const doc = await productRef.get();

  if (!doc.exists) {
    return undefined;
  }

  return doc.data() as Product;
}

/**
 * Lists all products from Firestore.
 *
 * @returns A promise that resolves to an array of all products.
 */
export async function listProducts(): Promise<Product[]> {
  const snapshot = await db.collection('products').get();
  return snapshot.docs.map((doc) => doc.data() as Product);
}
