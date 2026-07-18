import jwt from 'jsonwebtoken';

const token = jwt.sign({ id: 1, username: 'admin' }, process.env.JWT_SECRET || 'agency-super-secret-key', { expiresIn: '1h' });

const res = await fetch('http://127.0.0.1:5000/api/customers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ name: 'Temp Customer', phone: '0711111111', email: 'temp@example.com', address: 'Test Address' }),
});

console.log('status', res.status);
console.log(await res.text());
