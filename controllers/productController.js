import Product from "../models/product.js";
import { isAdmin } from "./userController.js";


export function createProduct(req,res){
    if(!isAdmin(req)){
        res.json({
            message: "Please login as administrator to create product",
          });
          return;
    }

    const newProductData = req.body;
    const product = new Product(newProductData);

    product.save()
    .then(()=>{
        res.json({
            message: "Product saved successfully",
          });
    }).catch((error)=>{
        res.json({
            message: error
          });
    })
    
}

export function getProducts(req,res){
    Product.find().then((product)=>{
        res.json(product)
    })
}

