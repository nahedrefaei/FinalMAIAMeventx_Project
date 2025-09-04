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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FolderIcon from '@mui/icons-material/Folder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';

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
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#3a3a3a',
  },
}));

const EventCategories = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Technology',
      description: 'Tech conferences, workshops, and seminars',
      color: '#2196F3',
      eventCount: 5
    },
    {
      id: 2,
      name: 'Business',
      description: 'Corporate events, networking, and meetings',
      color: '#4CAF50',
      eventCount: 3
    },
    {
      id: 3,
      name: 'Entertainment',
      description: 'Concerts, shows, and entertainment events',
      color: '#FF5722',
      eventCount: 7
    },
    {
      id: 4,
      name: 'Education',
      description: 'Educational workshops and training sessions',
      color: '#9C27B0',
      eventCount: 2
    },
    {
      id: 5,
      name: 'Sports',
      description: 'Sports events and fitness activities',
      color: '#FF9800',
      eventCount: 4
    },
    {
      id: 6,
      name: 'Arts & Culture',
      description: 'Art exhibitions, cultural events, and festivals',
      color: '#E91E63',
      eventCount: 6
    }
  ]);

  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#2196F3'
  });

  const colors = [
    '#2196F3', '#4CAF50', '#FF5722', '#9C27B0', 
    '#FF9800', '#E91E63', '#795548', '#607D8B'
  ];

  const handleOpen = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description,
        color: category.color
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        description: '',
        color: '#2196F3'
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '', color: '#2196F3' });
  };

  const handleSave = () => {
    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...formData }
          : cat
      ));
    } else {
      const newCategory = {
        id: Date.now(),
        ...formData,
        eventCount: 0
      };
      setCategories([...categories, newCategory]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <Typography variant="h4" sx={{ color: '#C1FF72' }}>
          Event Categories
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          sx={{
            backgroundColor: '#C1FF72',
            color: '#000',
            '&:hover': { backgroundColor: '#a8e055' },
          }}
        >
          Add Category
        </Button>
      </Box>

      {/* Statistics */}
      <Grid container spacing={3} sx={{ marginBottom: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ color: '#C1FF72' }}>
                    {categories.length}
                  </Typography>
                  <Typography variant="body2">
                    Total Categories
                  </Typography>
                </Box>
                <CategoryIcon sx={{ fontSize: 40, color: '#C1FF72' }} />
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
                    {categories.reduce((sum, cat) => sum + cat.eventCount, 0)}
                  </Typography>
                  <Typography variant="body2">
                    Total Events
                  </Typography>
                </Box>
                <FolderIcon sx={{ fontSize: 40, color: '#4CAF50' }} />
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
                    {Math.round(categories.reduce((sum, cat) => sum + cat.eventCount, 0) / categories.length)}
                  </Typography>
                  <Typography variant="body2">
                    Avg Events/Category
                  </Typography>
                </Box>
                <CategoryIcon sx={{ fontSize: 40, color: '#2196F3' }} />
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
                    {Math.max(...categories.map(cat => cat.eventCount))}
                  </Typography>
                  <Typography variant="body2">
                    Most Popular
                  </Typography>
                </Box>
                <FolderIcon sx={{ fontSize: 40, color: '#FF9800' }} />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Categories Grid */}
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FolderIcon sx={{ color: category.color, fontSize: 32 }} />
                    <Box>
                      <Typography variant="h6" sx={{ color: category.color }}>
                        {category.name}
                      </Typography>
                      <Chip
                        label={`${category.eventCount} events`}
                        size="small"
                        sx={{
                          backgroundColor: category.color,
                          color: '#fff',
                          fontSize: '0.7rem'
                        }}
                      />
                    </Box>
                  </Box>
                  <Box>
                    <IconButton
                      onClick={() => handleOpen(category)}
                      sx={{ color: '#C1FF72' }}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(category.id)}
                      sx={{ color: '#F44336' }}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                
                <Typography variant="body2" sx={{ color: '#aaa' }}>
                  {category.description}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog 
        open={open} 
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: '#1a1a1a',
            color: '#ffffff',
          }
        }}
      >
        <DialogTitle>
          {editingCategory ? 'Edit Category' : 'Add New Category'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Category Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            margin="normal"
            multiline
            rows={3}
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

          <Typography variant="body2" sx={{ marginTop: 2, marginBottom: 1 }}>
            Choose Color:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {colors.map((color) => (
              <Box
                key={color}
                onClick={() => setFormData({ ...formData, color })}
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: color,
                  borderRadius: 1,
                  cursor: 'pointer',
                  border: formData.color === color ? '3px solid #C1FF72' : '2px solid transparent',
                  '&:hover': {
                    border: '2px solid #C1FF72',
                  }
                }}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#aaa' }}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!formData.name}
            sx={{
              backgroundColor: '#C1FF72',
              color: '#000',
              '&:hover': { backgroundColor: '#a8e055' },
            }}
          >
            {editingCategory ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EventCategories;
