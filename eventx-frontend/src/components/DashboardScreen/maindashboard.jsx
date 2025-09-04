import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';

import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import logo from "../../assets/sidebarIcons/Group 1.svg"
import studio from "../../assets/sidebarIcons/studio.png"
import addEvent from "../../assets/sidebarIcons/add.svg"
import dashboard from "../../assets/sidebarIcons/Control Panel.svg"
import manageEvents from "../../assets/sidebarIcons/Event Accepted.svg"
import bookingTickets from "../../assets/sidebarIcons/New Ticket.svg"
import attendeeInsights from "../../assets/sidebarIcons/Collaborating In Circle.svg"
import analyticsReports from "../../assets/sidebarIcons/Statistics.svg"
import contactSupport from "../../assets/sidebarIcons/Customer Support.svg"
import notifications from "../../assets/sidebarIcons/Add Reminder.svg"
import settings from "../../assets/sidebarIcons/Settings.svg"
import marketing from "../../assets/sidebarIcons/Speaker.svg"
import eventCategories from "../../assets/sidebarIcons/Opened Folder.svg"
import logoutico from "../../assets/sidebarIcons/Logout.svg"
import manageUsers from "../../assets/sidebarIcons/Add User Male.svg"
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


import { useAuth } from "../Auth/AuthContext";
const drawerWidth = 300;

const menuItems = [
  { text: 'Dashboard', icon: dashboard, path: '/dashboard' },
  { text: 'Manage Events', icon: manageEvents, path: '/manage-events' },
  { text: 'Booking & Tickets', icon: bookingTickets, path: '/booking-tickets' },
  { text: 'Attendee Insights', icon: attendeeInsights, path: '/insights' },
  { text: 'Analytics & Reports', icon: analyticsReports, path: '/analytics' },
];

const menuItems2 = [
  { text: 'Contact Support', icon: contactSupport, path: '/contact-support' },
  { text: 'Notifications', icon: notifications, path: '/notifications' },
  { text: 'Settings', icon: settings, path: '/setting' },
];

const menuItems3 = [
  { text: 'Marketing', icon: marketing, path: '/marketing' },
  { text: 'Event Categories', icon: eventCategories, path: '/event-categories' },
];
 

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { children} = props;
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const menuItems4 = [
    { text: 'Manage Users', icon: manageUsers ,onClick:()=>navigate('/manage-users')},
    { text: 'Logout', icon: logoutico , onClick:logout}
 
  
  
  ];

  const drawer = (
    <div style={{backgroundColor: '#111111'}}>
      <Toolbar style={{paddingTop: '20px', paddingBottom: '20px', paddingLeft: '15px', paddingRight: '15px'}}>
        <div className="flex items-center w-full">
          <img className="w-8 h-8 sm:w-[50px] sm:h-[50px]" src={logo} alt="logo" />
          <div style={{paddingLeft: '15px'}} className="hidden sm:block">
            <h1 className="text-sm sm:text-base">EventX</h1>
            <p><img src={studio} alt="" className="w-12 sm:w-auto" /></p>
          </div>
        </div>
      </Toolbar>
      <Toolbar style={{paddingLeft: '15px', paddingRight: '15px'}}>
        <div className="gap-2 sm:gap-[10px] w-full sm:w-[250px] h-[45px] sm:h-[52px] bg-[#282828] rounded-[1rem] flex items-center justify-center p-2">
          <div>
            <Link to="/create-event">
              <button className="w-8 h-8 sm:w-[42px] sm:h-[42px] bg-[#C1FF72] rounded-[1rem] flex items-center justify-center">
                <img src={addEvent} alt="" className="w-4 h-4 sm:w-auto sm:h-auto" />
              </button>
            </Link>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xs sm:text-sm">Add Quick Event</h1>
            <h6 className="text-[8px] sm:text-[10px]">Events</h6>
          </div>
        </div>
      </Toolbar>
      <hr className="ml-[15px] sm:ml-[20px]"/>
     <Accordion style={{backgroundColor: "transparent",color: "#fff", boxShadow: 'none'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{color: "#fff"}}/>}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ 
            minHeight: { xs: '40px', sm: '48px' },
            '& .MuiAccordionSummary-content': { 
              margin: { xs: '8px 0', sm: '12px 0' } 
            }
          }}
        >
          <Typography component="span" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            Main Navigation
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: { xs: '8px 16px 16px', sm: '8px 16px 16px' } }}>

        <List sx={{ padding: 0 }}>
    {menuItems.map((item) => (
      <ListItem key={item.text} disablePadding>
        <ListItemButton 
          onClick={() => navigate(item.path)}
          sx={{ 
            paddingY: { xs: '6px', sm: '8px' },
            minHeight: { xs: '40px', sm: '48px' }
          }}
        >
          <ListItemIcon sx={{ minWidth: { xs: '35px', sm: '56px' } }}>
            <img 
              src={item.icon} 
              alt={item.text} 
              style={{ width: 20, height: 20 }} 
            />
          </ListItemIcon>
          <ListItemText 
            primary={item.text} 
            primaryTypographyProps={{
              fontSize: { xs: '0.8rem', sm: '0.875rem' }
            }}
          />
        </ListItemButton>
      </ListItem>
    ))}
  </List>

      <Divider sx={{ backgroundColor: '#333', margin: { xs: '8px 0', sm: '16px 0' } }} />
        </AccordionDetails>
      </Accordion>
      <Accordion style={{backgroundColor: "transparent",color: "#fff", boxShadow: 'none'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{color: "#fff"}}/>}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{ 
            minHeight: { xs: '40px', sm: '48px' },
            '& .MuiAccordionSummary-content': { 
              margin: { xs: '8px 0', sm: '12px 0' } 
            }
          }}
        >
          <Typography component="span" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            Support & Management
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: { xs: '8px 16px 16px', sm: '8px 16px 16px' } }}>

<List sx={{ padding: 0 }}>
  {menuItems2.map((item) => (
    <ListItem key={item.text} disablePadding>
      <ListItemButton 
        onClick={() => navigate(item.path)}
        sx={{ 
          paddingY: { xs: '6px', sm: '8px' },
          minHeight: { xs: '40px', sm: '48px' }
        }}
      >
        <ListItemIcon sx={{ minWidth: { xs: '35px', sm: '56px' } }}>
          <img 
            src={item.icon} 
            alt={item.text} 
            style={{ width: 20, height: 20 }}
          />
        </ListItemIcon>
        <ListItemText 
          primary={item.text}
          primaryTypographyProps={{
            fontSize: { xs: '0.8rem', sm: '0.875rem' }
          }}
        />
      </ListItemButton>
    </ListItem>
  ))}
</List>

      <Divider sx={{ backgroundColor: '#333', margin: { xs: '8px 0', sm: '16px 0' } }} />
        </AccordionDetails>
      </Accordion>

      <Accordion style={{backgroundColor: "transparent",color: "#fff", boxShadow: 'none'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{color: "#fff"}}/>}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{ 
            minHeight: { xs: '40px', sm: '48px' },
            '& .MuiAccordionSummary-content': { 
              margin: { xs: '8px 0', sm: '12px 0' } 
            }
          }}
        >
          <Typography component="span" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            Additional Features
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: { xs: '8px 16px 16px', sm: '8px 16px 16px' } }}>

<List sx={{ padding: 0 }}>
  {menuItems3.map((item) => (
    <ListItem key={item.text} disablePadding>
      <ListItemButton 
        onClick={() => navigate(item.path)}
        sx={{ 
          paddingY: { xs: '6px', sm: '8px' },
          minHeight: { xs: '40px', sm: '48px' }
        }}
      >
        <ListItemIcon sx={{ minWidth: { xs: '35px', sm: '56px' } }}>
          <img 
            src={item.icon} 
            alt={item.text} 
            style={{ width: 20, height: 20 }}
          />
        </ListItemIcon>
        <ListItemText 
          primary={item.text}
          primaryTypographyProps={{
            fontSize: { xs: '0.8rem', sm: '0.875rem' }
          }}
        />
      </ListItemButton>
    </ListItem>
  ))}
</List>

      <Divider sx={{ backgroundColor: '#333', margin: { xs: '8px 0', sm: '16px 0' } }} />
        </AccordionDetails>
      </Accordion>
   
      <Accordion style={{backgroundColor: "transparent",color: "#fff", boxShadow: 'none'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{color: "#fff"}}/>}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ 
            minHeight: { xs: '40px', sm: '48px' },
            '& .MuiAccordionSummary-content': { 
              margin: { xs: '8px 0', sm: '12px 0' } 
            }
          }}
        >
          <Typography component="span" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            Account Management
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: { xs: '8px 16px 16px', sm: '8px 16px 16px' } }}>

<List sx={{ padding: 0 }}>
  {menuItems4.map((item) => (
    <ListItem key={item.text} disablePadding>
      <ListItemButton 
        {...(item.onClick ? { onClick: item.onClick } : {})}
        sx={{ 
          paddingY: { xs: '6px', sm: '8px' },
          minHeight: { xs: '40px', sm: '48px' }
        }}
      >
        <ListItemIcon sx={{ minWidth: { xs: '35px', sm: '56px' } }}>
          <img 
            src={item.icon} 
            alt={item.text} 
            style={{ width: 20, height: 20 }}
          />
        </ListItemIcon>
        <ListItemText 
          primary={item.text}
          primaryTypographyProps={{
            fontSize: { xs: '0.8rem', sm: '0.875rem' }
          }}
        />
      </ListItemButton>
    </ListItem>
  ))}
</List>

      <Divider sx={{ backgroundColor: '#333', margin: { xs: '8px 0', sm: '16px 0' } }} />
        </AccordionDetails>
      </Accordion>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Mobile AppBar with hamburger menu */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { xs: 'block', sm: 'none' },
          backgroundColor: '#111111',
          boxShadow: 'none',
          borderBottom: '1px solid #333'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            EventX
          </Typography>
        </Toolbar>
      </AppBar>
    
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Mobile drawer */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: '#111111',
              borderRight: '1px solid transparent' 
            },
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: '#111111',
              color: '#fff',
              borderRight: '1px solid transparent' 
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          background: '#111111',
          pt: { xs: 10, sm: 3 }, // Add top padding for mobile AppBar
          pb: { xs: 4, sm: 1 }, // More bottom padding on mobile
          px: { xs: 1, sm: 0 }, // Add horizontal padding on mobile
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh', // Ensure full height
          overflow: 'auto' // Allow scrolling if content overflows
        }}
      >
        <Outlet/>
        {children}
      </Box>
     
    </Box>
  
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
