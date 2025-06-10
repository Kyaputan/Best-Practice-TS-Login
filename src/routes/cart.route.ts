import express , { Router } from 'express';
import CartController from '../controllers/cart.controller';
import { requireLogin ,handleJwtError } from '../middleware/auth.middleware';

const router: Router = express.Router();

router.post('/add', requireLogin, handleJwtError, CartController.addToCart);
router.post('/remove', requireLogin, handleJwtError, CartController.removeFromCart);
router.post('/update', requireLogin, handleJwtError, CartController.EditCart);
router.get('/get', requireLogin, handleJwtError, CartController.getCart);



export default router;