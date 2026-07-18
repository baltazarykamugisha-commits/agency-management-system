import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import AppShell from './components/AppShell';
import { SettingsProvider } from './contexts/SettingsContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import CustomersPage from './pages/CustomersPage';
import EmployeesPage from './pages/EmployeesPage';
import FinancePage from './pages/FinancePage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#2563EB' },
    success: { main: '#22C55E' },
    warning: { main: '#F59E0B' },
    error: { main: '#EF4444' },
    background: { default: '#111827', paper: '#1F2937' },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SettingsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<AppShell><DashboardPage /></AppShell>} />
            <Route path="/transactions" element={<AppShell><TransactionsPage /></AppShell>} />
            <Route path="/customers" element={<AppShell><CustomersPage /></AppShell>} />
            <Route path="/employees" element={<AppShell><EmployeesPage /></AppShell>} />
            <Route path="/finance" element={<AppShell><FinancePage /></AppShell>} />
            <Route path="/reports" element={<AppShell><ReportsPage /></AppShell>} />
            <Route path="/settings" element={<AppShell><SettingsPage /></AppShell>} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;
