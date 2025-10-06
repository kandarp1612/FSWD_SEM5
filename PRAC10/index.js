const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => {
  fs.readFile('text.log', 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).send('Log file not found.');
      }
      return res.status(500).send('Error reading log file.');
    }
    res.send(`<pre>${data}</pre>`);
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
