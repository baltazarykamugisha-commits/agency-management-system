import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Checkbox, FormControlLabel, TextField, Typography, Stack, Alert, CircularProgress } from '@mui/material';
import api from '../services/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', form);
      const token = response?.data?.token;

      if (!token) {
        throw new Error('No token received');
      }

      localStorage.setItem('token', token);
      window.location.assign('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', p: 3 }}>
      <Card sx={{ width: { xs: '100%', md: 460 }, p: 2, borderRadius: 4, boxShadow: 6 }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h4" fontWeight={700} color="primary">Agency Management</Typography>
            <Typography color="text.secondary">Professional desktop business platform</Typography>
            {error ? <Alert severity="error">{error}</Alert> : null}
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField label="Username" fullWidth value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
                <TextField label="Password" type="password" fullWidth value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <FormControlLabel control={<Checkbox />} label="Remember me" />
                <Button type="submit" variant="contained" size="large" disabled={loading}>
                  {loading ? <CircularProgress size={20} color="inherit" /> : 'Login'}
                </Button>
              </Stack>
            </form>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
