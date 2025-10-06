const express = require('express');
const path = require('path');

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files (for CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Parse form body
app.use(express.urlencoded({ extended: false }));

// Helpers
function parseAmount(input) {
  if (typeof input !== 'string') return NaN;
  // allow commas and whitespace, strip currency symbols or other characters
  const cleaned = input.replace(/,/g, '').replace(/[^\d.\-]/g, '').trim();
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : NaN;
}
function formatAmount(n) {
  // Display with 2 decimal places and thousands separators (India format)
  return n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Routes
app.get('/', (req, res) => {
  res.render('index', { errors: [], source1: '', source2: '' });
});

app.post('/calculate', (req, res) => {
  const { source1 = '', source2 = '' } = req.body;
  const a = parseAmount(source1);
  const b = parseAmount(source2);

  const errors = [];
  if (!source1 || isNaN(a)) errors.push('Please enter a valid number for Income Source 1.');
  if (!source2 || isNaN(b)) errors.push('Please enter a valid number for Income Source 2.');

  if (errors.length) {
    // Return to form and show errors & previous inputs (server-side validation)
    return res.status(400).render('index', { errors, source1, source2 });
  }

  const total = Number((a + b).toFixed(2));
  res.render('result', {
    source1: formatAmount(a),
    source2: formatAmount(b),
    total: formatAmount(total)
  });
});

// Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));
