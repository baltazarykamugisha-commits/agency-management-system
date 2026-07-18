const loginRes = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'admin', password: 'admin123' }),
});
const loginData = await loginRes.json();
console.log('LOGIN', loginRes.status);
console.log(JSON.stringify(loginData));
const token = loginData.token;
const customerRes = await fetch('http://localhost:5000/api/customers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ name: 'Temp Customer', phone: '0711111111', email: 'temp@example.com', address: 'Test Address' }),
});
console.log('CUSTOMER', customerRes.status);
console.log(await customerRes.text());
