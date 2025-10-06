const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Fun math facts
const mathFacts = [
  "Zero is the only number that can't be represented in Roman numerals.",
  "A 'googol' is 1 followed by 100 zeros!",
  "The number 9 is magic – multiply it by any number and the digits add up to 9.",
  "There are infinitely many prime numbers.",
  "A circle has 360 degrees because of the Babylonian number system.",
  "The word 'hundred' comes from 'hundrath', meaning 120 in Old Norse!"
];

// Serve main calculator page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle calculation
app.post('/calculate', (req, res) => {
  const { num1, num2, operation } = req.body;
  const a = Number(num1), b = Number(num2);

  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return res.send(`<h2> Invalid input! Please enter numbers only.</h2><a href="/">Go Back</a>`);
  }

  let result, symbol;
  switch (operation) {
    case 'add':
      result = a + b;
      symbol = '+';
      break;
    case 'subtract':
      result = a - b;
      symbol = '−';
      break;
    case 'multiply':
      result = a * b;
      symbol = '×';
      break;
    case 'divide':
      if (b === 0) return res.send(`<h2> Cannot divide by zero!</h2><a href="/">Go Back</a>`);
      result = a / b;
      symbol = '÷';
      break;
    default:
      return res.send(`<h2> Invalid operation!</h2><a href="/">Go Back</a>`);
  }

  const randomFact = mathFacts[Math.floor(Math.random() * mathFacts.length)];

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Result</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <div class="container">
        <h1>Super Fun Calculator</h1>
        <div class="result">
          <h2>Result:</h2>
          <p class="calculation">${a} ${symbol} ${b} =</p>
          <p class="answer">${result}</p>
          <div class="fact-box">
            <h3>💡 Fun Math Fact</h3>
            <p>${randomFact}</p>
          </div>
          <a href="/" class="back-link">← Try Again</a>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`✅ Calculator running at http://localhost:${port}`);
});
