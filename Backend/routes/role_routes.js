import express from 'express';
import { getAllRoles } from '../controller/role_controller.js';
import { protect } from '../middleware/auth_middleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getAllRoles);

export default router;
