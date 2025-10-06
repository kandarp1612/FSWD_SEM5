// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
app.use(helmet());
app.use(morgan('dev'));

const MAX_SIZE = 2 * 1024 * 1024; // 2MB
const UPLOAD_DIR = path.join(__dirname, 'uploads');

// Use memory storage so we validate the buffer before saving to disk
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter: (req, file, cb) => {
    // quick checks (client can fake these, so we also check the file header below)
    const ext = path.extname(file.originalname).toLowerCase();
    if (file.mimetype !== 'application/pdf' || ext !== '.pdf') {
      return cb(new Error('Only PDF files are allowed.'));
    }
    cb(null, true);
  }
});

// Simple homepage with upload form for manual testing
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Resume Upload</title>
      <style>
        body {
          background: linear-gradient(135deg, #f0f4f8, #dbeafe);
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
          font-family: Arial, sans-serif;
        }
        .container {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.1);
          text-align: center;
          width: 90%;
          max-width: 400px;
        }
        h1 {
          margin-bottom: 1rem;
          color: #1e3a8a;
        }
        input[type="file"] {
          display: block;
          margin: 2.5rem auto;
        }
        button {
          background: #2563eb;
          color: white;
          border: none;
          padding: 0.7rem 1.5rem;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.3s;
        }
        button:hover {
          background: #1e40af;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1> Upload Resume</h1>
        <p>Only PDF files up to <strong>2 MB</strong> are allowed.</p>
        <form action="/upload" method="post" enctype="multipart/form-data">
          <input type="file" name="resume" accept="application/pdf" required />
          <button type="submit"> Upload</button>
        </form>
      </div>
    </body>
    </html>
  `);
});


// Upload endpoint
app.post('/upload', upload.single('resume'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // Verify PDF magic bytes: PDF files start with "%PDF"
    const header = req.file.buffer.slice(0, 4).toString('utf8');
    if (!header.startsWith('%PDF')) {
      return res.status(400).json({ error: 'Uploaded file is not a valid PDF.' });
    }

    // ensure upload dir exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // generate safe filename
    const filename = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}.pdf`;
    const outPath = path.join(UPLOAD_DIR, filename);

    // write buffer to disk
    await fs.writeFile(outPath, req.file.buffer);

    return res.json({ message: 'File uploaded successfully.', filename });
  } catch (err) {
    next(err);
  }
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err);
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ error: 'File too large. Max size is 2MB.' });
    }
    return res.status(400).json({ error: err.message });
  }
  // Other errors (including our custom 'Only PDF files are allowed.')
  res.status(400).json({ error: err.message || 'Upload error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
