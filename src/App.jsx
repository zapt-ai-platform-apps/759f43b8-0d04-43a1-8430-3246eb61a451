import { createSignal, onMount } from 'solid-js';
import { createEvent } from './supabaseClient';

function App() {
  const [listening, setListening] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [conversationActive, setConversationActive] = createSignal(false);
  let recognition;

  const initRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('متصفحك لا يدعم التعرف على الكلام');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setListening(false);
      await getAIResponse(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event);
      setListening(false);
      if (conversationActive()) {
        startListening();
      }
    };

    recognition.onend = () => {
      setListening(false);
      if (conversationActive()) {
        startListening();
      }
    };
  };

  onMount(() => {
    initRecognition();
  });

  const startListening = () => {
    if (listening() || !conversationActive()) return;
    recognition.start();
  };

  const stopListening = () => {
    if (listening()) {
      recognition.stop();
    }
    setConversationActive(false);
  };

  const toggleConversation = () => {
    if (conversationActive()) {
      stopListening();
    } else {
      setConversationActive(true);
      startListening();
    }
  };

  const getAIResponse = async (text) => {
    setLoading(true);
    try {
      const aiResponse = await createEvent('chatgpt_request', {
        prompt: `من فضلك، قدم إجابة احترافية ومتوافقة على السؤال التالي: "${text}"`,
        response_type: 'text',
      });

      const audioUrl = await createEvent('text_to_speech', {
        text: aiResponse,
      });

      await playAudio(audioUrl);
    } catch (error) {
      console.error('Error getting AI response:', error);
    } finally {
      setLoading(false);
    }
  };

  const playAudio = (url) => {
    return new Promise((resolve) => {
      const audio = new Audio(url);
      audio.play();
      audio.onended = () => {
        resolve();
      };
    });
  };

  return (
    <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4 text-gray-800" dir="rtl">
      <div class="max-w-md w-full text-center">
        <h1 class="text-3xl font-bold mb-6 text-gray-800">محادثة صوتية مع الذكاء الاصطناعي</h1>
        <button
          class={`w-48 h-48 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-xl flex items-center justify-center mx-auto mb-4 transition duration-300 ease-in-out transform ${
            loading() ? 'scale-90 cursor-not-allowed opacity-50' : 'hover:scale-105 cursor-pointer'
          }`}
          onClick={toggleConversation}
          disabled={loading()}
          aria-label="بدء وإيقاف المحادثة"
        >
          {conversationActive() ? 'إيقاف المحادثة' : 'بدء المحادثة'}
        </button>
        <p class="text-gray-600">
          {listening()
            ? 'يرجى التحدث، نحن نستمع...'
            : loading()
            ? 'جاري الحصول على الاستجابة...'
            : conversationActive()
            ? 'المحادثة نشطة. اضغط على الزر لإيقافها.'
            : 'اضغط على الدائرة أعلاه لبدء المحادثة'}
        </p>
      </div>
    </div>
  );
}

export default App;