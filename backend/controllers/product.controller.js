import Product from "../models/product.model.js";
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // if you pass in an empty object it fetches all data in database
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("error in fetching products: ", error); 
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const createProduct = async (req, res) => {
    const product = req.body; // user will send this data

    if (!product.name || !product.price || !product.image) {
        // if these are empty
        return res.status(400).json({ success: false, message: "Please provide all fields"})
    }


    const newProduct = new Product(product);

    try {
        await newProduct.save();
        // saves new product that user inputted into the mongo database
        res.status(201).json({ success: true, message: "Product added successfully" });
    } catch (error) {
        console.error("Error in creating product: ", error);
        res.status(500).json({ success: false, message: "Server Error"});
    }
}

export const updateProduct = async (req, res) => {
    const {id} = req.params; // grab id

    const product = req.body; // user will send this data
    
    console.log("product: ", product);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product id" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true}); // new: true returns the updated product
        res.status(200).json({ success: true, message: "Product updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params; // grab id
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product id"});
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted successfully" });

    } catch (error) {
        console.log("error in deleting product: ", error); 
        res.status(500).json({ success: false, message: "Server Error" });
    }
}