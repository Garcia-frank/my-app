import { Card, CardContent, CardHeader, Box } from '@mui/material';
import { BarChart, PieChart } from '@mui/x-charts';
import { MonthlyDataPoint } from '../../types';
import PropTypes from 'prop-types';
MonthlyDataPoint.propTypes = {
  id: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

const MonthlyTrendsChart = ({ data }) => {
  return (
    <Card sx={{ height: '100%', width: '100%' }}>
      <CardHeader
        title="Monthly Payment Trends"
        sx={{
          '& .MuiCardHeader-title': {
            fontSize: '1.125rem',
            fontWeight: 600,
          },
        }}
      />
      <CardContent>
        <Box sx={{ height: 450, width: '100%' }}>
          <BarChart
            dataset={data}
            xAxis={[{
              scaleType: 'band',
              dataKey: 'month',
              tickLabelStyle: {
                fontSize: 12,
              },
              tickInterval: (value, index) => true,
            }]}
            series={[
              {
                dataKey: 'value',
                label: 'Amount',
                valueFormatter: (value) => `F${value.toLocaleString()}`,
                color: '#1976d2',
              },
            ]}
            slotProps={{
              legend: {
                hidden: true,
              },
            }}
            height={450}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

const StatusDistributionChart = ({ data }) => {
  // Colors for the pie chart slices (success, warning, error)
  const colors = ['#10B981', '#F59E0B', '#EF4444'];

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title="Payment Status Distribution"
        sx={{
          '& .MuiCardHeader-title': {
            fontSize: '1.125rem',
            fontWeight: 600,
          },
        }}
      />
      <CardContent>
        <Box sx={{ height: 450, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <PieChart
            series={[
              {
                data: data.map((item, index) => ({
                  id: item.label,
                  value: item.value,
                  label: item.label,
                  color: colors[index % colors.length],
                })),
                innerRadius: 40,
                outerRadius: 100,
                paddingAngle: 2,
                cornerRadius: 4,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              },
            ]}
            height={450}
            margin={{ top: 10, bottom: 10, left: 20, right: 20 }}
            slotProps={{
              legend: {
                direction: 'row',
                position: { vertical: 'bottom', horizontal: 'middle' },
                itemMarkWidth: 20,
                itemMarkHeight: 20,
                markGap: 8,
                itemGap: 16,
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export { MonthlyTrendsChart, StatusDistributionChart };