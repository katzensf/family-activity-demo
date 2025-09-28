# Claude API Prompt for Family Activity Finder

## Prompt Template for Milestone 2

This is the prompt template that will be sent to the Claude API with web search tool enabled to generate family activity recommendations.

### API Configuration
```javascript
{
  "model": "claude-3-sonnet-20240229",
  "tools": [
    {
      "type": "web_search_20250305",
      "name": "web_search",
      "max_uses": 5,
      "user_location": "{CITY}"
    }
  ],
  "messages": [
    {
      "role": "user",
      "content": "[PROMPT_BELOW]"
    }
  ]
}
```

### Prompt Template

```
You are a family activity finder assistant. I need you to search for and recommend 5 weekend activities for families based on the following criteria:

**Location**: {CITY}
**Children's Ages**: {KIDS_AGES}
**Availability**: {AVAILABILITY}
**Maximum Distance**: {MILES_RANGE} miles from the city center
**Additional Preferences**: {OTHER_PREFERENCES}

Please use the web search tool to find current, real activities happening this weekend or regularly available in and around {CITY}.

For each recommendation, provide:
1. **Bold title with relevant emoji**
2. 2-4 sentences describing the activity
3. Include specific details like location, timing, age appropriateness, and any special features
4. Ensure activities are within {MILES_RANGE} miles of {CITY}
5. Consider the children's ages ({KIDS_AGES}) for age-appropriate activities
6. Factor in the availability timeframe: {AVAILABILITY}

Format your response as exactly 5 recommendations in this structure:

**🎨 Activity Name**
Description of the activity including what makes it special for families. Mention the location, timing, and why it's great for kids aged {KIDS_AGES}. Include any relevant details about cost, duration, or special features.

**🏛️ Second Activity Name**
[Description following same format...]

[Continue for all 5 activities]

Focus on activities that are:
- Actually available and operational
- Suitable for the specified age range
- Located within the distance preference
- Happening during the specified time availability
- Family-friendly and engaging for children

If additional preferences were specified ({OTHER_PREFERENCES}), make sure to incorporate those into your recommendations.
```

## Input Field Mapping

### Frontend Form Fields → Prompt Variables

| Form Field | Prompt Variable | Example Value | Notes |
|------------|----------------|---------------|-------|
| City | `{CITY}` | "San Francisco, CA" | Include state for clarity |
| Kids Ages | `{KIDS_AGES}` | "7 and 12" or "ages 5-8" | Can be specific ages or ranges |
| Availability | `{AVAILABILITY}` | "Saturday afternoon" | Time preference |
| Distance | `{MILES_RANGE}` | "20" | Numeric value only |
| Other Preferences | `{OTHER_PREFERENCES}` | "outdoor activities, educational" | Optional field |

## Example Filled Prompt

```
You are a family activity finder assistant. I need you to search for and recommend 5 weekend activities for families based on the following criteria:

**Location**: San Francisco, CA
**Children's Ages**: 7 and 12
**Availability**: Saturday afternoon
**Maximum Distance**: 15 miles from the city center
**Additional Preferences**: outdoor activities, educational

Please use the web search tool to find current, real activities happening this weekend or regularly available in and around San Francisco, CA.

[Rest of prompt structure remains the same...]
```

## Implementation Notes

### Backend Integration (Express)
```javascript
app.post('/api/search-activities', async (req, res) => {
  const { city, kidsAges, availability, distance, preferences } = req.body;

  // Fill in prompt template
  const prompt = promptTemplate
    .replace(/{CITY}/g, city)
    .replace(/{KIDS_AGES}/g, kidsAges)
    .replace(/{AVAILABILITY}/g, availability)
    .replace(/{MILES_RANGE}/g, distance)
    .replace(/{OTHER_PREFERENCES}/g, preferences || 'none specified');

  // Call Claude API with web search tool
  const response = await callClaudeAPI(prompt);

  res.json({ recommendations: response });
});
```

### Expected Response Format
The Claude API should return 5 activity recommendations, each with:
- Emoji + bold title
- 2-4 sentence description
- Location and timing details
- Age-appropriate information
- Special features or highlights

This format matches the mockup design for display in the recommendation cards.