import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payload: Partial<IProduct>) => {
  const product = await Product.create(payload);
  return product;
};
const getProducts = async () => {
  const products = await Product.find();
  return products;
};

export const ProductServices = {
  createProduct,
  getProducts,
};
