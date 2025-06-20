import express from "express";
import {
  getProducts,
  createProducts,
  deleteProducts,
  getProductBuyName,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/:name", getProductBuyName);
productRouter.post("/", createProducts);
productRouter.delete("/:name", deleteProducts);

export default productRouter;
