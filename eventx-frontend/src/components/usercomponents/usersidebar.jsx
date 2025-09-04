import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
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
import logo from "../../assets/sidebarIcons/Group 1.svg"
import studio from "../../assets/sidebarIcons/studio.png"

import bookingTickets from "../../assets/sidebarIcons/New Ticket.svg"

import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';

import logoutico from "../../assets/sidebarIcons/Logout.svg"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import { useAuth } from "../Auth/AuthContext";
const drawerWidth = 300;

const menuItems = [
  
  { text: 'Booking & Tickets', icon: bookingTickets, path: '/tickets' },

];
  const menuItems2 = [
    { text: 'Contact Support', icon: <PsychologyAltIcon sx={{ fontSize: '50px', color: '#fff' }} /> },
    { text: 'profile', icon:  <AccountCircleIcon sx={{ fontSize: '50px', color: '#fff' }} /> },

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
  
    { text: 'Logout', icon: logoutico , onClick:logout}
 
  
  
  ];

  const drawer = (
    <div style={{backgroundColor: '#111111'}}>
      <Toolbar style={{paddingTop: '30px' ,paddingBottom: '30px'}} ><div><img className="w-[50px] h-[50px]" src={logo} alt="logo" /></div><div style={{paddingLeft: '20px'}}><h1>EventX</h1><p><img src={studio} alt="" /></p></div></Toolbar>
   
     <Accordion style={{backgroundColor: "transparent",color: "#fff"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{color: "#fff"}}/>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Main Navigation</Typography>
        </AccordionSummary>
        <AccordionDetails>

        <List>
    {menuItems.map((item) => (
      <ListItem key={item.text} disablePadding>
        <ListItemButton onClick={() => navigate(item.path)}>
          <ListItemIcon>
            <img src={item.icon} alt={item.text} style={{ width: 24, height: 24 }} />
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>

      <Divider />
        </AccordionDetails>
      </Accordion>
      <Accordion style={{backgroundColor: "transparent",color: "#fff"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{color: "#fff"}}/>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Support & Management</Typography>
        </AccordionSummary>
        <AccordionDetails>

<List>
  {menuItems2.map((item) => (
    <ListItem key={item.text} disablePadding>
      <ListItemButton onClick={() => navigate(item.path)}>
        <ListItemIcon>
         {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItemButton>
    </ListItem>
  ))}
</List>

      <Divider />
        </AccordionDetails>
      </Accordion>
    
      <Accordion style={{backgroundColor: "transparent",color: "#fff"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{color: "#fff"}}/>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Account Management</Typography>
        </AccordionSummary>
        <AccordionDetails>

<List>
  {menuItems4.map((item) => (
    <ListItem key={item.text} disablePadding>
      <ListItemButton {...(item.onClick ? { onClick: item.onClick } : {})}>
        <ListItemIcon>
          <img 
            src={item.icon} 
            alt={item.text} 
            style={{ width: 24, height: 24 }}
          />
        </ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItemButton>
    </ListItem>
  ))}
</List>

      <Divider />
        </AccordionDetails>
      </Accordion>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
    
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,backgroundColor: '#111111',borderRight: '1px solid transparent' },
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,backgroundColor: '#111111',color: '#fff',borderRight: '1px solid transparent' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, background: '#111111', // make   sure the background covers the entire element
          pt:3,pb:1, width: { sm: `calc(100% - ${drawerWidth}px )` } }}
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
