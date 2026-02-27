
import { getBigtable } from './db';

const bigtable = getBigtable();
const instance = bigtable.instance('ucp-instance');
const table = instance.table('inventory');

export const getInventory = async () => {
    const [rows] = await table.getRows();
    return rows.map(row => row.data);
};

export const getInventoryByProductId = async (id: string) => {
    const [row] = await table.row(id).get();
    return row ? row.data : null;
};
