import React, { useState, useRef } from 'react';
import { Button, TextField, MenuItem, Checkbox, FormControlLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box } from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const NewPaymentRequest = () => {
  const [formData, setFormData] = useState({
    provisional: false,
    regularisation: false,
    regularisationText: '',
    costCentre: '',
    fileNumber: '',
    operationNumber: '',
    monetaryUnit: 'XAF',
    beneficiary: '',
    amountInWords: '',
    requestedBy: '',
    verifiedBy: '',
    approvedBy: '',
    accountantBy: '',
    verifyStatus: '',
    approveStatus: '',
    accountantStatus: '',
    operationDetails: [
      { designation: '', amount: 0 },
      { designation: '', amount: 0 },
      { designation: '', amount: 0 },
      { designation: '', amount: 0 }
    ],
    accountingRecords: [
      { creditedAccount: '', amount: 0 },
      { creditedAccount: '', amount: 0 },
      { creditedAccount: '', amount: 0 }
    ]
  });

  const formRef = useRef();
  const currentDate = new Date().toLocaleDateString();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...formData.operationDetails];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [field]: field === 'amount' ? parseFloat(value) || 0 : value
    };
    setFormData(prev => ({
      ...prev,
      operationDetails: updatedDetails
    }));
  };

  const handleAccountChange = (index, field, value) => {
    const updatedRecords = [...formData.accountingRecords];
    updatedRecords[index] = {
      ...updatedRecords[index],
      [field]: field === 'amount' ? parseFloat(value) || 0 : value
    };
    setFormData(prev => ({
      ...prev,
      accountingRecords: updatedRecords
    }));
  };

  const calculateTotal = () => {
    return formData.operationDetails.reduce((sum, item) => sum + (item.amount || 0), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleDownloadPDF = async () => {
    const input = formRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('payment-request.pdf');
  };

  const handleSaveAsDraft = () => {
    localStorage.setItem('draftPaymentRequest', JSON.stringify(formData));
    alert('Draft saved locally');
  };

  const handleCancel = () => {
    setFormData({
      ...formData,
      costCentre: '',
      fileNumber: '',
      operationNumber: '',
      beneficiary: '',
      amountInWords: '',
      requestedBy: '',
      verifiedBy: '',
      approvedBy: '',
      accountantBy: '',
      verifyStatus: '',
      approveStatus: '',
      accountantStatus: '',
      regularisationText: '',
      operationDetails: formData.operationDetails.map(() => ({ designation: '', amount: 0 })),
      accountingRecords: formData.accountingRecords.map(() => ({ creditedAccount: '', amount: 0 }))
    });
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 1100, margin: 'auto', fontSize: '0.95rem' }} ref={formRef}>
      <Typography variant="h5" align="center" gutterBottom>
        CAPITAL TRADING COMPANY
      </Typography>
      <Typography variant="subtitle2" align="right" sx={{ mb: 2 }}>Date: {currentDate}</Typography>

      <form onSubmit={handleSubmit}>
        {/* Checkboxes Section */}
        <Box display="flex" gap={4} mb={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.provisional}
                onChange={handleChange}
                name="provisional"
              />
            }
            label="PROVISIONAL"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.regularisation}
                onChange={handleChange}
                name="regularisation"
              />
            }
            label="RÉGULARISATION"
          />
        </Box>

        {formData.regularisation && (
          <TextField
            label="RÉGULARISATION DESCRIPTION"
            name="regularisationText"
            value={formData.regularisationText}
            onChange={handleChange}
            multiline
            minRows={3}
            fullWidth
            sx={{ mb: 3 }}
          />
        )}

        {/* Basic Information Section */}
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} mb={3}>
          <TextField label="COST/CENTRE" name="costCentre" value={formData.costCentre} onChange={handleChange} fullWidth />
          <TextField label="FILE NUMBER" name="fileNumber" value={formData.fileNumber} onChange={handleChange} fullWidth />
          <TextField label="OPERATION NUMBER" name="operationNumber" value={formData.operationNumber} onChange={handleChange} fullWidth />
          <TextField label="MONETARY UNIT" name="monetaryUnit" value={formData.monetaryUnit} onChange={handleChange} fullWidth placeholder="Enter currency (XAF)" />
        </Box>

        <TextField label="BENEFICIARY" name="beneficiary" value={formData.beneficiary} onChange={handleChange} fullWidth sx={{ mb: 3 }} />

        {/* Operation Details Table */}
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>DESIGNATION</TableCell>
                <TableCell align="right">AMOUNT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.operationDetails.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField fullWidth value={row.designation} onChange={(e) => handleDetailChange(index, 'designation', e.target.value)} placeholder="Enter designation" />
                  </TableCell>
                  <TableCell>
                    <TextField fullWidth type="number" value={row.amount} onChange={(e) => handleDetailChange(index, 'amount', e.target.value)} placeholder="0" />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell><strong>TOTAL:</strong></TableCell>
                <TableCell><strong>{formData.monetaryUnit} {calculateTotal().toLocaleString()}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Accounting Records Table */}
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>CREDITED ACCOUNT</TableCell>
                <TableCell align="right">AMOUNT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.accountingRecords.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField fullWidth value={row.creditedAccount} onChange={(e) => handleAccountChange(index, 'creditedAccount', e.target.value)} placeholder="Enter account" />
                  </TableCell>
                  <TableCell>
                    <TextField fullWidth type="number" value={row.amount} onChange={(e) => handleAccountChange(index, 'amount', e.target.value)} placeholder="0" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TextField label="AMOUNT IN WORD" name="amountInWords" value={formData.amountInWords} onChange={handleChange} fullWidth sx={{ mb: 3 }} />

        {/* Approval Section */}
        <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={3} mb={3}>
          <Box>
            <TextField label="VERIFIED BY" name="verifiedBy" value={formData.verifiedBy} onChange={handleChange} fullWidth />
            <TextField select label="STATUS" name="verifyStatus" value={formData.verifyStatus} onChange={handleChange} fullWidth sx={{ mt: 1 }}>
              <MenuItem value="">Select status</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </TextField>
          </Box>

          <Box>
            <TextField label="APPROVED BY" name="approvedBy" value={formData.approvedBy} onChange={handleChange} fullWidth />
            <TextField select label="STATUS" name="approveStatus" value={formData.approveStatus} onChange={handleChange} fullWidth sx={{ mt: 1 }}>
              <MenuItem value="">Select status</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </TextField>
          </Box>

          <Box>
            <TextField label="ACCOUNTANT BY" name="accountantBy" value={formData.accountantBy} onChange={handleChange} fullWidth />
            <TextField select label="STATUS" name="accountantStatus" value={formData.accountantStatus} onChange={handleChange} fullWidth sx={{ mt: 1 }}>
              <MenuItem value="">Select status</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </TextField>
          </Box>
        </Box>

        <TextField label="REQUESTED BY" name="requestedBy" value={formData.requestedBy} onChange={handleChange} fullWidth sx={{ mb: 3 }} placeholder="Enter your name" />

        <Box display="flex" justifyContent="space-between" mt={4}>
          <Box>
            <Button variant="contained" component="label" sx={{ mr: 2 }}>
              Upload PDF
              <input type="file" hidden accept=".pdf" />
            </Button>
            <Button variant="contained" onClick={handleDownloadPDF} sx={{ mr: 2 }}>
              Download PDF
            </Button>
          </Box>
          <Box>
            <Button variant="outlined" sx={{ mr: 2 }} onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" sx={{ mr: 2 }} onClick={handleSaveAsDraft}>
              Save as Draft
            </Button>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Submit for Approval
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default NewPaymentRequest;
