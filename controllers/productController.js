import Product from "../models/product.js";
import { isAdmin } from "./userController.js";


export function createProduct(req,res){
    if (!isAdmin(req)) {
    return res.status(403).json({
      message: "Please login as administrator to delete product",
    });
  }
    
    const newProductData = req.body;
    const product = new Product(newProductData);

    product.save()
    .then(()=>{
        res.json({
            message: "Product created"
          });
    }).catch((error)=>{
        res.status(403).json({
            message: error
          });
    })
    
}

export function getProducts(req,res){
    Product.find().then((product)=>{
        res.json(product)
    })
}


export function deleteProduct(req,res){
    if(!isAdmin(req)){
        res.json(403).json({
            message: "Please login as administrator to delete product",
          });
          return;
    }
    const productId = req.params.productId;

    Product.deleteOne({productId : productId}).then(()=>{
        res.json({
            message: "Product deleted"
          });
    }).catch((error)=>{
        res.status(403).json({
            message: error
          });
    })
}

export function updateProduct(req,res){
  if(!isAdmin(req)){
    res.status(403).json({
        message: "Please login as administrator to delete product",
      });
      return;
  }

  const productId = req.params.productId;
  const newProductData = req.body;

  Product.updateOne({productId : productId}, newProductData).then(()=>{
      res.json({
          message: "Product updated"
        });
  }).catch((error)=>{
      res.status(403).json({
          message: error
        });
  })
}





export async function getProductById(req, res) {

  try {
 const productId = req.params.productId;
 const product = await Product.findOne({ productId: productId });

 res.json(product);

   } catch (error) {
    res.status(500).json({ message: error.message });
  }
} 