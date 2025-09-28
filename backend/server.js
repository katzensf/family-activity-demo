const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getActivityRecommendations } = require('./claudeClient');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // React dev server
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

// Activity search endpoint with Claude API integration
app.post('/api/search-activities', async (req, res) => {
  try {
    const { city, kidsAges, availability, distance, preferences } = req.body;

    // Validate required fields
    if (!city || !kidsAges || !availability || !distance) {
      return res.status(400).json({
        error: 'Missing required fields: city, kidsAges, availability, distance'
      });
    }

    console.log('Searching activities for:', { city, kidsAges, availability, distance, preferences });

    // Call Claude API to get recommendations
    const recommendations = await getActivityRecommendations(
      city,
      kidsAges,
      availability,
      distance,
      preferences
    );

    res.json({
      recommendations,
      searchCriteria: { city, kidsAges, availability, distance, preferences }
    });

  } catch (error) {
    console.error('Error in search-activities:', error);

    // Handle rate limit errors specifically
    if (error.status === 429) {
      return res.status(429).json({
        error: 'Rate limit exceeded. Please wait a moment and try again.',
        retryAfter: error.headers?.['retry-after'] || 60,
        type: 'rate_limit'
      });
    }

    res.status(500).json({
      error: 'Failed to fetch activity recommendations',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});