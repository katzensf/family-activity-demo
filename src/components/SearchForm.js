import React from 'react';
import './SearchForm.css';

function SearchForm({
  city,
  setCity,
  kidsAges,
  setKidsAges,
  availability,
  setAvailability,
  distance,
  setDistance,
  preferences,
  setPreferences,
  onSearch,
  isLoading
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="search-form">
      <h1 className="app-title">
        🎯 Family Activity Finder
      </h1>
      <p className="app-subtitle">Find great activities for your family</p>

      <form onSubmit={handleSubmit}>
        <h3 className="form-title">Find Activities</h3>
        <p className="form-subtitle">Tell us about your family's preferences</p>

        <div className="form-group">
          <label htmlFor="city">📍 City</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="San Francisco"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="kids-ages">👶 Kid Ages</label>
          <input
            id="kids-ages"
            type="text"
            value={kidsAges}
            onChange={(e) => setKidsAges(e.target.value)}
            placeholder="7"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="availability">🕐 Date & Time Availability</label>
          <select
            id="availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            required
          >
            <option value="">Select availability</option>
            <option value="Saturday morning">Saturday morning</option>
            <option value="Saturday afternoon">Saturday afternoon</option>
            <option value="Saturday evening">Saturday evening</option>
            <option value="Sunday morning">Sunday morning</option>
            <option value="Sunday afternoon">Sunday afternoon</option>
            <option value="Sunday evening">Sunday evening</option>
            <option value="Weekend flexible">Weekend flexible</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="distance">🚗 Maximum Distance: {distance} miles</label>
          <input
            id="distance"
            type="range"
            min="1"
            max="50"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="distance-slider"
          />
          <div className="distance-labels">
            <span>1 mile</span>
            <span>50+ miles</span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="preferences">💭 Optional Preferences</label>
          <textarea
            id="preferences"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            placeholder="e.g., indoor activities, educational, budget-friendly"
            rows="3"
          />
        </div>

        <button
          type="submit"
          className="search-button"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search Activities'}
        </button>

        <button type="button" className="clear-button">
          Clear
        </button>
      </form>
    </div>
  );
}

export default SearchForm;