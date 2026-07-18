import { useEffect, useState } from 'react';
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography, TextField } from '@mui/material';
import { useSettings } from '../contexts/SettingsContext';
import api from '../services/api';
import { formatCurrency } from '../utils/currency';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ reference: '', type: 'CASH_IN', amount: '', status: 'COMPLETED', channel: 'CASH', description: '' });
  const { settings } = useSettings();

  const loadTransactions = async () => {
    const token = localStorage.getItem('token');
    const res = await api.get('/transactions', { headers: { Authorization: `Bearer ${token}` } });
    setTransactions(res.data);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await api.post('/transactions', form, { headers: { Authorization: `Bearer ${token}` } });
    setForm({ reference: '', type: 'CASH_IN', amount: '', status: 'COMPLETED', channel: 'CASH', description: '' });
    loadTransactions();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>Transactions</Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" mb={2}>Create New Transaction</Typography>
        <form onSubmit={handleSubmit}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField label="Reference" value={form.reference} onChange={(e) => setForm({ ...form, reference: e.target.value })} required fullWidth />
            <TextField label="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} required fullWidth />
            <TextField label="Amount" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required fullWidth />
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mt={2}>
            <TextField label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} fullWidth />
            <TextField label="Channel" value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })} fullWidth />
            <TextField label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} fullWidth />
          </Stack>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>Save Transaction</Button>
        </form>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>Recent Transactions</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reference</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Channel</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.reference}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{formatCurrency(item.amount, settings.currency)}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.channel}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
