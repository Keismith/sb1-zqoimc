import OpenAI from 'openai';

const getApiKey = () => {
  const key = import.meta.env.VITE_OPENAI_API_KEY;
  if (!key) {
    throw new Error(
      'OpenAI API key is missing. Please add VITE_OPENAI_API_KEY to your .env file. ' +
      'See .env.example for reference.'
    );
  }
  return key;
};

const createOpenAIClient = () => {
  try {
    return new OpenAI({
      apiKey: getApiKey(),
      dangerouslyAllowBrowser: true
    });
  } catch (error) {
    console.error('Failed to initialize OpenAI client:', error);
    throw error;
  }
};

export const generateFeedback = async (input: {
  name: string;
  goals: string[];
  priorities: string[];
  cost?: number;
}) => {
  if (!input.name || !input.goals.length || !input.priorities.length) {
    throw new Error('Invalid input: Name, goals, and priorities are required.');
  }

  try {
    const openai = createOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert educational technology consultant. Analyze the provided technology details and provide specific, actionable feedback."
        },
        {
          role: "user",
          content: `Please analyze this educational technology:
            Name: ${input.name}
            Goals: ${input.goals.join(', ')}
            Priorities: ${input.priorities.join(', ')}
            ${input.cost ? `Cost: $${input.cost}` : ''}
            
            Provide specific feedback on:
            1. How well the technology aligns with the stated goals
            2. Potential implementation challenges
            3. Recommendations for successful integration
            4. Cost-effectiveness analysis (if cost is provided)
            `
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    if (!response.choices[0]?.message?.content) {
      throw new Error('No feedback generated from OpenAI');
    }

    return response.choices[0].message.content;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error generating feedback:', error.message);
      if (error.message.includes('API key')) {
        throw new Error('Invalid API key configuration. Please check your settings.');
      }
    }
    throw new Error('Failed to generate feedback. Please try again.');
  }
};