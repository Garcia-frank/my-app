import { Card, CardContent, Box, Typography } from '@mui/material';

const StatusCard = ({ 
  icon, 
  iconColor, 
  iconBgColor, 
  title, 
  value,
  sx 
}) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        width: "100%",
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        },
        ...sx
      }}
    >
      <CardContent sx={{ flex: 1, display: 'flex', alignItems: 'center', p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: iconBgColor,
            color: iconColor,
            borderRadius: '50%',
            p: 1.5,
            mr: 2,
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h5" component="div" fontWeight="bold">
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatusCard;