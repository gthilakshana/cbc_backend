import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

// Create a product
export function createProduct(req, res) {
  if (!isAdmin(req)) {
    return res.status(403).json({
      message: "Please login as administrator to create product",
    });
  }

  const newProductData = req.body;
  const product = new Product(newProductData);

  product
    .save()
    .then(() => {
      res.json({ message: "Product created" });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
}

// Get all products
export function getProducts(req, res) {
  Product.find({})
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
}

// Delete a product
export function deleteProduct(req, res) {
  if (!isAdmin(req)) {
    return res.status(403).json({
      message: "Please login as administrator to delete product",
    });
  }

  const productId = req.params.productId;

  Product.deleteOne({ productId })
    .then(() => {
      res.json({ message: "Product deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
}

// Update a product
export function updateProduct(req, res) {
  if (!isAdmin(req)) {
    return res.status(403).json({
      message: "Please login as administrator to update product",
    });
  }

  const productId = req.params.productId;
  const newProductData = req.body;

  Product.updateOne({ productId }, newProductData)
    .then(() => {
      res.json({ message: "Product updated" });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
}

// Get product by ID
export async function getProductById(req, res) {
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({ productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get products by category and subcategory
export async function getProductsByCategory(req, res) {
  const { category, subcategory } = req.params;

  try {
    const products = await Product.find({
      categories: {
        $elemMatch: {
          title: category,
          subCategory: subcategory,
        },
      },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
