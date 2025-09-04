import React, { useState } from 'react';
import { Paper, Typography, Box, TextField, Button, Alert, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  backgroundColor: '#1a1a1a',
  color: '#ffffff',
}));

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Support ticket submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ subject: '', message: '', priority: 'medium' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#C1FF72', marginBottom: 3 }}>
        Contact Support
      </Typography>

      <Grid container spacing={3}>
        {/* Contact Form */}
        <Grid item xs={12} md={8}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Submit a Support Ticket
            </Typography>
            
            {submitted && (
              <Alert severity="success" sx={{ marginBottom: 2 }}>
                Your support ticket has been submitted successfully!
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                margin="normal"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': { borderColor: '#555' },
                    '&:hover fieldset': { borderColor: '#C1FF72' },
                    '&.Mui-focused fieldset': { borderColor: '#C1FF72' },
                  },
                  '& .MuiInputLabel-root': { color: '#aaa' },
                }}
              />

              <TextField
                fullWidth
                select
                label="Priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                margin="normal"
                SelectProps={{
                  native: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': { borderColor: '#555' },
                    '&:hover fieldset': { borderColor: '#C1FF72' },
                    '&.Mui-focused fieldset': { borderColor: '#C1FF72' },
                  },
                  '& .MuiInputLabel-root': { color: '#aaa' },
                }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </TextField>

              <TextField
                fullWidth
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={6}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': { borderColor: '#555' },
                    '&:hover fieldset': { borderColor: '#C1FF72' },
                    '&.Mui-focused fieldset': { borderColor: '#C1FF72' },
                  },
                  '& .MuiInputLabel-root': { color: '#aaa' },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#C1FF72',
                  color: '#000',
                  marginTop: 2,
                  '&:hover': { backgroundColor: '#a8e055' },
                }}
              >
                Submit Ticket
              </Button>
            </form>
          </StyledPaper>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="body2" sx={{ color: '#C1FF72' }}>
                Email Support:
              </Typography>
              <Typography variant="body1">
                support@eventx.com
              </Typography>
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="body2" sx={{ color: '#C1FF72' }}>
                Phone Support:
              </Typography>
              <Typography variant="body1">
                +1 (555) 123-4567
              </Typography>
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="body2" sx={{ color: '#C1FF72' }}>
                Business Hours:
              </Typography>
              <Typography variant="body1">
                Monday - Friday: 9 AM - 6 PM EST
              </Typography>
            </Box>
          </StyledPaper>

          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Frequently Asked Questions
            </Typography>
            
            <Typography variant="body2" sx={{ marginBottom: 1, color: '#C1FF72' }}>
              Q: How do I reset my password?
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              A: Go to Settings → Account → Change Password
            </Typography>

            <Typography variant="body2" sx={{ marginBottom: 1, color: '#C1FF72' }}>
              Q: How do I create an event?
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              A: Click "Add Quick Event" or go to Manage Events → Create Event
            </Typography>

            <Typography variant="body2" sx={{ marginBottom: 1, color: '#C1FF72' }}>
              Q: How do I manage tickets?
            </Typography>
            <Typography variant="body2">
              A: Go to Booking & Tickets to view and manage all tickets
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactSupport;
