import pkg from 'pg';

const { Pool } = pkg;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PaymentR',
    password: 'Frank09',
    port: 5432,
});

async function run() {
    try {
        console.log('Connecting to database...');

        // 1. Remove UNIQUE constraint from password
        console.log('Checking for unique constraint on password...');
        try {
            await pool.query('ALTER TABLE users DROP CONSTRAINT IF EXISTS users_password_key');
            console.log('Constraint removed if it existed.');
        } catch (e) {
            console.log('Error dropping constraint:', e.message);
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
