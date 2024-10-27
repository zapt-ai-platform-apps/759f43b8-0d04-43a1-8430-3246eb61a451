import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { audioData } = req.body;
    const response = await fetch('https://api.your-speech-to-text.com/recognize', {
      method: 'POST',
      headers: {
        'Content-Type': 'audio/wav',
        'Authorization': `Bearer ${process.env.SPEECH_TO_TEXT_API_KEY}`
      },
      body: audioData
    });

    const data = await response.json();
    res.status(200).json({ text: data.text });
  } catch (error) {
    console.error('Error in speech to text:', error);
    res.status(500).json({ error: 'Error processing speech' });
  }
}