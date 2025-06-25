import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Box,
  Alert,
} from '@mui/material';
import PageHeader from '../components/ui/PageHeader';

function NewPaymentRequest() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    beneficiary: '',
    amount: '',
    purpose: '',
    description: '',
    category: 'operational',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const categories = [
    { value: 'operational', label: 'Operational Expense' },
    { value: 'capital', label: 'Capital Expense' },
    { value: 'travel', label: 'Travel & Entertainment' },
    { value: 'supplies', label: 'Office Supplies' },
    { value: 'other', label: 'Other' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.beneficiary || !formData.amount || !formData.purpose) {
      setError('Please fill in all required fields');
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      navigate('/my-requests');
    }, 2000);
  };

  return (
    <>
      <PageHeader
        title="New Payment Request"
        subtitle="Create a new payment request for approval"
      />

      <Card>
        <CardContent>
          {error && (
            <Alert severity="error\" sx={{ mb: 3 }}>{error}</Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Payment request created successfully! Redirecting...
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Beneficiary Name"
                  name="beneficiary"
                  value={formData.beneficiary}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: <Box component="span\" sx={{ mr: 1 }}>$</Box>
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Additional Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={success}
                  >
                    Submit Request
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default NewPaymentRequest;