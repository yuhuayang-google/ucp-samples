
import { Router } from 'express';
import { Bigtable } from '@google-cloud/bigtable';

const router = Router();
const bigtable = new Bigtable();

router.get('/products', async (req, res) => {
    try {
        const instance = bigtable.instance('ucp-instance');
        const table = instance.table('products');
        const [rows] = await table.getRows();
        const products = rows.map(row => row.data);
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching products from Bigtable');
    }
});

export default router;
