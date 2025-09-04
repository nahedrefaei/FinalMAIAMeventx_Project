import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GetAppIcon from '@mui/icons-material/GetApp';
import FilterListIcon from '@mui/icons-material/FilterList';

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

const BookingTickets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tickets] = useState([
    {
      id: 'TKT-001',
      eventName: 'Web Dev Summit 2025',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      ticketType: 'VIP',
      price: 200,
      status: 'Confirmed',
      purchaseDate: '2025-09-01',
      seatNumber: 'A1'
    },
    {
      id: 'TKT-002',
      eventName: 'Design Thinking Workshop',
      customerName: 'Sarah Smith',
      customerEmail: 'sarah@example.com',
      ticketType: 'Regular',
      price: 120,
      status: 'Pending',
      purchaseDate: '2025-09-02',
      seatNumber: 'B5'
    },
    {
      id: 'TKT-003',
      eventName: 'Web Dev Summit 2025',
      customerName: 'Mike Johnson',
      customerEmail: 'mike@example.com',
      ticketType: 'Regular',
      price: 200,
      status: 'Confirmed',
      purchaseDate: '2025-09-03',
      seatNumber: 'A10'
    },
    {
      id: 'TKT-004',
      eventName: 'Design Thinking Workshop',
      customerName: 'Emily Davis',
      customerEmail: 'emily@example.com',
      ticketType: 'Student',
      price: 80,
      status: 'Cancelled',
      purchaseDate: '2025-09-01',
      seatNumber: 'C3'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return '#4CAF50';
      case 'Pending':
        return '#FF9800';
      case 'Cancelled':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = tickets
    .filter(t => t.status === 'Confirmed')
    .reduce((sum, ticket) => sum + ticket.price, 0);

  const confirmedTickets = tickets.filter(t => t.status === 'Confirmed').length;
  const pendingTickets = tickets.filter(t => t.status === 'Pending').length;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#C1FF72', marginBottom: 3 }}>
        Booking & Tickets
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ marginBottom: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ color: '#C1FF72' }}>
                    {tickets.length}
                  </Typography>
                  <Typography variant="body2">
                    Total Tickets
                  </Typography>
                </Box>
                <ConfirmationNumberIcon sx={{ fontSize: 40, color: '#C1FF72' }} />
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
                    {confirmedTickets}
                  </Typography>
                  <Typography variant="body2">
                    Confirmed
                  </Typography>
                </Box>
                <ConfirmationNumberIcon sx={{ fontSize: 40, color: '#4CAF50' }} />
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
                    {pendingTickets}
                  </Typography>
                  <Typography variant="body2">
                    Pending
                  </Typography>
                </Box>
                <ConfirmationNumberIcon sx={{ fontSize: 40, color: '#FF9800' }} />
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
                    ${totalRevenue}
                  </Typography>
                  <Typography variant="body2">
                    Total Revenue
                  </Typography>
                </Box>
                <ConfirmationNumberIcon sx={{ fontSize: 40, color: '#2196F3' }} />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Tickets Table */}
      <StyledPaper>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
          <Typography variant="h6">
            All Tickets
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              size="small"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#aaa' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#ffffff',
                  backgroundColor: '#2a2a2a',
                  '& fieldset': { borderColor: '#555' },
                  '&:hover fieldset': { borderColor: '#C1FF72' },
                  '&.Mui-focused fieldset': { borderColor: '#C1FF72' },
                },
              }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              sx={{
                borderColor: '#C1FF72',
                color: '#C1FF72',
                '&:hover': { borderColor: '#a8e055', backgroundColor: 'rgba(193, 255, 114, 0.1)' },
              }}
            >
              Filter
            </Button>
            <Button
              variant="contained"
              startIcon={<GetAppIcon />}
              sx={{
                backgroundColor: '#C1FF72',
                color: '#000',
                '&:hover': { backgroundColor: '#a8e055' },
              }}
            >
              Export
            </Button>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#C1FF72', fontWeight: 'bold' }}>Ticket ID</TableCell>
                <TableCell sx={{ color: '#C1FF72', fontWeight: 'bold' }}>Event</TableCell>
                <TableCell sx={{ color: '#C1FF72', fontWeight: 'bold' }}>Customer</TableCell>
                <TableCell sx={{ color: '#C1FF72', fontWeight: 'bold' }}>Type</TableCell>
                <TableCell sx={{ color: '#C1FF72', fontWeight: 'bold' }}>Price</TableCell>
                <TableCell sx={{ color: '#C1FF72', fontWeight: 'bold' }}>Seat</TableCell>
                <TableCell sx={{ color: '#C1FF72', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ color: '#C1FF72', fontWeight: 'bold' }}>Purchase Date</TableCell>
                <TableCell sx={{ color: '#C1FF72', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id} sx={{ '&:hover': { backgroundColor: '#2a2a2a' } }}>
                  <TableCell sx={{ color: '#ffffff' }}>{ticket.id}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{ticket.eventName}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>
                    <Box>
                      <Typography variant="body2">{ticket.customerName}</Typography>
                      <Typography variant="caption" sx={{ color: '#aaa' }}>
                        {ticket.customerEmail}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{ticket.ticketType}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>${ticket.price}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{ticket.seatNumber}</TableCell>
                  <TableCell>
                    <Chip
                      label={ticket.status}
                      sx={{
                        backgroundColor: getStatusColor(ticket.status),
                        color: '#fff',
                        fontSize: '0.75rem'
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{ticket.purchaseDate}</TableCell>
                  <TableCell>
                    <IconButton sx={{ color: '#C1FF72' }}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton sx={{ color: '#2196F3' }}>
                      <GetAppIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledPaper>
    </Box>
  );
};

export default BookingTickets;
