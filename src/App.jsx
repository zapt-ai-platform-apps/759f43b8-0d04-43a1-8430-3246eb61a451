import { createSignal, onMount, For, Show } from 'solid-js';
import { createEvent, supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-solid';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { SolidMarkdown } from "solid-markdown";
import { useI18n } from 'solid-i18n';

function App() {
  const [t, { locale }] = useI18n();
  const [jokes, setJokes] = createSignal([]);
  const [newJoke, setNewJoke] = createSignal({ setup: '', punchline: '' });
  const [user, setUser] = createSignal(null);
  const [currentPage, setCurrentPage] = createSignal('login');
  const [loading, setLoading] = createSignal(false);
  const [generatedImage, setGeneratedImage] = createSignal('');
  const [audioUrl, setAudioUrl] = createSignal('');
  const [markdownText, setMarkdownText] = createSignal('');

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setCurrentPage('homePage');
    }
  };

  onMount(() => {
    checkUserSignedIn();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
        setCurrentPage('homePage');
      } else {
        setUser(null);
        setCurrentPage('login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentPage('login');
  };

  const fetchJokes = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const response = await fetch('/api/getJokes', {
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      setJokes(data);
    } else {
      console.error('Error fetching jokes:', response.statusText);
    }
  };

  const saveJoke = async (e) => {
    e.preventDefault();
    const { data: { session } } = await supabase.auth.getSession();
    try {
      const response = await fetch('/api/saveJoke', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJoke()),
      });
      if (response.ok) {
        setJokes([...jokes(), newJoke()]);
        setNewJoke({ setup: '', punchline: '' });
      } else {
        console.error('Error saving joke');
      }
    } catch (error) {
      console.error('Error saving joke:', error);
    }
  };

  onMount(() => {
    if (user()) fetchJokes();
  });

  const handleGenerateJoke = async () => {
    setLoading(true);
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: 'أعطني نكتة باللغة العربية بصيغة JSON بالهيكل التالي: { "setup": "بداية النكتة", "punchline": "نهاية النكتة" }',
        response_type: 'json'
      });
      setNewJoke(result);
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    setLoading(true);
    try {
      const result = await createEvent('generate_image', {
        prompt: 'شخصية كرتونية مضحكة تروي نكتة'
      });
      setGeneratedImage(result);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTextToSpeech = async () => {
    setLoading(true);
    try {
      const result = await createEvent('text_to_speech', {
        text: `${newJoke().setup} ... ${newJoke().punchline}`
      });
      setAudioUrl(result);
    } catch (error) {
      console.error('Error converting text to speech:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkdownGeneration = async () => {
    setLoading(true);
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: 'اكتب قصة قصيرة ومضحكة حول فكاهي بتنسيق Markdown',
        response_type: 'text'
      });
      setMarkdownText(result);
    } catch (error) {
      console.error('Error generating markdown:', error);
    } finally {
      setLoading(false);
    }
  };

  const isArabic = () => locale() === 'ar';

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4" dir={isArabic() ? 'rtl' : 'ltr'}>
      <Show
        when={currentPage() === 'homePage'}
        fallback={
          <div class="flex items-center justify-center min-h-screen">
            <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
              <h2 class="text-3xl font-bold mb-6 text-center text-purple-600">{t('signInWithZapt')}</h2>
              <a
                href="https://www.zapt.ai"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-500 hover:underline mb-6 block text-center"
              >
                {t('learnMore')}
              </a>
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={['google', 'facebook', 'apple']}
                magicLink={true}
                view="magic_link"
                showLinks={false}
                onlyThirdPartyProviders={true}
              />
            </div>
          </div>
        }
      >
        <div class="max-w-6xl mx-auto">
          <div class="flex justify-between items-center mb-8">
            <h1 class="text-4xl font-bold text-purple-600">{t('jokeCentral')}</h1>
            <button
              class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              onClick={handleSignOut}
            >
              {t('signOut')}
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="col-span-1 md:col-span-2 lg:col-span-1">
              <h2 class="text-2xl font-bold mb-4 text-purple-600">{t('addNewJoke')}</h2>
              <form onSubmit={saveJoke} class="space-y-4">
                <input
                  type="text"
                  placeholder={t('setupPlaceholder')}
                  value={newJoke().setup}
                  onInput={(e) => setNewJoke({ ...newJoke(), setup: e.target.value })}
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
                  required
                  aria-label={t('setupPlaceholder')}
                />
                <input
                  type="text"
                  placeholder={t('punchlinePlaceholder')}
                  value={newJoke().punchline}
                  onInput={(e) => setNewJoke({ ...newJoke(), punchline: e.target.value })}
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
                  required
                  aria-label={t('punchlinePlaceholder')}
                />
                <div class="flex space-x-4">
                  <button
                    type="submit"
                    class="flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                    disabled={loading()}
                  >
                    {t('saveJoke')}
                  </button>
                  <button
                    type="button"
                    class={`flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 ${loading() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={handleGenerateJoke}
                    disabled={loading()}
                  >
                    <Show when={loading()}>{t('generating')}</Show>
                    <Show when={!loading()}>{t('generateJoke')}</Show>
                  </button>
                </div>
              </form>
            </div>

            <div class="col-span-1 md:col-span-2 lg:col-span-1">
              <h2 class="text-2xl font-bold mb-4 text-purple-600">{t('jokeList')}</h2>
              <div class="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-4">
                <For each={jokes()}>
                  {(joke) => (
                    <div class="bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                      <p class="font-semibold text-lg text-purple-600 mb-2">{joke.setup}</p>
                      <p class="text-gray-700">{joke.punchline}</p>
                    </div>
                  )}
                </For>
              </div>
            </div>

            <div class="col-span-1 md:col-span-2 lg:col-span-1">
              <h2 class="text-2xl font-bold mb-4 text-purple-600">{t('additionalFeatures')}</h2>
              <div class="space-y-4">
                <button
                  onClick={handleGenerateImage}
                  class="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                  disabled={loading()}
                >
                  {t('generateImage')}
                </button>
                <Show when={newJoke().setup && newJoke().punchline}>
                  <button
                    onClick={handleTextToSpeech}
                    class="w-full px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                    disabled={loading()}
                  >
                    {t('textToSpeech')}
                  </button>
                </Show>
                <button
                  onClick={handleMarkdownGeneration}
                  class="w-full px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                  disabled={loading()}
                >
                  {t('generateMarkdown')}
                </button>
              </div>
            </div>
          </div>

          <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Show when={generatedImage()}>
              <div>
                <h3 class="text-xl font-bold mb-2 text-purple-600">{t('generatedImage')}</h3>
                <img src={generatedImage()} alt={t('generatedImage')} class="w-full rounded-lg shadow-md" />
              </div>
            </Show>
            <Show when={audioUrl()}>
              <div>
                <h3 class="text-xl font-bold mb-2 text-purple-600">{t('audioJoke')}</h3>
                <audio controls src={audioUrl()} class="w-full" aria-label={t('audioJoke')} />
              </div>
            </Show>
            <Show when={markdownText()}>
              <div>
                <h3 class="text-xl font-bold mb-2 text-purple-600">{t('markdownStory')}</h3>
                <div class="bg-white p-4 rounded-lg shadow-md">
                  <SolidMarkdown children={markdownText()} />
                </div>
              </div>
            </Show>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default App;