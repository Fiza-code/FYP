import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  IconButton,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { fetchSizeRecommendation, clearSizeRecommendation } from '../Store/productsSlice';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 450 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: 'none',
};

const SizeFinderModal = ({ open, onClose, productId }) => {
  const dispatch = useDispatch();
  const { sizeRecommendation, sizeStatus, sizeError } = useSelector((state) => state.products);

  const [measurements, setMeasurements] = useState({
    height: '',
    weight: '',
    chest: '',
    waist: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeasurements((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation to ensure some data is entered
    if (!measurements.height || !measurements.weight) {
        alert("Please enter at least height and weight.");
        return;
    }
    dispatch(fetchSizeRecommendation({ productId, measurements }));
  };

  // Clear recommendation state when modal is closed
  const handleClose = () => {
    // We no longer clear the recommendation here. The parent component
    // will display it and clear it when the user navigates away.
    onClose();
  };

  const renderContent = () => {
    if (sizeStatus === 'loading') {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Finding your perfect fit...</Typography>
        </Box>
      );
    }

    if (sizeStatus === 'succeeded' && sizeRecommendation) {
      return (
        <Box sx={{ textAlign: 'center', my: 2 }}>
          <Typography variant="h5" gutterBottom>
            We Recommend Size:
          </Typography>
          <Typography variant="h2" color="primary" fontWeight="bold">
            {sizeRecommendation.recommendedSize}
          </Typography>
          {sizeRecommendation.reasoning && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {sizeRecommendation.reasoning}
            </Typography>
          )}
          <Button onClick={handleClose} variant="contained" sx={{ mt: 3 }}>
            Done
          </Button>
        </Box>
      );
    }

    if (sizeStatus === 'failed') {
        return <Alert severity="error">Could not fetch recommendation. {sizeError}</Alert>
    }

    // The initial form
    return (
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Enter your measurements to help us find the best fit for you.
        </Typography>
        <TextField
          label="Height (cm)"
          name="height"
          value={measurements.height}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          type="number"
          required
        />
        <TextField
          label="Weight (kg)"
          name="weight"
          value={measurements.weight}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          type="number"
          required
        />
        <TextField
          label="Chest (cm, optional)"
          name="chest"
          value={measurements.chest}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, py: 1.5 }}>
          Find My Size
        </Button>
      </Box>
    );
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" sx={{ mb: 1, textAlign: 'center' }}>
          AI Fit Assistant
        </Typography>
        {renderContent()}
      </Box>
    </Modal>
  );
};

export default SizeFinderModal;
