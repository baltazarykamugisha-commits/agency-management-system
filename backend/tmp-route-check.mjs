import app from './src/app.js';

const server = app.listen(0, async () => {
  const { port } = server.address();
  const urls = [`http://127.0.0.1:${port}/api/customers`, `http://127.0.0.1:${port}/api/customers/`];
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'GET' });
      console.log(url, res.status);
      const text = await res.text();
      console.log(text.slice(0, 200));
    } catch (error) {
      console.error(url, error.message);
    }
  }
  server.close();
});
