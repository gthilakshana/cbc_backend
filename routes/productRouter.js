import express from "express";
import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getProductById,
  getProductsByCategory,
} from "../controllers/productController.js";

const productRouter = express.Router();


productRouter.get("/category/:category/:subcategory", getProductsByCategory);


productRouter.post("/", createProduct);


productRouter.get("/", getProducts);


productRouter.delete("/:productId", deleteProduct);

productRouter.put("/:productId", updateProduct);


productRouter.get("/:productId", getProductById);

export default productRouter;
