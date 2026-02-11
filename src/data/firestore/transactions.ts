import {db} from './db';
import {
  type ExtendedCheckoutResponse,
  type IdempotencyRecord,
  type Order,
} from '../../models';

// Checkout
export async function getCheckoutSession(
    id: string,
): Promise<ExtendedCheckoutResponse|undefined> {
  const doc = await db.collection('checkouts').doc(id).get();
  return doc.exists ? (doc.data() as ExtendedCheckoutResponse) : undefined;
}

export async function saveCheckout(
    id: string,
    status: string,
    data: ExtendedCheckoutResponse,
): Promise<void> {
  await db.collection('checkouts').doc(id).set({...data, status});
}

// Order
export async function getOrder(id: string): Promise<Order|undefined> {
  const doc = await db.collection('orders').doc(id).get();
  return doc.exists ? (doc.data() as Order) : undefined;
}

export async function saveOrder(id: string, data: Order): Promise<void> {
  await db.collection('orders').doc(id).set(data);
}

// Idempotency
export async function getIdempotencyRecord(
    key: string,
): Promise<IdempotencyRecord|undefined> {
  const doc = await db.collection('idempotency_keys').doc(key).get();
  return doc.exists ? (doc.data() as IdempotencyRecord) : undefined;
}

export async function saveIdempotencyRecord(
    key: string,
    requestHash: string,
    responseStatus: number,
    responseBody: string,
): Promise<void> {
  const record: IdempotencyRecord = {
    key,
    request_hash: requestHash,
    response_status: responseStatus,
    response_body: responseBody,
  };
  await db.collection('idempotency_keys').doc(key).set(record);
}

// Logging
export async function logRequest(
    method: string,
    url: string,
    checkoutId: string|undefined,
    payload: unknown,
): Promise<void> {
  await db.collection('request_logs').add({
    method,
    url,
    checkoutId,
    payload: JSON.stringify(payload),
    timestamp: new Date(),
  });
}
