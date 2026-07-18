fetch('http://127.0.0.1:5000/api/auth/login', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ username: 'admin', password: 'admin123' }),
})
  .then(async (r) => {
    console.log(r.status);
    console.log(await r.text());
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
