import pkg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const { Pool } = pkg;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function run() {
    try {
        console.log('Connecting to database...');

        // 1. Remove UNIQUE constraint from password
        console.log('Removing UNIQUE constraint from password...');
        // We need to find the constraint name first, but if it was created as UNIQUE in the table definition, 
        // PostgreSQL usually names it "users_password_key"
        try {
            await pool.query('ALTER TABLE users DROP CONSTRAINT IF EXISTS users_password_key');
            console.log('UNIQUE constraint removed (or already gone).');
        } catch (e) {
            console.log('Note: users_password_key might not exist or name is different. Skipping constraint drop.');
        }

        // 2. Seed Departements
        console.log('Seeding Departements...');
        const depts = ['IT', 'Finance', 'Production', 'RH', 'Commercial', 'Logistique'];
        for (const dept of depts) {
            await pool.query('INSERT INTO Departement (name) VALUES ($1) ON CONFLICT (name) DO NOTHING', [dept]);
        }

        // 3. Seed Roles
        console.log('Seeding Roles...');
        const roles = ['Requester', 'Verifier', 'Approver', 'Accountant'];
        for (const role of roles) {
            await pool.query('INSERT INTO Roles (name) VALUES ($1) ON CONFLICT (name) DO NOTHING', [role]);
        }

        console.log('Database fix complete!');
        process.exit(0);
    } catch (err) {
        console.error('Error fixing database:', err);
        process.exit(1);
    }
}

run();
