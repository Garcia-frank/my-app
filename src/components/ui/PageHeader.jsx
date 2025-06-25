import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const PageHeader = ({ title, subtitle, buttonText, onButtonClick, sx }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' },
        flexDirection: { xs: 'column', sm: 'row' },
        mb: 3,
        ...sx
      }}
    >
      <Box>
        <Typography variant="h4" component="h1" gutterBottom={!!subtitle} fontWeight="bold">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body1" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
      
      {buttonText && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onButtonClick}
          sx={{ mt: { xs: 2, sm: 0 } }}
        >
          {buttonText}
        </Button>
      )}
    </Box>
  );
};

export default PageHeader;