import express from 'express';
import { getAllDepartements } from '../controller/departement_controller.js';
import { protect } from '../middleware/auth_middleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getAllDepartements);

export default router;
