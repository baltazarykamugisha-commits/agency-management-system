import prisma from '../lib/prisma.js';

const DEFAULT_CURRENCY = 'TZS';

const buildSettingsPayload = (settings) => {
  const payload = Object.fromEntries(settings.map((setting) => [setting.key, setting.value]));
  return {
    ...payload,
    currency: payload.currency || DEFAULT_CURRENCY,
  };
};

export const listSettings = async (req, res) => {
  try {
    const settings = await prisma.setting.findMany({ orderBy: { key: 'asc' } });
    res.json(buildSettingsPayload(settings));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to load settings' });
  }
};

export const saveSettings = async (req, res) => {
  try {
    const entries = Object.entries(req.body || {});

    if (!entries.length) {
      return res.status(400).json({ message: 'No settings supplied' });
    }

    const normalizedEntries = entries.map(([key, value]) => {
      if (key === 'currency') {
        return [key, String(value || DEFAULT_CURRENCY).toUpperCase()];
      }

      return [key, String(value)];
    });

    const saved = [];

    for (const [key, value] of normalizedEntries) {
      const record = await prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
      saved.push(record);
    }

    const payload = Object.fromEntries(saved.map((setting) => [setting.key, setting.value]));
    return res.json(buildSettingsPayload(saved));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to save settings' });
  }
};
