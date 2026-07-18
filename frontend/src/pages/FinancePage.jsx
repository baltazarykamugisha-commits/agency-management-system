import { useEffect, useState } from 'react';
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography, TextField } from '@mui/material';
import { useSettings } from '../contexts/SettingsContext';
import api from '../services/api';
import { formatCurrency } from '../utils/currency';

export default function FinancePage() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [expenseForm, setExpenseForm] = useState({ description: '', amount: '', category: '' });
  const [incomeForm, setIncomeForm] = useState({ description: '', amount: '', category: '' });
  const { settings } = useSettings();

  const loadFinance = async () => {
    const token = localStorage.getItem('token');
    const [expRes, incRes] = await Promise.all([
      api.get('/finance/expenses', { headers: { Authorization: `Bearer ${token}` } }),
      api.get('/finance/income', { headers: { Authorization: `Bearer ${token}` } }),
    ]);
    setExpenses(expRes.data);
    setIncome(incRes.data);
  };

  useEffect(() => {
    loadFinance();
  }, []);

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await api.post('/finance/expenses', expenseForm, { headers: { Authorization: `Bearer ${token}` } });
    setExpenseForm({ description: '', amount: '', category: '' });
    loadFinance();
  };

  const handleIncomeSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await api.post('/finance/income', incomeForm, { headers: { Authorization: `Bearer ${token}` } });
    setIncomeForm({ description: '', amount: '', category: '' });
    loadFinance();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>Finance</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" mb={2}>Record Expense</Typography>
        <form onSubmit={handleExpenseSubmit}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField label="Description" value={expenseForm.description} onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })} required fullWidth />
            <TextField label="Amount" type="number" value={expenseForm.amount} onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })} required fullWidth />
            <TextField label="Category" value={expenseForm.category} onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })} fullWidth />
          </Stack>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>Save Expense</Button>
        </form>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" mb={2}>Record Income</Typography>
        <form onSubmit={handleIncomeSubmit}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField label="Description" value={incomeForm.description} onChange={(e) => setIncomeForm({ ...incomeForm, description: e.target.value })} required fullWidth />
            <TextField label="Amount" type="number" value={incomeForm.amount} onChange={(e) => setIncomeForm({ ...incomeForm, amount: e.target.value })} required fullWidth />
            <TextField label="Category" value={incomeForm.category} onChange={(e) => setIncomeForm({ ...incomeForm, category: e.target.value })} fullWidth />
          </Stack>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>Save Income</Button>
        </form>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>Finance Records</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...expenses, ...income].map((item, index) => (
              <TableRow key={`${item.description}-${index}`}>
                <TableCell>{item.description}</TableCell>
                <TableCell>{formatCurrency(item.amount, settings.currency)}</TableCell>
                <TableCell>{item.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
