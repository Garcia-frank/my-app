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

        // Check tables
        const tables = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        console.log('Tables in DB:', tables.rows.map(r => r.table_name));

        if (!tables.rows.find(r => r.table_name.toLowerCase() === 'departement')) {
            console.log('Creating Departement table...');
            await pool.query('CREATE TABLE Departement (id serial primary key, name varchar(255) unique not null)');
        }
        if (!tables.rows.find(r => r.table_name.toLowerCase() === 'roles')) {
            console.log('Creating Roles table...');
            await pool.query('CREATE TABLE Roles (id serial primary key, name varchar(255) unique not null)');
        }

        // Seed Departements
        console.log('Seeding Departements...');
        const depts = ['IT', 'Finance', 'Production', 'RH', 'Commercial', 'Logistique'];
        for (const dept of depts) {
            await pool.query('INSERT INTO Departement (name) VALUES ($1) ON CONFLICT (name) DO NOTHING', [dept]);
        }

        // Seed Roles
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
