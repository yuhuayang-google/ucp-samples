import {db} from './db';
import {FieldValue} from 'firebase-admin/firestore';

/**
 * Retrieves the available inventory quantity for a given product.
 *
 * @param productId The ID of the product to check.
 * @returns The quantity available, or undefined if the product is not found in
 * inventory.
 */
export async function getInventory(
    productId: string,
): Promise<number|undefined> {
  const inventoryRef = db.collection('inventory').doc(productId);
  const doc = await inventoryRef.get();
  if (!doc.exists) {
    return undefined;
  }
  return doc.data()?.quantity;
}

/**
 * Attempts to reserve a specified quantity of stock for a product.
 * Decrements the inventory only if sufficient stock is available.
 *
 * @param productId The ID of the product.
 * @param quantity The amount to reserve (decrement).
 * @returns True if the stock was successfully reserved, false if there was
 * insufficient stock.
 */
export async function reserveStock(
    productId: string,
    quantity: number,
): Promise<boolean> {
  const inventoryRef = db.collection('inventory').doc(productId);

  try {
    await db.runTransaction(async (t) => {
      const doc = await t.get(inventoryRef);
      if (!doc.exists) {
        throw new Error(`Product ${productId} not found in inventory.`);
      }
      const newQuantity = (doc.data()?.quantity || 0) - quantity;
      if (newQuantity < 0) {
        throw new Error(`Insufficient stock for product ${productId}.`);
      }
      t.update(inventoryRef, {quantity: newQuantity});
    });
    return true;
  } catch (e) {
    console.error('Failed to reserve stock:', e);
    return false;
  }
}

/**
 * Releases reserved stock back to the inventory.
 * Used for rollbacks or cancellations.
 *
 * @param productId The ID of the product.
 * @param quantity The amount to release (increment).
 */
export async function releaseStock(
    productId: string,
    quantity: number,
): Promise<void> {
  const inventoryRef = db.collection('inventory').doc(productId);
  await inventoryRef.update({quantity: FieldValue.increment(quantity)});
}
