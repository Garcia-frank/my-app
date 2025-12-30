import { query } from '../config/Db.js';

// Get all audit logs
export const getAuditLogs = async (req, res) => {
    try {
        const result = await query('SELECT * FROM AuditLogs ORDER BY timestamp DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching audit logs:', error);
        // Fallback to empty array if table doesn't exist yet to prevent crash
        if (error.code === '42P01') { // undefined_table
            return res.json([]);
        }
        res.status(500).json({ message: 'Server Error' });
    }
};
