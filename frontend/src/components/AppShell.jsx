import { useNavigate, useLocation } from 'react-router-dom';
import { Box, AppBar, Toolbar, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography, IconButton, Divider, Stack } from '@mui/material';
import { LayoutDashboard, ReceiptText, Users, Briefcase, Wallet, FileBarChart2, Settings, LogOut, Menu } from 'lucide-react';
import { useMemo, useState } from 'react';

const drawerWidth = 260;

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'Transactions', path: '/transactions', icon: <ReceiptText size={20} /> },
  { label: 'Customers', path: '/customers', icon: <Users size={20} /> },
  { label: 'Employees', path: '/employees', icon: <Briefcase size={20} /> },
  { label: 'Finance', path: '/finance', icon: <Wallet size={20} /> },
  { label: 'Reports', path: '/reports', icon: <FileBarChart2 size={20} /> },
  { label: 'Settings', path: '/settings', icon: <Settings size={20} /> },
];

export default function AppShell({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activePath = useMemo(() => location.pathname, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const drawer = (
    <Box sx={{ height: '100%', bgcolor: 'background.paper', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
      <Toolbar>
        <Typography variant="h6" fontWeight={700}>Agency OS</Typography>
      </Toolbar>
      <Divider />
      <List sx={{ px: 1, pt: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            selected={activePath === item.path}
            onClick={() => navigate(item.path)}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemIcon sx={{ color: activePath === item.path ? 'primary.main' : 'text.secondary', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 2 }}>
        <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <LogOut size={20} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'background.paper', color: 'text.primary', boxShadow: 1 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2, display: { md: 'none' } }}>
            <Menu size={20} />
          </IconButton>
          <Typography variant="h6" fontWeight={700}>Agency Management System</Typography>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, mt: 8, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
        {children}
      </Box>
    </Box>
  );
}
