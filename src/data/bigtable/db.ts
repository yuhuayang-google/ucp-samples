
import { Bigtable } from '@google-cloud/bigtable';

let bigtable: Bigtable;

export const getBigtable = () => {
    if (!bigtable) {
        bigtable = new Bigtable();
    }
    return bigtable;
};
