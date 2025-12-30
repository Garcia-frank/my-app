import { query } from '../config/Db.js';

// Create New Payment Request
export const createPaymentRequest = async (req, res) => {
    const {
        centre,
        numero_operation,
        numero_de_dossier,
        unite_monitaire,
        nom_benifiere,
        montant,
        nom_designation,
        compte_credite,
        montant_en_lettre,
        verificateur,
        status
    } = req.body;

    try {
        const newPayment = await query(
            `INSERT INTO payments (
                centre, numero_operation, numero_de_dossier, unite_monitaire, 
                nom_benifiere, montant, nom_designation, compte_credite, 
                montant_en_lettre, verificateur, status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
            [
                centre, numero_operation, numero_de_dossier, unite_monitaire,
                nom_benifiere, montant, nom_designation, compte_credite,
                montant_en_lettre, verificateur, status || 'Pending'
            ]
        );

        res.status(201).json(newPayment.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get All Payment Requests
export const getAllPayments = async (req, res) => {
    try {
        const payments = await query('SELECT * FROM payments ORDER BY id DESC');
        res.json(payments.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Payment By ID
export const getPaymentById = async (req, res) => {
    const { id } = req.params;
    try {
        const payment = await query('SELECT * FROM payments WHERE id = $1', [id]);
        if (payment.rows.length === 0) {
            return res.status(404).json({ message: 'Payment request not found' });
        }
        res.json(payment.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Payment Status
export const updatePaymentStatus = async (req, res) => {
    const { id } = req.params;
    const { status, verificateur } = req.body;

    try {
        const updatedPayment = await query(
            'UPDATE payments SET status = $1, verificateur = $2 WHERE id = $3 RETURNING *',
            [status, verificateur, id]
        );

        if (updatedPayment.rows.length === 0) {
            return res.status(404).json({ message: 'Payment request not found' });
        }

        res.json(updatedPayment.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
