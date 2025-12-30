import pkg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pkg;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PaymentR',
    password: 'Frank09',
    port: 5432,
});

async function initDb() {
    try {
        console.log('Reading BD.sql...');
        const bdBasePath = path.join(__dirname, '../../../BD.sql');
        let sql = fs.readFileSync(bdBasePath, 'utf8');

        // FIX: Remove UNIQUE from password in the SQL string
        console.log('Patching SQL: Removing UNIQUE from password...');
        sql = sql.replace(/password varchar \(255\) unique not null/gi, 'password varchar (255) not null');

        console.log('Executing SQL...');
        // Split by semicolon to run each statement, but better to just run the whole block
        // Postgres can handle multiple statements in one query call if they are separated by semicolons
        await pool.query(sql);

        console.log('Database initialized successfully!');

        // Seed Departements and Roles just in case
        console.log('Seeding initial data...');
        const depts = ['IT', 'Finance', 'Production', 'RH', 'Commercial', 'Logistique'];
        for (const d of depts) {
            await pool.query('INSERT INTO Departement (name) VALUES ($1) ON CONFLICT (name) DO NOTHING', [d]);
        }
        const roles = ['Requester', 'Verifier', 'Approver', 'Accountant'];
        for (const r of roles) {
            await pool.query('INSERT INTO Roles (name) VALUES ($1) ON CONFLICT (name) DO NOTHING', [r]);
        }
        console.log('Seeding complete!');

    } catch (err) {
        console.error('Error initializing database:', err.message);
        if (err.detail) console.error('Detail:', err.detail);
    } finally {
        pool.end();
    }
}

initDb();
