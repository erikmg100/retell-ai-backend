import express from 'express';
import cors from 'cors';
import Retell from 'retell-sdk';

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

// Create web call endpoint with Retell integration
app.post('/create-web-call', async (req, res) => {
  try {
    console.log('Creating web call...');
    
    const retellClient = new Retell({
      apiKey: process.env.RETELL_API_KEY,
    });

    // Create web call using Retell SDK
    const webCallResponse = await retellClient.call.createWebCall({
      agent_id: 'agent_5dd51015619e030d2022ab251e',
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

app.options('*', cors());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
