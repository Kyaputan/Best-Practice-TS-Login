import express , { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { requireLogin } from '../middleware/auth.middleware';

const router: Router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.patch('/update', requireLogin, AuthController.update);
router.delete('/delete', requireLogin, AuthController.delete);
router.get('/logout', requireLogin, AuthController.logout);

export default router;