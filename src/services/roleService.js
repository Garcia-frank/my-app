import api from './api';

const getRoles = async () => {
    const response = await api.get('/roles');
    return response.data;
};

// Placeholder for future implementation
const createRole = async (roleData) => {
    // const response = await api.post('/roles', roleData);
    // return response.data;
    console.warn("Create Role not implemented in backend yet");
    return roleData;
};

const updateRole = async (id, roleData) => {
    // const response = await api.put(`/roles/${id}`, roleData);
    // return response.data;
    console.warn("Update Role not implemented in backend yet");
    return roleData;
};

const roleService = {
    getRoles,
    createRole,
    updateRole
};

export default roleService;
