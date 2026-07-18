import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import { DEFAULT_CURRENCY, normalizeCurrency } from '../utils/currency';

const SettingsContext = createContext({
  settings: { agencyName: '', currency: DEFAULT_CURRENCY, contactEmail: '' },
  loading: false,
  refreshSettings: async () => {},
  updateSettings: async () => {},
});

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({ agencyName: '', currency: DEFAULT_CURRENCY, contactEmail: '' });
  const [loading, setLoading] = useState(false);

  const refreshSettings = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    setLoading(true);
    try {
      const response = await api.get('/settings', { headers: { Authorization: `Bearer ${token}` } });
      setSettings({
        agencyName: response.data.agencyName || '',
        currency: normalizeCurrency(response.data.currency),
        contactEmail: response.data.contactEmail || '',
      });
    } catch (error) {
      console.error('Unable to load settings', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (payload) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/settings', payload, { headers: { Authorization: `Bearer ${token}` } });
      const nextSettings = {
        agencyName: response.data.agencyName || '',
        currency: normalizeCurrency(response.data.currency),
        contactEmail: response.data.contactEmail || '',
      };
      setSettings(nextSettings);
      return nextSettings;
    } catch (error) {
      console.error('Unable to save settings', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSettings();
  }, []);

  const value = useMemo(() => ({ settings, loading, refreshSettings, updateSettings }), [settings, loading]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export const useSettings = () => useContext(SettingsContext);
