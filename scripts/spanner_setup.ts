/* eslint-disable no-process-exit */
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';

import {Spanner} from '@google-cloud/spanner';
import {SPANNER_SCHEMA} from '../src/data/spanner/schema';
import {INVENTORY, PRODUCTS} from '../src/data/spanner/data';

const argv = yargs(hideBin(process.argv))
  .option('projectId', {
    alias: 'p',
    description: 'Your GCP project ID',
    type: 'string',
    demandOption: true,
  })
  .option('instanceId', {
    alias: 'i',
    description: 'Your Spanner instance ID',
    type: 'string',
    demandOption: true,
  })
  .option('databaseId', {
    alias: 'd',
    description: 'Your Spanner database ID',
    type: 'string',
    demandOption: true,
  }).argv;

async function main() {
  const {projectId, instanceId, databaseId} = await argv;
  const spanner = new Spanner({projectId});
  const instance = spanner.instance(instanceId);

  console.log(`Ensuring instance ${instanceId} exists...`);
  const [instanceExists] = await instance.exists();
  if (!instanceExists) {
    console.log(`Instance ${instanceId} does not exist. Creating...`);
    await instance.create({
      config: 'regional-us-central1',
      nodes: 1,
      displayName: 'UCP Samples Instance',
    });
  }

  const database = instance.database(databaseId);
  console.log(`Ensuring database ${databaseId} exists...`);
  const [databaseExists] = await database.exists();
  if (!databaseExists) {
    console.log(`Database ${databaseId} does not exist. Creating...`);
    const [operation] = await database.create();
    await operation.promise();
  }

  console.log('Creating tables...');
  const [operation] = await database.updateSchema(SPANNER_SCHEMA);
  await operation.promise();

  console.log('Inserting data...');

  const productsTable = database.table('products');
  await productsTable.insert(PRODUCTS);

  const inventoryTable = database.table('inventory');
  await inventoryTable.insert(INVENTORY);

  console.log('Setup complete.');
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
