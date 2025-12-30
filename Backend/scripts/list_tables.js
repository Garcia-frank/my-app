import pkg from 'pg';

const { Pool } = pkg;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PaymentR',
    password: 'Frank09',
    port: 5432,
});

async function listTables() {
    try {
        const res = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        console.log('Tables:', res.rows.map(row => row.table_name));
    } catch (err) {
        console.error('Error listing tables:', err.message);
    } finally {
        pool.end();
    }
}

listTables();
