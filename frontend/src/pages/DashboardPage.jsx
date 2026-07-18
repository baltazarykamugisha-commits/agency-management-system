import { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, Stack, Divider } from '@mui/material';
import { TrendingUp, Wallet, Users, ReceiptText, ArrowRightLeft } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useSettings } from '../contexts/SettingsContext';
import api from '../services/api';
import { formatCurrency } from '../utils/currency';

const cards = [
  { title: 'Today\'s Sales', key: 'sales', icon: <TrendingUp size={20} /> },
  { title: 'Cash Balance', key: 'cashBalance', icon: <Wallet size={20} /> },
  { title: 'Customers', key: 'customers', icon: <Users size={20} /> },
  { title: 'Transactions', key: 'transactions', icon: <ReceiptText size={20} /> },
];

const chartData = [
  { name: 'Mon', value: 21000 },
  { name: 'Tue', value: 28000 },
  { name: 'Wed', value: 32000 },
  { name: 'Thu', value: 26000 },
  { name: 'Fri', value: 37000 },
  { name: 'Sat', value: 42000 },
];

export default function DashboardPage() {
  const [data, setData] = useState({});
  const { settings } = useSettings();

  useEffect(() => {
    const token = localStorage.getItem('token');
    api.get('/dashboard/summary', { headers: { Authorization: `Bearer ${token}` } }).then((res) => setData(res.data));
  }, []);

  const formatValue = (value, key) => {
    if (key === 'sales' || key === 'cashBalance' || key === 'profit' || key === 'expenses' || key === 'floatBalance') {
      return formatCurrency(value, settings.currency);
    }
    return Number(value || 0).toLocaleString();
  };

  return (
    <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight={700} mb={3}>Dashboard</Typography>
      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 1.2, borderRadius: 2 }}>{card.icon}</Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">{card.title}</Typography>
                  <Typography variant="h6" fontWeight={700}>{formatValue(data[card.key], card.key)}</Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} mt={1}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>Weekly Sales Flow</Typography>
            <Box sx={{ width: '100%', height: 280 }}>
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <CartesianGrid stroke="#374151" strokeDasharray="5 5" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>Finance Snapshot</Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">Profit</Typography>
                <Typography variant="h6" fontWeight={700}>{formatValue(data.profit, 'profit')}</Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="body2" color="text.secondary">Expenses</Typography>
                <Typography variant="h6" fontWeight={700}>{formatValue(data.expenses, 'expenses')}</Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="body2" color="text.secondary">Float Balance</Typography>
                <Typography variant="h6" fontWeight={700}>{formatValue(data.floatBalance, 'floatBalance')}</Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 3, borderRadius: 3, boxShadow: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <ArrowRightLeft size={18} />
          <Typography variant="h6" fontWeight={700}>Recent Transactions</Typography>
        </Stack>
        <Typography color="text.secondary">No recent transactions yet. This will be connected to the transaction module in the next phase.</Typography>
      </Paper>
    </Box>
  );
}
