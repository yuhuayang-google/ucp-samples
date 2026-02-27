import {getSpannerDatabase} from './db';
import {INVENTORY} from './data';

export async function populateInventory() {
  const database = getSpannerDatabase();
  const inventoryTable = database.table('inventory');
  try {
    await inventoryTable.insert(INVENTORY);
  } catch (err) {
    if (err.code === 6) {
      // Table already exists
    } else {
      throw err;
    }
  }
}
