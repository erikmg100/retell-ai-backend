import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

// Configure CORS
app.use(cors({
  origin: [
    'https://frontend-eight-zeta-72.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Retell AI Backend Server is running!',
    timestamp: new Date().toISOString(),
    env_check: process.env.RETELL_API_KEY ? 'API key found' : 'API key missing'
  });
});

// Simple test endpoint first
app.post('/create-web-call', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Endpoint working, but Retell integration disabled for testing',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.options('*', cors());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
