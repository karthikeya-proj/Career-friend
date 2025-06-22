import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/ask', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post('http://localhost:11434/api/chat', {
      model: 'llama3',
      messages: [
        {
          role: 'system',
          content:
            'You are CareerBot, a smart AI created  for the Qualcomm Hackathon on 14/06/2025. You help users with career guidance. If asked who created you, reply: "Quallcomm hackathon team 2025."  If asked when you were created, reply: "14th June 2025". Do not mention llama3 or Ollama.',
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
      stream: false, // very important: makes the response return as a complete JSON
    });

    const botReply = response.data.message?.content || "No reply generated.";
    res.json({ reply: botReply });
  } catch (error) {
    console.error('❌ AXIOS ERROR:', error?.response?.data || error.message);
    res.status(500).json({ error: error?.response?.data || "Something went wrong" });
  }
});

app.listen(5000, () => {
  console.log('✅ Server running on http://localhost:5000');
});
