import {Spanner} from '@google-cloud/spanner';

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
