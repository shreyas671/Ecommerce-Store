const exp = require("constants");
const Product = require("../models/productModels");
const apiFeatures = require("../utils/apifeatures");

exports.createProduct = async (req,res,next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}

exports.getAllProducts = async (req,res) => {

    const resultPerPage = 8;
    //Count Number of Products
    const productsCount = await Product.countDocuments();

    const apiFeatures = new apiFeatures(Product.find(),req.query)
    .search()
    .filter();

    let products = await apiFeatures.query;

    apiFeatures.pagination(resultPerPage);
    //const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    });
}

exports.updateProducts = async(req,res,next) => {

    var product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(200).json({
            success:false,
            message:"Product Not Found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:true
    });

    res.status(200).json({
        success:true,
        product
    })



}

exports.deleteProducts = async (req,res,next) => {

    const product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(500).json({
            success:false,
            message:"Product Not Found"
        })
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message:"Product Deleted Successfullly"
    })

}

//Get products

exports.getProductDetails = async (req,res,next) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(ErrorHandler("Product Not Found",404));
    }

    res.status(200).json({
        success: true,
        product
    })
}