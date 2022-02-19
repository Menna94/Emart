import Category from "../Models/Category.model.js";
import Product from "../Models/Product.model.js";
import mongoose from "mongoose";

//@desc     Create A Product
//@route    POST /api/v1/products
//@access   private
const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      discription,
      richDiscription,
      img,
      imgs,
      price,
      categoryID,
      countInStock,
      rating,
      numReviews,
      isFeatured,
      dateCreated,
    } = req.body;

    //check if the provided category exists
    const category = await Category.findById(categoryID);

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "There Is No Category For The Provided categoryID",
        data: null,
      });
    }

    const product = new Product({
      name,
      discription,
      richDiscription,
      img,
      imgs,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
      dateCreated,
    });
    await product.save();

    if (!product) {
      return res.status(400).send({
        success: false,
        message: "Error While Creating A Product",
        data: null,
      });
    }

    const products = await Product.find();

    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      count: products.length,
      data: product,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error While Creating A Product",
      data: err.message,
    });
  }
};

//@desc     Fetch All Products
//@route    GET /api/v1/products
//@access   public
const fetchProducts = async (req, res, next) => {
  try {
    let filter = {};

    //get products by category
    if(req.query.category){
      filter = req.query.category.split(',');
    }

    const products = await Product.find(filter);

    if (!products) {
      return res.status(400).send({
        success: false,
        message: "No Products Found!",
        data: null,
      });
    }

  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error While Fetching Products",
      data: err.message,
    });
  }
};

//@desc     Fetch Single Product
//@route    GET /api/v1/products/:id
//@access   public
const fetchAProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
 
    //check if the id is a valid mongoose id
    const isValidID = mongoose.isValidObjectId(id);
    if(!isValidID){
        return res.status(400).send({
            success: false,
            message: "FET-> The Provided ID Is Not A Vaid MongooseID!",
            data: null,
        });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "No Product Found With The Provided ID!",
        data: null,
      });
    }

    res.status(200).send({
      success: true,
      message: "Product Fetched Successfully",
      data: product,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error While Fetching A Product",
      data: err.message,
    });
  }
};

//@desc     Delete A Product
//@route    DELETE /api/v1/products/:id
//@access   private
const updateProduct = async (req, res, next) => {
    try {
      const id = req.params.id;
  
        //check if the id is a valid mongoose id
        const isValidID = mongoose.isValidObjectId(id);
        if(!isValidID){
            return res.status(400).send({
                success: false,
                message: "UPD-> The Provided ID Is Not A Vaid MongooseID!",
                data: null,
            });
        }

      //check if there's a product with the provided ID
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).send({
          success: false,
          message: "No Product Found With The Provided ID!",
          data: null,
        });
      }
  
      //check if the provided categoryID exists
      if(req.body.categoryID){
        const category = await Category.findById(req.body.categoryID)
        if(!category){
            return res.status(404).send({
                success: false,
                message: "No Category Found With The Provided ID!",
                data: null,
            });
        }
      }
      

      const newProduct = await Product.findByIdAndUpdate(id, req.body,{
        new: true,
        runValidators: true
      });

      if (!newProduct) {
        return res.status(404).send({
          success: false,
          message: "Could Not Update The Product!",
          data: null,
        });
      }

      const products = await Product.find();
  
      res.status(200).send({
        success: true,
        message: "Product Updated Successfully!",
        count: products.length,
        data: newProduct,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Internal Server Error While Updating A Product",
        data: err.message,
      });
    }
};

//@desc     Delete A Product
//@route    DELETE /api/v1/products/:id
//@access   private
const delProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    //check if the id is a valid mongoose id
    const isValidID = mongoose.isValidObjectId(id);
    if(!isValidID){
        return res.status(400).send({
            success: false,
            message: "DEL-> The Provided ID Is Not A Vaid MongooseID!",
            data: null,
        });
    }

    //check if there's a product with the provided ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "No Product Found With The Provided ID!",
        data: null,
      });
    }

    const deletedProduct = await Product.findByIdAndRemove(id);
    if (!deletedProduct) {
      return res.status(404).send({
        success: false,
        message: "Could Not Delete The Product!",
        data: null,
      });
    }
    //return the remainig products in the database & their count
    const products = await Product.find();

    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully!",
      count: products.length,
      data: products,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error While Deleting A Product",
      data: err.message,
    });
  }
};


//@desc     Get The Products Count
//@route    GET /api/v1/products/count
//@access   public
const getProductsCount = async (req, res, next) => {
    try {
      const productsCount = await Product.countDocuments();
  
      if (!productsCount) {
        return res.status(400).send({
          success: false,
          message: "No Products Found!",
          data: null,
        });
      }
  
      res.status(200).send({
        success: true,
        count: productsCount,
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Internal Server Error While Getting The Products' Count",
        data: err.message,
      });
    }
};


//@desc     Get The Featured Products
//@route    GET /api/v1/products/featured
//@access   public
const getFeaturedProducts = async (req, res, next) => {
    try {
        const limit = req.params.limit ? req.params.limit : 0;
        console.log(limit);
      const featuredProducts = await Product.find({isFeatured: true}).limit(+limit);
    
      if (!featuredProducts) {
        return res.status(400).send({
          success: false,
          message: "No Products Found!",
          data: null,
        });
      }
  
      res.status(200).send({
        success: true,
        count: featuredProducts.length,
        data: featuredProducts,
      });

    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Internal Server Error While Getting The Featured Products' Count",
        data: err.message,
      });
    }
};


//@desc     Get Products By Category
//@route    GET /api/v1/products
//@access   public
const getProductsByCat = async (req, res, next) => {
    try {
        const limit = req.params.limit ? req.params.limit : 0;
        console.log(limit);
      const featuredProducts = await Product.find({isFeatured: true}).limit(+limit);
    
      if (!featuredProducts) {
        return res.status(400).send({
          success: false,
          message: "No Products Found!",
          data: null,
        });
      }
  
      res.status(200).send({
        success: true,
        count: featuredProducts.length,
        data: featuredProducts,
      });

    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Internal Server Error While Getting The Featured Products' Count",
        data: err.message,
      });
    }
};


export { 
    createProduct, 
    fetchProducts, 
    fetchAProduct, 
    getProductsCount,
    getFeaturedProducts,
    updateProduct,
    delProduct 
};
