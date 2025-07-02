// server.js or index.js
import express from 'express';
import cors from 'cors';
import Retell from 'retell-sdk';

const app = express();
const port = process.env.PORT || 3001;

// Initialize Retell SDK
const retellClient = new Retell({
  apiKey: process.env.RETELL_API_KEY, // Your Retell API key
});

// Configure CORS
app.use(cors({
  origin: [
    'https://frontend-eight-zeta-72.vercel.app', // Your frontend URL
    'http://localhost:3000', // For local development
    'http://localhost:5173'  // If using Vite locally
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Retell AI Backend Server is running!' });
});

// Create web call endpoint
app.post('/create-web-call', async (req, res) => {
  try {
    console.log('Creating web call...');
    
    // Create web call using Retell SDK
    const webCallResponse = await retellClient.call.createWebCall({
      agent_id: 'agent_5dd51015619e030d2022ab251e', // Your agent ID
      // Optional: Add any other parameters from the request body
      ...req.body
    });

    console.log('Web call created successfully:', webCallResponse.call_id);
    
    // Return the access token and call details
    res.json({
      success: true,
      access_token: webCallResponse.access_token,
      call_id: webCallResponse.call_id,
      agent_id: webCallResponse.agent_id
    });

  } catch (error) {
    console.error('Error creating web call:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create web call'
    });
  }
});

// Handle preflight requests
app.options('*', cors());

app.listen(port, () => {
  console.log(`Retell AI backend server running on port ${port}`);
  console.log(`Health check: http://localhost:${port}/`);
  console.log(`Create web call: http://localhost:${port}/create-web-call`);
});
