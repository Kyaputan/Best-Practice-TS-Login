import express , { Router } from 'express';
import AdminProductController from '../controllers/product.controller';
import { requireLogin , checkRole } from '../middleware/auth.middleware';

const router: Router = express.Router();

router.post('/add' , requireLogin , checkRole({ role: "admin" }) , AdminProductController.createProduct);
router.patch('/update' , requireLogin , checkRole({ role: "admin" }),AdminProductController.updateProduct);
router.delete('/delete' , requireLogin , checkRole({ role: "admin" }),AdminProductController.deleteProduct);

export default router;
