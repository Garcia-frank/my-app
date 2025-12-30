import { query } from '../config/Db.js';

// Get all departements
export const getAllDepartements = async (req, res) => {
    try {
        const result = await query('SELECT * FROM Departement ORDER BY id ASC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching departements:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
