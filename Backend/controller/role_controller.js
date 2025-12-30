import { query } from '../config/Db.js';

// Get all roles
export const getAllRoles = async (req, res) => {
    try {
        const result = await query('SELECT * FROM Roles ORDER BY id ASC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
