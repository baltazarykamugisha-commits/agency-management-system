import { useEffect, useState } from 'react';
import { Box, Paper, Typography, Stack, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { useSettings } from '../contexts/SettingsContext';
import { DEFAULT_CURRENCY } from '../utils/currency';

export default function SettingsPage() {
  const { settings, loading, refreshSettings, updateSettings } = useSettings();
  const [form, setForm] = useState({ agencyName: '', currency: DEFAULT_CURRENCY, contactEmail: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    refreshSettings();
  }, []);

  useEffect(() => {
    setForm({
      agencyName: settings.agencyName || '',
      currency: settings.currency || DEFAULT_CURRENCY,
      contactEmail: settings.contactEmail || '',
    });
  }, [settings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const nextSettings = await updateSettings(form);
      setForm({
        agencyName: nextSettings?.agencyName || form.agencyName,
        currency: nextSettings?.currency || form.currency,
        contactEmail: nextSettings?.contactEmail || form.contactEmail,
      });
      setMessage('Settings saved successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save settings');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>Settings</Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>Agency Preferences</Typography>
        {message ? <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert> : null}
        {error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null}
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="Agency Name" value={form.agencyName} onChange={(e) => setForm({ ...form, agencyName: e.target.value })} fullWidth />
            <TextField label="Currency" value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} fullWidth />
            <TextField label="Contact Email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} fullWidth />
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={20} color="inherit" /> : 'Save Settings'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
