import {type Product} from '../products';

/**
 * Mock product data for MongoDB.
 */
const MONGODB_PRODUCTS: Product[] = [
  {
    id: 'mongodb-product-1',
    title: 'MongoDB T-Shirt',
    price: 2500, // Price in cents
    image_url: 'https://example.com/mongodb-tshirt.jpg',
  },
  {
    id: 'mongodb-product-2',
    title: 'MongoDB Mug',
    price: 1200,
    image_url: 'https://example.com/mongodb-mug.jpg',
  },
  {
    id: 'mongodb-product-3',
    title: 'MongoDB Sticker Pack',
    price: 500,
    image_url: 'https://example.com/mongodb-sticker.jpg',
  },
];

/**
 * Lists all products from a mock MongoDB data source.
 * @returns A promise that resolves to an array of Product objects.
 */
export async function listProducts(): Promise<Product[]> {
  return Promise.resolve(MONGODB_PRODUCTS);
}

/**
 * Retrieves a product from a mock MongoDB data source by its ID.
 * @param productId The unique identifier of the product.
 * @returns A promise that resolves to the Product object if found, otherwise undefined.
 */
export async function getProduct(productId: string): Promise<Product | undefined> {
  return Promise.resolve(MONGODB_PRODUCTS.find((p) => p.id === productId));
}
