import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user_routes.js';
import paymentRoutes from './routes/payment_routes.js';
import departementRoutes from './routes/departement_routes.js';
import roleRoutes from './routes/role_routes.js';
import auditRoutes from './routes/audit_routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/departements', departementRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/audit', auditRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
