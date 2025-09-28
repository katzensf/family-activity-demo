# Family Activity Finder - Specification

## Project Overview
A web application that helps parents find weekend activities for their families based on location, children's ages, availability, and preferences.

## Requirements

### User Inputs
1. **City** - User's location
2. **Kids Ages** - Age ranges of children
3. **Availability** - When they're free (e.g., "Saturday afternoon")
4. **Distance** - How far they'll drive (in miles)
5. **Preferences** - Additional preferences (optional)

### Output
- **5 activity recommendations**
- Each recommendation includes:
  - **Bold title** with emoji
  - **2-4 sentence description**
  - Relevant details (location, timing, age appropriateness)

## Tech Stack

### Frontend
- **React** - Component-based UI
- **CSS/Styled Components** - Styling to match mockup design

### Backend
- **Express.js** - API server
- **Node.js** - Runtime environment

### AI Integration
- **Claude API** with **Web Search Tool**
- Real-time activity discovery
- Enhanced recommendations with current data

## Design Guidelines

Based on the provided mockup:

### Layout
- **Left Sidebar**: Input form (30% width)
- **Main Content**: Activity recommendations (70% width)
- **Clean, minimal design** with plenty of white space

### Components
- Form inputs with clear labels
- "Search Activities" button
- Recommendation cards with emoji, title, and description
- Responsive design for mobile/desktop

### Color Scheme
- Light background
- Blue accent color for buttons and highlights
- Clean typography

## Milestones

### Milestone 1: UI Setup with Dummy Data
**Goal**: Create React frontend matching the mockup design

**Deliverables**:
- React app with component structure
- Input form for all 5 user requirements
- Static recommendation display with 5 dummy activities
- CSS styling matching the provided mockup
- Responsive layout

**Components**:
- `App.js` - Main application
- `SearchForm.js` - Left sidebar form
- `RecommendationList.js` - Main content area
- `ActivityCard.js` - Individual recommendation

### Milestone 2: Backend Integration with Claude API
**Goal**: Connect to Claude API using web search tool for real-time data

**Deliverables**:
- Express server with API endpoints
- Claude API integration with web search tool configuration:
  ```javascript
  {
    type: "web_search_20250305",
    name: "web_search",
    max_uses: 5,
    user_location: userCity
  }
  ```
- Dynamic activity search based on user inputs
- Real-time recommendations replacing dummy data

**API Endpoints**:
- `POST /api/search-activities` - Main search endpoint
- Request format: `{ city, kidsAges, availability, distance, preferences }`
- Response: Array of 5 formatted activity recommendations

### Milestone 3: Polish and Deployment
**Goal**: Production-ready application

**Deliverables**:
- Error handling and loading states
- Input validation
- Performance optimization
- Basic testing
- Deployment configuration
- Documentation for setup and usage

## Technical Implementation Notes

### Claude Web Search Integration
- Use `user_location` parameter for location-based results
- Implement proper error handling for API rate limits
- Cache responses for similar queries to reduce API costs

### Data Flow
1. User submits form → Frontend validates inputs
2. Frontend sends request → Express API receives data
3. Express formats prompt → Claude API with web search
4. Claude returns recommendations → Express formats response
5. Frontend displays results → User sees 5 activity suggestions

## Success Criteria
- Clean, intuitive UI matching the mockup
- Accurate, relevant activity recommendations
- Fast response times (< 5 seconds)
- Mobile-responsive design
- Proper error handling and user feedback