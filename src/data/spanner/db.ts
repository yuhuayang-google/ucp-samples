import {Spanner} from '@google-cloud/spanner';
import {SPANNER_SCHEMA} from './schema';
import {populateInventory} from './inventory';
import {populateProducts} from './products';

// TODO: Replace with your project, instance, and database IDs
const projectId = 'your-gcp-project-id';
const instanceId = 'your-spanner-instance-id';
const databaseId = 'your-spanner-database-id';

const spanner = new Spanner({
  projectId,
});

const instance = spanner.instance(instanceId);
const database = instance.database(databaseId);

export function getSpannerDatabase() {
  return database;
}

export async function initSpanner() {
  try {
    await database.create({schema: SPANNER_SCHEMA});
    console.log(`Database ${database.name} created.`);
  } catch (err) {
    if (err.code === 6) {
      // Database already exists.
      console.log(`Database ${database.name} already exists.`);
    } else {
      console.error('ERROR:', err);
      throw err;
    }
  }

  try {
    await populateProducts();
    await populateInventory();
  } catch (err) {
    console.error('ERROR:', err);
    throw err;
  }
}
