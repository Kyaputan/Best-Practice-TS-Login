import { Request, Response } from "express";
import { Product } from "../models/Product";
import { User } from "../models/User";
import { comparePassword } from "../utils/hash.util";
import { ZodError } from "zod";
import { ProductSchema , updateProductSchema , deleteProductSchema } from "../interfaces/product.interfaces";
import { ProductDTO , UpdateProductDTO , DeleteProductDTO } from "../interfaces/product.interfaces";


class AdminProductController {
    static async createProduct(req: Request<{}, {}, ProductDTO>, res: Response): Promise<void> {
        try {
            const productData = ProductSchema.parse(req.body);
            const { name, price, quantity , type } = productData;
            const product = await Product.create({ name, price, quantity , type });
            res.status(201).json({ success: true, message: "Product created successfully", product });
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(400).json({ success: false, error: "Validation error", details: err.errors });
            } else if (err instanceof Error) {
                res.status(400).json({ success: false, error: err.message });
            } else {
                console.error(err);
                res.status(500).json({ success: false, error: "Internal Server Error" });
            }
        };
    };

    static async updateProduct(req: Request<{id:string}, {}, UpdateProductDTO>, res: Response): Promise<void> {
        try {
            const updateData = updateProductSchema.parse(req.body);
            const { name, price, quantity , type } = updateData;
            if (!name && !price && !quantity && !type) {
                res.status(400).json({ success: false, error: "No fields to update" });
                return;
            }
            const product  = await Product.findById(req.params.id).exec();
            if (!product) {
                res.status(404).json({ success: false, error: "Product not found" });
                return;
            }
            if (name) product.name = name;
            if (price) product.price = price;
            if (quantity) product.quantity = quantity;
            if (type) product.type = type;
            
            await product.save();
            res.status(200).json({ success: true, message: "Product updated successfully", product });
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(400).json({ success: false, error: "Validation error", details: err.errors });
            } else if (err instanceof Error) {
                res.status(400).json({ success: false, error: err.message });
            } else {
                console.error(err);
                res.status(500).json({ success: false, error: "Internal Server Error" });
            }
        };
    };

    static async deleteProduct(req: Request<{id:string}, {}, DeleteProductDTO>, res: Response): Promise<void> {
        try {
            const deleteData = deleteProductSchema.parse(req.body);
            const { password } = deleteData;
            const userId = req.auth?._id;
            if (!userId) {
                res.status(401).json({ success: false, error: "Unauthorized" });
                return;
            }
            const product  = await Product.findById(req.params.id).exec();
            if (!product) {
                res.status(404).json({ success: false, error: "Product not found" });
                return;
            }
            const user = await User.findById(userId).exec();
            if (!user) {
                res.status(404).json({ success: false, error: "User not found" });
                return;
            }
            const isPasswordValid: boolean = await comparePassword(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({ success: false, error: "Invalid password" });
                return;
            }
            await product.deleteOne();
            res.status(200).json({ success: true, message: "Product deleted successfully" });
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(400).json({ success: false, error: "Validation error", details: err.errors });
            } else if (err instanceof Error) {
                res.status(400).json({ success: false, error: err.message });
            } else {
                console.error(err);
                res.status(500).json({ success: false, error: "Internal Server Error" });
            }
        };
    };
};

export default AdminProductController;
// Request<{ค่าจากparameter}, {ค่าจากquery}, {ค่าจากbody} , {ค่าจากheader}>

// จากparameter /user/123 → { id: "123" }
// จากquery /user?name=John&age=30 → { name: "John", age: "30" }
// จากbody 	{ name: "apple" }
// จากheader { "Content-Type": "application/json" }

// createProduct
// รับ name, price, quantity จาก body

// getAllProducts
// ไม่มี parameter

// getProductById
// รับ id จาก parameter

// updateProduct
// รับ id จาก parameter, name, price, quantity จาก body

// deleteProduct
// รับ id และ userId จาก parameter