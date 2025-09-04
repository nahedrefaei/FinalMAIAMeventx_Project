import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  TextField,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import ShareIcon from '@mui/icons-material/Share';
import CampaignIcon from '@mui/icons-material/Campaign';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  backgroundColor: '#1a1a1a',
  color: '#ffffff',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#2a2a2a',
  color: '#ffffff',
  margin: theme.spacing(1),
  '&:hover': {
    backgroundColor: '#3a3a3a',
  },
}));

const Marketing = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Web Dev Summit Promotion',
      type: 'Email',
      status: 'Active',
      reach: 1250,
      clicks: 89,
      conversions: 23
    },
    {
      id: 2,
      name: 'Design Workshop Social Media',
      type: 'Social',
      status: 'Completed',
      reach: 2100,
      clicks: 156,
      conversions: 34
    },
    {
      id: 3,
      name: 'Early Bird Special',
      type: 'Email',
      status: 'Draft',
      reach: 0,
      clicks: 0,
      conversions: 0
    }
  ]);

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'Email',
    subject: '',
    content: ''
  });

  const handleCreateCampaign = () => {
    const campaign = {
      id: Date.now(),
      ...newCampaign,
      status: 'Draft',
      reach: 0,
      clicks: 0,
      conversions: 0
    };
    setCampaigns([...campaigns, campaign]);
    setNewCampaign({ name: '', type: 'Email', subject: '', content: '' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return '#4CAF50';
      case 'Completed':
        return '#2196F3';
      case 'Draft':
        return '#FF9800';
      default:
        return '#9E9E9E';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Email':
        return <EmailIcon sx={{ color: '#C1FF72' }} />;
      case 'Social':
        return <ShareIcon sx={{ color: '#2196F3' }} />;
      default:
        return <CampaignIcon sx={{ color: '#FF9800' }} />;
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#C1FF72', marginBottom: 3 }}>
        Marketing
      </Typography>

      {/* Campaign Statistics */}
      <Grid container spacing={3} sx={{ marginBottom: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ color: '#C1FF72' }}>
                    {campaigns.filter(c => c.status === 'Active').length}
                  </Typography>
                  <Typography variant="body2">
                    Active Campaigns
                  </Typography>
                </Box>
                <CampaignIcon sx={{ fontSize: 40, color: '#C1FF72' }} />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ color: '#4CAF50' }}>
                    {campaigns.reduce((sum, c) => sum + c.reach, 0).toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    Total Reach
                  </Typography>
                </Box>
                <TrendingUpIcon sx={{ fontSize: 40, color: '#4CAF50' }} />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ color: '#2196F3' }}>
                    {campaigns.reduce((sum, c) => sum + c.clicks, 0)}
                  </Typography>
                  <Typography variant="body2">
                    Total Clicks
                  </Typography>
                </Box>
                <ShareIcon sx={{ fontSize: 40, color: '#2196F3' }} />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ color: '#FF9800' }}>
                    {campaigns.reduce((sum, c) => sum + c.conversions, 0)}
                  </Typography>
                  <Typography variant="body2">
                    Conversions
                  </Typography>
                </Box>
                <EmailIcon sx={{ fontSize: 40, color: '#FF9800' }} />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Create Campaign */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Create New Campaign
            </Typography>
            
            <TextField
              fullWidth
              label="Campaign Name"
              value={newCampaign.name}
              onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
              margin="normal"
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
              label="Campaign Type"
              value={newCampaign.type}
              onChange={(e) => setNewCampaign({ ...newCampaign, type: e.target.value })}
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
              <option value="Email">Email Campaign</option>
              <option value="Social">Social Media</option>
              <option value="SMS">SMS Campaign</option>
            </TextField>

            <TextField
              fullWidth
              label="Subject/Title"
              value={newCampaign.subject}
              onChange={(e) => setNewCampaign({ ...newCampaign, subject: e.target.value })}
              margin="normal"
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
              label="Content"
              value={newCampaign.content}
              onChange={(e) => setNewCampaign({ ...newCampaign, content: e.target.value })}
              margin="normal"
              multiline
              rows={4}
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
              variant="contained"
              onClick={handleCreateCampaign}
              sx={{
                backgroundColor: '#C1FF72',
                color: '#000',
                marginTop: 2,
                '&:hover': { backgroundColor: '#a8e055' },
              }}
              disabled={!newCampaign.name || !newCampaign.subject}
            >
              Create Campaign
            </Button>
          </StyledPaper>
        </Grid>

        {/* Campaign List */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Recent Campaigns
            </Typography>
            
            <List>
              {campaigns.map((campaign) => (
                <ListItem
                  key={campaign.id}
                  sx={{
                    backgroundColor: '#2a2a2a',
                    borderRadius: 1,
                    marginBottom: 1,
                  }}
                  secondaryAction={
                    <Box>
                      <IconButton sx={{ color: '#C1FF72' }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton sx={{ color: '#F44336' }}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemIcon>
                    {getTypeIcon(campaign.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1">
                          {campaign.name}
                        </Typography>
                        <Chip
                          label={campaign.status}
                          size="small"
                          sx={{
                            backgroundColor: getStatusColor(campaign.status),
                            color: '#fff',
                            fontSize: '0.7rem'
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" sx={{ color: '#aaa' }}>
                        Reach: {campaign.reach.toLocaleString()} | 
                        Clicks: {campaign.clicks} | 
                        Conversions: {campaign.conversions}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Marketing;
