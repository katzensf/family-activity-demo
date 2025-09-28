import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import RecommendationList from './components/RecommendationList';
import './App.css';

function App() {
  // Form state
  const [city, setCity] = useState('');
  const [kidsAges, setKidsAges] = useState('');
  const [availability, setAvailability] = useState('');
  const [distance, setDistance] = useState('20');
  const [preferences, setPreferences] = useState('');

  // UI state
  const [activities, setActivities] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    // Validate required fields
    if (!city || !kidsAges || !availability || !distance) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    setError('');

    try {
      // Call the backend API
      const response = await fetch('http://localhost:3001/api/search-activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city,
          kidsAges,
          availability,
          distance,
          preferences
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle rate limit errors specifically
        if (response.status === 429) {
          setError(`Rate limit exceeded. Please wait ${data.retryAfter || 60} seconds and try again.`);
        } else {
          setError(data.error || `HTTP error! status: ${response.status}`);
        }
        setActivities([]);
        return;
      }

      // Parse the recommendations from Claude's response
      const parsedActivities = parseClaudeResponse(data.recommendations);
      setActivities(parsedActivities);

    } catch (error) {
      console.error('Error searching activities:', error);
      setError('Failed to fetch recommendations. Please try again.');
      setActivities([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to parse Claude's text response into activity objects
  const parseClaudeResponse = (text) => {
    if (!text) return [];

    const activities = [];
    const sections = text.split(/\*\*([^*]+)\*\*/);

    for (let i = 1; i < sections.length; i += 2) {
      const titleWithEmoji = sections[i];
      const description = sections[i + 1]?.trim();

      if (titleWithEmoji && description) {
        // Extract emoji from the beginning of the title
        const emojiMatch = titleWithEmoji.match(/^([^\w\s]+)/);
        const emoji = emojiMatch ? emojiMatch[1] : '🎯';
        const title = titleWithEmoji.replace(/^[^\w\s]+\s*/, '');

        activities.push({
          id: activities.length + 1,
          emoji: emoji,
          title: title,
          description: description
        });
      }
    }

    return activities.slice(0, 5); // Limit to 5 activities
  };

  return (
    <div className="app">
      <SearchForm
        city={city}
        setCity={setCity}
        kidsAges={kidsAges}
        setKidsAges={setKidsAges}
        availability={availability}
        setAvailability={setAvailability}
        distance={distance}
        setDistance={setDistance}
        preferences={preferences}
        setPreferences={setPreferences}
        onSearch={handleSearch}
        isLoading={isLoading}
        error={error}
      />
      <RecommendationList
        activities={activities}
        hasSearched={hasSearched}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

export default App;
