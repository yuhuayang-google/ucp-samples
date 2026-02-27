
import { getBigtable } from './db';

const bigtable = getBigtable();
const instance = bigtable.instance('ucp-instance');
const table = instance.table('transactions');

export const getTransactions = async () => {
    const [rows] = await table.getRows();
    return rows.map(row => row.data);
};

export const getTransaction = async (id: string) => {
    const [row] = await table.row(id).get();
    return row ? row.data : null;
};
