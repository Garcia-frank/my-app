import { query } from '../config/Db.js';

export const createDepartement = async (name) => {
  const { rows } = await query(
    'INSERT INTO departement (name) VALUES ($1) RETURNING *',
    [name]
  );
  return rows[0];
};

export const getAllDepartements = async () => {
  const { rows } = await query('SELECT * FROM departement');
  return rows;
};

export const getDepartementById = async (id) => {
  const { rows } = await query('SELECT * FROM departement WHERE id = $1', [id]);
  return rows[0];
};

export const updateDepartement = async (id, name) => {
  const { rows } = await query(
    'UPDATE departement SET name = $1 WHERE id = $2 RETURNING *',
    [name, id]
  );
  return rows[0];
};

export const deleteDepartement = async (id) => {
  await query('DELETE FROM departement WHERE id = $1', [id]);
};