import { createSignal } from 'solid-js';
import { createEvent } from './supabaseClient';

function App() {
  const [listening, setListening] = createSignal(false);
  const [recognition, setRecognition] = createSignal(null);
  const [responseAudio, setResponseAudio] = createSignal(null);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('متصفحك لا يدعم التعرف على الكلام');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recog = new SpeechRecognition();
    recog.lang = 'ar-SA';
    recog.continuous = false;
    recog.interimResults = false;

    recog.onstart = () => {
      setListening(true);
    };

    recog.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setListening(false);
      await getAIResponse(transcript);
    };

    recog.onerror = (event) => {
      console.error('Speech recognition error', event);
      setListening(false);
    };

    recog.onend = () => {
      setListening(false);
    };

    setRecognition(recog);
    recog.start();
  };

  const getAIResponse = async (text) => {
    try {
      const aiResponse = await createEvent('chatgpt_request', {
        prompt: text,
        response_type: 'text'
      });

      const audioUrl = await createEvent('text_to_speech', {
        text: aiResponse
      });

      setResponseAudio(audioUrl);
      playAudio(audioUrl);
    } catch (error) {
      console.error('Error getting AI response:', error);
    }
  };

  const playAudio = (url) => {
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4 text-gray-800" dir="rtl">
      <div class="max-w-md w-full text-center">
        <h1 class="text-3xl font-bold mb-6">محادثة صوتية مع الذكاء الاصطناعي</h1>
        <button
          class={`w-48 h-48 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-xl flex items-center justify-center mx-auto mb-4 transition duration-300 ease-in-out transform ${listening() ? 'scale-90' : 'hover:scale-105'} cursor-pointer`}
          onClick={startListening}
          disabled={listening()}
          aria-label="اضغط للتحدث"
        >
          {listening() ? 'استمع...' : 'اضغط للتحدث'}
        </button>
        <p class="text-gray-600">{listening() ? 'يرجى التحدث، نحن نستمع...' : 'اضغط على الدائرة أعلاه لبدء التحدث'}</p>
      </div>
    </div>
  );
}

export default App;