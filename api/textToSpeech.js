import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { text } = req.body;
    const response = await fetch('https://api.your-text-to-speech.com/synthesize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TEXT_TO_SPEECH_API_KEY}`
      },
      body: JSON.stringify({ text, voice: 'ar-Arabic' })
    });

    const audioBuffer = await response.buffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    res.status(200).send(audioBuffer);
  } catch (error) {
    console.error('Error in text to speech:', error);
    res.status(500).json({ error: 'Error synthesizing speech' });
  }
}