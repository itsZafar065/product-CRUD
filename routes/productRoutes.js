import express from "express";
import mongoose from "mongoose";
import Product from "../models/productModel.js";

const productRoutes = express.Router();

//  (Geting all products)
productRoutes.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ message: "Successfully got all products", products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//  (Geting product by ID)
productRoutes.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.json({ message: "Product not found" });
        res.json({ message: "Successfully got product", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// (Create new product)
productRoutes.post("/", async (req, res) => {
    try {
        const { name, price, category } = req.body;
        const newProduct = new Product({ name, price, category });
        await newProduct.save();
        res.json({ message: "Successfully created product", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// (Delete product)
productRoutes.delete("/:id", async (req, res) => {
    try {
        const result = await Product.findByIdAndDelete(req.params.id);
        if (!result) return res.json({ message: "Product not found" });
        res.json({ message: "Successfully deleted product" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default productRoutes;
