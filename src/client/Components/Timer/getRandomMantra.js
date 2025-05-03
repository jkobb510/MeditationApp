import mantrasData from './mantras.json';

const useOpenAI = false; // Toggle this to true when you want dynamic generation

const getRandomMantra = async () => {
  if (!useOpenAI) {
    return mantrasData.mantras[Math.floor(Math.random() * mantrasData.mantras.length)];
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: "system", content: "Generate a Zen-like koan or mantra under 15 words." }
        ],
        max_tokens: 30,
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    const aiText = data.choices?.[0]?.message?.content?.trim();
    return aiText || mantrasData.mantras[Math.floor(Math.random() * mantrasData.mantras.length)];
  } catch (error) {
    console.error('OpenAI API error, falling back to local mantra.', error);
    return mantrasData.mantras[Math.floor(Math.random() * mantrasData.mantras.length)];
  }
};

export default getRandomMantra; 