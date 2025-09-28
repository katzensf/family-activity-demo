import React from 'react';
import ActivityCard from './ActivityCard';
import './RecommendationList.css';

function RecommendationList({ activities, hasSearched, isLoading, error }) {
  if (!hasSearched) {
    return (
      <div className="recommendation-list">
        <h2>Top 5 Recommendations</h2>
        <p className="no-results">Submit your preferences to see family activity recommendations</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="recommendation-list">
        <h2>Top 5 Recommendations</h2>
        <p className="loading-message">🔍 Searching for the best family activities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recommendation-list">
        <h2>Top 5 Recommendations</h2>
        <p className="error-message">❌ {error}</p>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="recommendation-list">
        <h2>Top 5 Recommendations</h2>
        <p className="no-results">No activities found. Please try different search criteria.</p>
      </div>
    );
  }

  return (
    <div className="recommendation-list">
      <h2>Top 5 Recommendations</h2>
      <p className="results-subtitle">Great activities for your family</p>
      <div className="activities-container">
        {activities.map(activity => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}

export default RecommendationList;