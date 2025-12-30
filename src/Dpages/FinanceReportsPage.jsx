import { Grid, CircularProgress, Box } from '@mui/material';
import PageHeader from '../components/ui/PageHeader';
import { MonthlyTrendsChart, StatusDistributionChart } from '../components/reports/ChartCards';
import FinancialSummary from '../components/reports/FinancialSummary';
import { useState, useEffect } from 'react';
import paymentService from '../services/paymentService';
import { fontSize } from '@mui/system';

const FinanceReports = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    monthlyData: [],
    statusDistribution: [],
    financialSummary: {
      totalApproved: 0,
      pendingApproval: 0,
      rejected: 0,
      totalProcessed: 0,
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payments = await paymentService.getAllPayments();

        // Calculate Financial Summary
        const summary = {
          totalApproved: payments.filter(p => p.status === 'approved').reduce((acc, curr) => acc + curr.amount, 0),
          pendingApproval: payments.filter(p => p.status === 'pending').reduce((acc, curr) => acc + curr.amount, 0),
          rejected: payments.filter(p => p.status === 'rejected').reduce((acc, curr) => acc + curr.amount, 0),
          totalProcessed: payments.reduce((acc, curr) => acc + curr.amount, 0)
        };

        // Calculate Status Distribution
        const dist = [
          { label: 'Approved', value: payments.filter(p => p.status === 'approved').length },
          { label: 'Pending', value: payments.filter(p => p.status === 'pending').length },
          { label: 'Rejected', value: payments.filter(p => p.status === 'rejected').length },
        ];

        // Calculate Monthly Data (Mock logic or aggreg based on date if available)
        // Since dates might be sparse, we use a fixed list of months and fill
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthly = months.map(m => {
          // Simple matching if date string contains month (YYYY-MM-DD)
          // This is naive, relies on date parsing or month extraction
          // Ideally use a library like date-fns, but for dependency-free:
          const monthIndex = months.indexOf(m);
          const val = payments.filter(p => {
            const d = new Date(p.submittedDate);
            return d.getMonth() === monthIndex;
          }).reduce((acc, curr) => acc + curr.amount, 0);
          return { month: m, value: val };
        });

        setData({
          monthlyData: monthly,
          statusDistribution: dist,
          financialSummary: summary
        });

      } catch (error) {
        console.error("Failed to fetch report data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <PageHeader
        title="Finance Reports"
        subtitle="Financial analytics and reporting"
      />

      <Grid container spacing={5} style={{ marginBottom: '4rem' }}>
        <Grid item xs={12}>
          <MonthlyTrendsChart data={data.monthlyData} />
        </Grid>
        <Grid item xs={12}>
          <StatusDistributionChart data={data.statusDistribution} />
        </Grid>
      </Grid>

      <FinancialSummary data={data.financialSummary} />
    </div>
  );
};

export default FinanceReports;