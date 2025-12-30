import express from 'express';
import { getAuditLogs } from '../controller/audit_controller.js';
import { protect } from '../middleware/auth_middleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getAuditLogs);

export default router;
