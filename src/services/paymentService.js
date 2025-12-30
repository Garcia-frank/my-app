import api from './api';

// Helper to map backend fields to frontend expected shape
const mapPaymentToFrontend = (p) => ({
    id: p.id, // ID is number in DB usually, string in mock. JS handles it fine usually but be aware.
    requester: p.verificateur || 'Unknown', // Mapping verificateur to requester
    amount: parseFloat(p.montant),
    beneficiary: p.nom_benifiere,
    purpose: p.nom_designation,
    status: p.status ? p.status.toLowerCase() : 'pending',
    submittedDate: p.created_at ? new Date(p.created_at).toISOString().split('T')[0] : '2024-01-01', // Fallback date
    // Add other fields if needed for specific views
    file: p.numero_de_dossier // Example mapping
});

const getAllPayments = async () => {
    const response = await api.get('/payments');
    return response.data.map(mapPaymentToFrontend);
};

const createPayment = async (paymentData) => {
    // Map frontend data back to backend snake_case if this was a full form
    // For now assuming the NewRequest page sends what backend expects or we adjust here
    const response = await api.post('/payments', paymentData);
    return response.data;
};

const updatePaymentStatus = async (id, status, verificateur) => {
    const response = await api.put(`/payments/${id}`, { status, verificateur });
    return mapPaymentToFrontend(response.data);
};

const paymentService = {
    getAllPayments,
    createPayment,
    updatePaymentStatus,
};

export default paymentService;
