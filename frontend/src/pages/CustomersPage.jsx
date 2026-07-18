import { useEffect, useState } from 'react';
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography, TextField } from '@mui/material';
import api from '../services/api';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '' });

  const loadCustomers = async () => {
    const token = localStorage.getItem('token');
    const res = await api.get('/customers', { headers: { Authorization: `Bearer ${token}` } });
    setCustomers(res.data);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await api.post('/customers', form, { headers: { Authorization: `Bearer ${token}` } });
    setForm({ name: '', phone: '', email: '', address: '' });
    loadCustomers();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>Customers</Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" mb={2}>Add Customer</Typography>
        <form onSubmit={handleSubmit}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required fullWidth />
            <TextField label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required fullWidth />
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mt={2}>
            <TextField label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} fullWidth />
            <TextField label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} fullWidth />
          </Stack>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>Save Customer</Button>
        </form>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>Customer List</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
