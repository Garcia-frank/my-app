import pkg from 'pg';

const { Pool } = pkg;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PaymentR',
    password: 'Frank09',
    port: 5432,
});

const sqlStatements = [
    `CREATE TABLE IF NOT EXISTS Departement(
    id serial primary key,
    name varchar (255) unique not null
  )`,
    `CREATE TABLE IF NOT EXISTS Roles(
    id serial primary key,
    name varchar (255) unique not null
  )`,
    `CREATE TABLE IF NOT EXISTS Users(   
    id serial primary key,
    name varchar (255),
    sur_name varchar (255),
    email varchar (255) unique not null,
    password varchar (255) not null,
    id_departement int references departement(id),
    id_roles int references roles(id)
  )`,
    `CREATE TABLE IF NOT EXISTS type_of_payment(
    id serial primary key,
    name varchar (255)
  )`,
    `CREATE TABLE IF NOT EXISTS payments(
    id serial primary key,
    centre varchar (255),
    numero_operation varchar(255),
    numero_de_dossier varchar(255),
    unite_monitaire numeric,
    nom_benifiere varchar (255),
    montant decimal (10,2) not null,
    nom_designation varchar(255),
    compte_credite varchar(255),
    montant_en_lettre varchar(255) not null,
    verificateur varchar(255),
    status varchar(255)
  )`
];

async function run() {
    try {
        for (const sql of sqlStatements) {
            console.log('Running:', sql.split('\n')[0].trim(), '...');
            try {
                await pool.query(sql);
            } catch (e) {
                console.error('Error in statement:', e.message);
            }
        }

        console.log('Seeding data...');
        const depts = ['IT', 'Finance', 'Production', 'RH', 'Commercial', 'Logistique'];
        for (const d of depts) {
            await pool.query('INSERT INTO Departement (name) VALUES ($1) ON CONFLICT (name) DO NOTHING', [d]);
        }
        const roles = ['Requester', 'Verifier', 'Approver', 'Accountant'];
        for (const r of roles) {
            await pool.query('INSERT INTO Roles (name) VALUES ($1) ON CONFLICT (name) DO NOTHING', [r]);
        }

        console.log('Database sync complete!');
    } catch (err) {
        console.error('Fatal error:', err.message);
    } finally {
        pool.end();
    }
}

run();
