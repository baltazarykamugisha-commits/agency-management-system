import { useEffect, useState } from 'react';
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography, TextField } from '@mui/material';
import { useSettings } from '../contexts/SettingsContext';
import api from '../services/api';
import { formatCurrency } from '../utils/currency';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', email: '', position: '', salary: '' });
  const { settings } = useSettings();

  const loadEmployees = async () => {
    const token = localStorage.getItem('token');
    const res = await api.get('/employees', { headers: { Authorization: `Bearer ${token}` } });
    setEmployees(res.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await api.post('/employees', form, { headers: { Authorization: `Bearer ${token}` } });
    setForm({ name: '', phone: '', email: '', position: '', salary: '' });
    loadEmployees();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>Employees</Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" mb={2}>Add Employee</Typography>
        <form onSubmit={handleSubmit}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required fullWidth />
            <TextField label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required fullWidth />
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mt={2}>
            <TextField label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} fullWidth />
            <TextField label="Position" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} fullWidth />
            <TextField label="Salary" type="number" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} fullWidth />
          </Stack>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>Save Employee</Button>
        </form>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>Employee List</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Salary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{formatCurrency(employee.salary, settings.currency)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
