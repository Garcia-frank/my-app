import pkg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pkg;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PaymentR',
    password: 'Frank09',
    port: 5432,
});

async function testRegistration() {
    const name = 'Test';
    const sur_name = 'User';
    const email = 'test' + Date.now() + '@example.com';
    const password = 'password123';
    const departmentName = 'Finance';
    const roleName = 'Accountant';

    try {
        console.log('--- Diagnosis Start ---');

        // 1. Resolve Dept
        console.log('Resolving Department:', departmentName);
        const deptRes = await pool.query('SELECT * FROM Departement WHERE name = $1', [departmentName]);
        console.log('Dept count:', deptRes.rows.length);
        if (deptRes.rows.length === 0) {
            console.log('All Depts:', (await pool.query('SELECT * FROM Departement')).rows);
        }
        const deptId = deptRes.rows[0]?.id;

        // 2. Resolve Role
        console.log('Resolving Role:', roleName);
        const roleRes = await pool.query('SELECT * FROM Roles WHERE name = $1', [roleName]);
        console.log('Role count:', roleRes.rows.length);
        const roleId = roleRes.rows[0]?.id;

        // 3. Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Insert
        console.log('Attempting Insert...');
        const insertRes = await pool.query(
            'INSERT INTO users (name, sur_name, email, password, id_departement, id_roles) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [name, sur_name, email, hashedPassword, deptId, roleId]
        );
        console.log('Insert Success! ID:', insertRes.rows[0].id);

    } catch (err) {
        console.error('--- REGISTRATION FAILED ---');
        console.error('Error Code:', err.code);
        console.error('Error Detail:', err.detail);
        console.error('Error Message:', err.message);

        if (err.code === '23505') {
            console.log('Violation detected. Checking constraints...');
            const constraints = await pool.query(`
            SELECT conname 
            FROM pg_constraint 
            WHERE conrelid = 'users'::regclass;
        `);
            console.log('Constraints on users table:', constraints.rows.map(c => c.conname));
        }
    } finally {
        pool.end();
    }
}

testRegistration();
