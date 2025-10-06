// server.js
const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// In production set NODE_ENV=production and provide a strong SESSION_SECRET env var
const IN_PROD = process.env.NODE_ENV === 'production';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ----- session middleware -----
app.use(session({
  name: 'library.sid', // cookie name
  secret: process.env.SESSION_SECRET || 'replace_this_with_a_long_random_secret',
  resave: false,
  saveUninitialized: false, // don't save empty sessions
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
    secure: IN_PROD,      // set to true in production (requires HTTPS)
    sameSite: 'lax'
  }
}));

// Serve static frontend files (login/profile)
app.use(express.static(path.join(__dirname, 'public')));

// ----- POST /login -----
// Example: form posts { name }
app.post('/login', (req, res) => {
  const { name } = req.body;
  if (!name || name.trim().length < 2) {
    return res.status(400).send('Name is required (min 2 chars)');
  }

  // regenerate session to avoid session fixation attacks
  req.session.regenerate(err => {
    if (err) {
      console.error('Session regeneration error:', err);
      return res.status(500).send('Could not create session');
    }

    req.session.user = {
      name: name.trim(),
      loginTime: new Date().toISOString()
    };

    // redirect to profile UI (static file will fetch session info)
    res.redirect('/profile.html');
  });
});

// ----- GET /session -----
// Returns session info as JSON for the client-side profile page
app.get('/session', (req, res) => {
  if (req.session && req.session.user) {
    return res.json({ user: req.session.user });
  }
  res.status(401).json({ error: 'Not logged in' });
});

// ----- POST /logout -----
// Destroys session server-side and clears cookie client-side
app.post('/logout', (req, res) => {
  // destroy server session
  req.session.destroy(err => {
    // clear the cookie on client (name must match the session cookie name)
    res.clearCookie('library.sid');

    if (err) {
      console.error('Session destroy error:', err);
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out' });
  });
});

app.get('/', (req, res) => {
  res.redirect('/login.html');
});

// start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
