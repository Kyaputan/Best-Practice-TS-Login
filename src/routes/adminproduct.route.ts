import express , { Router } from 'express';
import AdminProductController from '../controllers/product.controller';
import { requireLogin , checkRole } from '../middleware/auth.middleware';

const router: Router = express.Router();

router.post('/add' , requireLogin , checkRole({ role: "admin" }) , AdminProductController.createProduct);
router.patch('/update/:id' , requireLogin , checkRole({ role: "admin" }),AdminProductController.updateProduct);
router.delete('/delete/:id' , requireLogin , checkRole({ role: "admin" }),AdminProductController.deleteProduct);

export default router;
