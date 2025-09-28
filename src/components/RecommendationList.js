import React from 'react';
import ActivityCard from './ActivityCard';
import './RecommendationList.css';

function RecommendationList({ activities, hasSearched }) {
  if (!hasSearched) {
    return (
      <div className="recommendation-list">
        <h2>Top 5 Recommendations</h2>
        <p className="no-results">Submit your preferences to see family activity recommendations</p>
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