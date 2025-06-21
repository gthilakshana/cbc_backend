import Product from "../models/product.js";

export async function getProducts(req, res) {
  try {
    const productList = await Product.find();

    res.json({
      list: productList,
    });
  } catch (e) {
    res.json({
      message: "Error",
    });
  }
}

export function createProducts(req, res) {
  console.log(req.user);
  if (req.user == null) {
    res.json({
      message: "You are not logged in",
    });
    return;
  }

  if (req.user.type != "admin") {
    res.json({
      message: "You are not admin",
    });
    return;
  }

  const product = new Product(req.body);
  product
    .save()
    .then((product) => {
      res.json({
        message: "Product saved successfully",
      });
    })
    .catch(() => {
      res.json({
        message: "Error in saving product",
      });
    });
}

export function deleteProducts(req, res) {
  Product.deleteOne({ name: req.params.name })
    .then(() => {
      res.json({
        message: "Product deleted successfully",
      });
    })
    .catch(() => {
      res.json({
        message: "Error in deleting product",
      });
    });
}

export function getProductBuyName(req, res) {
  const name = req.params.name;

  Product.find({ name: name })
    .then((productList) => {
      if (productList.length == 0) {
        res.json({
          message: "Product not found",
        });
      } else productList;

      res.json({
        list: productList,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error in getting products",
      });
    });
}
