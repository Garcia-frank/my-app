import api from './api';

const getAuditLogs = async () => {
    const response = await api.get('/audit');
    return response.data;
};

const auditService = {
    getAuditLogs,
};

export default auditService;
