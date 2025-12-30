import React, { useState, useRef } from 'react';
import {
  Button, TextField, MenuItem, Checkbox, FormControlLabel, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, Box, Grid, Divider, IconButton, alpha
} from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveIcon from '@mui/icons-material/Save';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const NewPaymentRequest = () => {
  const [formData, setFormData] = useState({
    costCentre: '',
    operationNumber: '',
    fileNumber: '',
    monetaryUnit: 'USD',
    beneficiary: '',
    operationDetails: [{ designation: '', amount: 0 }],
    accountingRecords: [{ creditedAccount: '', amount: 0 }],
    amountInWords: '',
    verifiedBy: '',
  });

  const formRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addItem = (type) => {
    const key = type === 'operation' ? 'operationDetails' : 'accountingRecords';
    setFormData({
      ...formData,
      [key]: [...formData[key], type === 'operation' ? { designation: '', amount: 0 } : { creditedAccount: '', amount: 0 }]
    });
  };

  const removeItem = (type, index) => {
    const key = type === 'operation' ? 'operationDetails' : 'accountingRecords';
    const newList = [...formData[key]];
    newList.splice(index, 1);
    setFormData({ ...formData, [key]: newList });
  };

  const handleArrayInputChange = (type, index, field, value) => {
    const key = type === 'operation' ? 'operationDetails' : 'accountingRecords';
    const newList = [...formData[key]];
    newList[index][field] = field === 'amount' ? parseFloat(value) || 0 : value;
    setFormData({ ...formData, [key]: newList });
  };

  const calculateTotal = () => {
    return formData.operationDetails.reduce((sum, item) => sum + (item.amount || 0), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/payments', {
        centre: formData.costCentre,
        numero_operation: formData.operationNumber,
        numero_de_dossier: formData.fileNumber,
        unite_monitaire: formData.monetaryUnit,
        nom_benifiere: formData.beneficiary,
        montant: calculateTotal(),
        nom_designation: formData.operationDetails[0]?.designation,
        compte_credite: formData.accountingRecords[0]?.creditedAccount,
        montant_en_lettre: formData.amountInWords,
        verificateur: formData.verifiedBy,
        status: 'Pending'
      });
      if (response.data) alert('Successfully submitted!');
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: 'background.default', minHeight: '100vh' }}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <PageTitle title="New Payment Request" subtitle="Initialize a secure disbursement request for approval" />

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid container spacing={4}>
            {/* Left Panel: Primary Details */}
            <Grid item xs={12} lg={4}>
              <Paper variant="glass" sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Basic Information</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Cost Centre" name="costCentre" value={formData.costCentre} onChange={handleInputChange} variant="outlined" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="Operation #" name="operationNumber" value={formData.operationNumber} onChange={handleInputChange} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="File #" name="fileNumber" value={formData.fileNumber} onChange={handleInputChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField select fullWidth label="Monetary Unit" name="monetaryUnit" value={formData.monetaryUnit} onChange={handleInputChange}>
                      <MenuItem value="USD">USD - Dollar</MenuItem>
                      <MenuItem value="EUR">EUR - Euro</MenuItem>
                      <MenuItem value="XAF">XAF - CFA Franc</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Beneficiary Name" name="beneficiary" value={formData.beneficiary} onChange={handleInputChange} />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 4, bgcolor: alpha('#3b82f6', 0.05), p: 3, borderRadius: 2 }}>
                  <Typography variant="caption" display="block" color="text.secondary" fontWeight="bold" gutterBottom>TOTAL AMOUNT</Typography>
                  <Typography variant="h3" fontWeight="900" color="primary.main">
                    {formData.monetaryUnit} {calculateTotal().toLocaleString()}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Right Panel: Tables and Submission */}
            <Grid item xs={12} lg={8}>
              <Paper variant="glass" sx={{ p: 4, mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">Operation Details</Typography>
                  <Button startIcon={<AddCircleOutlineIcon />} onClick={() => addItem('operation')} size="small">Add Row</Button>
                </Box>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Designation</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell width={50}></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {formData.operationDetails.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ border: 'none' }}>
                            <TextField fullWidth size="small" value={item.designation} onChange={(e) => handleArrayInputChange('operation', index, 'designation', e.target.value)} />
                          </TableCell>
                          <TableCell sx={{ border: 'none' }} align="right">
                            <TextField type="number" size="small" value={item.amount} onChange={(e) => handleArrayInputChange('operation', index, 'amount', e.target.value)} />
                          </TableCell>
                          <TableCell sx={{ border: 'none' }}>
                            <IconButton onClick={() => removeItem('operation', index)} color="error"><DeleteOutlineIcon /></IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

              <Paper variant="glass" sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Accounting & Verification</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField fullWidth multiline rows={2} label="Amount in Words" name="amountInWords" value={formData.amountInWords} onChange={handleInputChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Verified By" name="verifiedBy" value={formData.verifiedBy} onChange={handleInputChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField select fullWidth label="Credited Account" value={formData.accountingRecords[0].creditedAccount} onChange={(e) => handleArrayInputChange('accounting', 0, 'creditedAccount', e.target.value)}>
                      <MenuItem value="A001">Main Operations</MenuItem>
                      <MenuItem value="A002">Reserve Fund</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 6, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button variant="outlined" startIcon={<SaveIcon />} size="large">Save Draft</Button>
                  <Button type="submit" variant="contained" color="secondary" startIcon={<CloudUploadIcon />} size="large" sx={{ px: 6, borderRadius: '50px' }}>
                    Submit Request
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Box>
  );
};

const PageTitle = ({ title, subtitle }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h3" fontWeight="900" gutterBottom>{title}</Typography>
    <Typography variant="h6" color="text.secondary">{subtitle}</Typography>
  </Box>
);

export default NewPaymentRequest;
