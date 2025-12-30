import express from 'express';
import { registerUser, loginUser, getAllUsers, updateUser, deleteUser } from '../controller/user_controller.js';
import { protect } from '../middleware/auth_middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.use(protect);
router.get('/', getAllUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
