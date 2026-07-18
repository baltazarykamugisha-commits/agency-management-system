import { useEffect, useState } from 'react';
import { Box, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useSettings } from '../contexts/SettingsContext';
import api from '../services/api';
import { formatCurrency } from '../utils/currency';

export default function ReportsPage() {
  const [reports, setReports] = useState({ transactions: [], expenses: [], income: [], counts: {} });
  const { settings } = useSettings();

  useEffect(() => {
    const token = localStorage.getItem('token');
    api.get('/reports', { headers: { Authorization: `Bearer ${token}` } }).then((res) => setReports(res.data));
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>Reports</Typography>
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" mb={2}>Business Summary</Typography>
          <Typography>Customers: {reports.counts.customers}</Typography>
          <Typography>Employees: {reports.counts.employees}</Typography>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" mb={2}>Recent Transactions</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Reference</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.transactions.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.reference}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{formatCurrency(item.amount, settings.currency)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" mb={2}>Income & Expenses</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...reports.expenses, ...reports.income].map((item, index) => (
                <TableRow key={`${item.description}-${index}`}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{formatCurrency(item.amount, settings.currency)}</TableCell>
                  <TableCell>{item.category ? item.category : 'expense'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Stack>
    </Box>
  );
}
