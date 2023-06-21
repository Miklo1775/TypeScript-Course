import Product from "./product.model";
import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
// declare const GLOBAL: any;

const products = [
  { title: "Carpet", price: 30 },
  { title: "Another Book", price: 40 },
];

const newProd = new Product("", -99);
validate(newProd).then((errors) => {
  if (errors.length > 0) {
    console.log("Errors: " + errors);
  } else {
    console.log(newProd.getInfo());
  }
});
const loadedProducts = plainToClass(Product, products);

// for (const product of loadedProducts) {
//   console.log(product.getInfo());
// }

loadedProducts.forEach((loadedProduct) => {
  console.log(loadedProduct?.getInfo());
});

newProd.getInfo();
