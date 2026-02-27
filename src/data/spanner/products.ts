import {getSpannerDatabase} from './db';
import {PRODUCTS} from './data';

export async function populateProducts() {
  const database = getSpannerDatabase();
  const productsTable = database.table('products');
  try {
    await productsTable.insert(PRODUCTS);
  } catch (err) {
    if (err.code === 6) {
      // Table already exists
    } else {
      throw err;
    }
  }
}
