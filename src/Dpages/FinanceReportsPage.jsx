import { Grid } from '@mui/material';
import PageHeader from '../components/ui/PageHeader';
import { MonthlyTrendsChart, StatusDistributionChart } from '../components/reports/ChartCards';
import FinancialSummary from '../components/reports/FinancialSummary';
import { monthlyData, statusDistribution, financialSummary } from '../mockData';
import { fontSize } from '@mui/system';

const FinanceReports = () => {
  return (
    <div>
      <PageHeader
        title="Finance Reports"
        subtitle="Financial analytics and reporting"
      />
      
      <Grid container spacing={5} style={{ marginBottom: '4rem' }}>
        <Grid item xs={12} md={6}>
          <MonthlyTrendsChart data={monthlyData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatusDistributionChart data={statusDistribution} />
        </Grid>
      </Grid>
      
      <FinancialSummary data={financialSummary} />  
    </div>
  );
};

export default FinanceReports;