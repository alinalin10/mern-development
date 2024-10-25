import express from "express";

import Product from '../models/product.model.js';
import mongoose from 'mongoose';

import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

// if you are updating all fields, use put
// if you are updating only certain fields, use patch

router.put("/:id", updateProduct)

router.delete("/:id", deleteProduct);

export default router;