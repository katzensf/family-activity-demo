import React from 'react';
import './ActivityCard.css';

function ActivityCard({ activity }) {
  return (
    <div className="activity-card">
      <h3 className="activity-title">
        <span className="activity-emoji">{activity.emoji}</span>
        {activity.title}
      </h3>
      <p className="activity-description">{activity.description}</p>
    </div>
  );
}

export default ActivityCard;