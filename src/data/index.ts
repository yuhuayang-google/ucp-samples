import {initDbs} from './db';
import {initSpanner} from './spanner';
// import {initFirestore} from './firestore'; // Assuming a similar init function for Firestore

export async function initDb() {
  const dbType = process.env.DB_TYPE;

  switch (dbType) {
    case 'spanner':
      console.log('Initializing Spanner database...');
      await initSpanner();
      break;
    case 'firestore':
      console.log('Initializing Firestore database...');
      // await initFirestore(); // Uncomment and implement when Firestore init is ready
      break;
    case 'mongodb':
      console.log('Initializing MongoDB database...');
      // await initMongodb(); // Uncomment and implement when MongoDB init is ready
      break;
    case 'redis':
      console.log('Initializing Redis database...');
      // await initRedis(); // Uncomment and implement when Redis init is ready
      break;
    case 'bigtable':
      console.log('Initializing Bigtable database...');
      // await initBigtable(); // Uncomment and implement when Bigtable init is ready
      break;
    case 'couchdb':
      console.log('Initializing CouchDB database...');
      // await initCouchdb(); // Uncomment and implement when CouchDB init is ready
      break;
    case 'sqlite':
    default:
      console.log('Initializing SQLite databases...');
      initDbs(
        process.env.PRODUCTS_DB_PATH || 'databases/products.db',
        process.env.TRANSACTIONS_DB_PATH || 'databases/transactions.db'
      );
      break;
  }
}
