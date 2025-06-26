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