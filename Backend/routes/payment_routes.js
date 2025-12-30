import express from 'express';
import {
    createPaymentRequest,
    getAllPayments,
    getPaymentById,
    updatePaymentStatus
} from '../controller/payment_controller.js';
import { protect } from '../middleware/auth_middleware.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
    .post(createPaymentRequest)
    .get(getAllPayments);

router.route('/:id')
    .get(getPaymentById)
    .put(updatePaymentStatus);

export default router;
