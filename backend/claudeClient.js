const Anthropic = require('@anthropic-ai/sdk');

// Initialize the Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Function to call Claude API with web search tool
async function getActivityRecommendations(city, kidsAges, availability, distance, preferences) {
  try {
    // Read the prompt template from prompt.md (we'll implement this)
    const promptTemplate = getPromptTemplate();

    // Fill in the template with user inputs
    const prompt = promptTemplate
      .replace(/{CITY}/g, city)
      .replace(/{KIDS_AGES}/g, kidsAges)
      .replace(/{AVAILABILITY}/g, availability)
      .replace(/{MILES_RANGE}/g, distance)
      .replace(/{OTHER_PREFERENCES}/g, preferences || 'none specified');

    // Configure the API call without web search tool (for testing)
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 800,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    return response.content[0].text;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}

// Function to get the prompt template (clearer format instructions)
function getPromptTemplate() {
  return `Please provide exactly 5 family activities in {CITY} for kids aged {KIDS_AGES}, available {AVAILABILITY}, within {MILES_RANGE} miles. Additional preferences: {OTHER_PREFERENCES}.

Return your response in this exact format:

**🎨 Activity Name**
Description with location and timing details.

**🏛️ Second Activity Name**
Description with location and timing details.

**⚽ Third Activity Name**
Description with location and timing details.

**🎪 Fourth Activity Name**
Description with location and timing details.

**🌳 Fifth Activity Name**
Description with location and timing details.

Important: You must provide exactly 5 activities with bold titles and emojis. Do not stop after just acknowledging the request.`;
}

module.exports = {
  getActivityRecommendations
};