import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import RecommendationList from './components/RecommendationList';
import { sampleActivities } from './data/dummyData';
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

  const handleSearch = async () => {
    setIsLoading(true);
    setHasSearched(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For Milestone 1, just show the dummy data
    setActivities(sampleActivities);
    setIsLoading(false);
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
      />
      <RecommendationList
        activities={activities}
        hasSearched={hasSearched}
      />
    </div>
  );
}

export default App;
