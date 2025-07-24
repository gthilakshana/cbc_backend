import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },

  productName: {
    type: String,
    required: true,
  },

  altNames: [
    {
      type: String,
    },
  ],

  images: [{
    type: String
  }],

  price:{
    type: Number,
    required: true,
  },
  lastPrice:{
    type: Number,
    required: true,
  },
  stock:{
    type: Number,
    required: true,
  },


  description:{
    type: String,
    required: true,
  },

  delivery: {
    type: String,
    required: true,
  },
  brands: [
    {
      type: String,
    },
  ],

  colors: [
    {
      type: String,
    },
  ],
  sizes: [
    {
      type: String,
    },
  ],

  materials: [
    {
      type: String,
    },
  ],

  categories: [
    {
      title: {
        type: String,
        enum: [
          "Women",
          "Men",
          "Kids",
          "Footwear",
          "MotherAndBaby",
          "Accessories",
          "Brands",
          "GiftsAndDeals",
          "Sale",
        ],
        required: true,
      },
      subCategories: [
        {
          type: String,
        },
      ],
    },
  ],
  


  }
);

const Product = mongoose.model("products", productSchema);

export default Product;
