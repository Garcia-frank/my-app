import { query } from '../config/Db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register User
export const registerUser = async (req, res) => {
    const { name, sur_name, email, password, id_departement, id_roles } = req.body;

    if (!name || !sur_name || !email || !password) {
        return res.status(400).json({ message: 'Please add all required fields' });
    }

    try {
        // Resolve department and role names to IDs if needed
        let resolvedDeptId = id_departement;
        let resolvedRoleId = id_roles;

        // If the frontend sends names instead of IDs (common during development)
        if (req.body.department && !resolvedDeptId) {
            const deptRes = await query('SELECT id FROM Departement WHERE name = $1', [req.body.department]);
            if (deptRes.rows.length > 0) resolvedDeptId = deptRes.rows[0].id;
        }
        if (req.body.role && !resolvedRoleId) {
            const roleRes = await query('SELECT id FROM Roles WHERE name = $1', [req.body.role]);
            if (roleRes.rows.length > 0) resolvedRoleId = roleRes.rows[0].id;
        }

        // Check if user exists
        const userExists = await query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'A user with this email already exists.' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = await query(
            'INSERT INTO users (name, sur_name, email, password, id_departement, id_roles) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, sur_name, email, hashedPassword, resolvedDeptId || null, resolvedRoleId || null]
        );

        if (newUser.rows[0]) {
            res.status(201).json({
                _id: newUser.rows[0].id,
                name: newUser.rows[0].name,
                sur_name: newUser.rows[0].sur_name,
                email: newUser.rows[0].email,
                token: generateToken(newUser.rows[0].id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data provided' });
        }
    } catch (error) {
        console.error('REGISTRATION_ERROR:', error);
        res.status(500).json({ message: 'Registration failed due to a server error. Please contact admin.' });
    }
};

// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length > 0 && (await bcrypt.compare(password, user.rows[0].password))) {
            res.json({
                _id: user.rows[0].id,
                name: user.rows[0].name,
                sur_name: user.rows[0].sur_name,
                email: user.rows[0].email,
                id_departement: user.rows[0].id_departement,
                id_roles: user.rows[0].id_roles,
                token: generateToken(user.rows[0].id),
            });
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const result = await query(`
            SELECT u.id, u.name, u.sur_name, u.email, u.id_departement, u.id_roles,
                   r.name as role, d.name as department
            FROM users u
            LEFT JOIN Roles r ON u.id_roles = r.id
            LEFT JOIN Departement d ON u.id_departement = d.id
            ORDER BY u.id ASC
        `);
        // Map to match frontend expectations (handling status if missing)
        const users = result.rows.map(user => ({
            ...user,
            status: 'active', // Default to active as column might not exist yet
            lastLogin: 'N/A'  // Placeholder
        }));
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update user
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, sur_name, email, id_departement, id_roles } = req.body;

    try {
        const result = await query(
            'UPDATE users SET name = $1, sur_name = $2, email = $3, id_departement = $4, id_roles = $5 WHERE id = $6 RETURNING *',
            [name, sur_name, email, id_departement, id_roles, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete user (or deactivate)
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        // Hard delete for now, or could toggle status
        constresult = await query('DELETE FROM users WHERE id = $1', [id]);
        res.json({ message: 'User removed' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
