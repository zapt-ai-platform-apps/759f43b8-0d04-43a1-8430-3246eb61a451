import { render } from 'solid-js/web';
import App from './App';
import './index.css';
import { I18nContext, createI18n } from 'solid-i18n';
import en from './locales/en.json';
import ar from './locales/ar.json';

const i18n = createI18n({
  language: 'ar',
  locales: ['en', 'ar'],
  dict: {
    en,
    ar
  }
});

window.progressierAppRuntimeSettings = {
  uid: import.meta.env.VITE_PUBLIC_APP_ID,
  icon512: "https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=512&height=512",
  name: "New App",
  shortName: "New App"
};
let script = document.createElement('script');
script.setAttribute('src', 'https://progressier.app/z8yY3IKmfpDIw3mSncPh/script.js');
script.setAttribute('defer', 'true');
document.querySelector('head').appendChild(script);

render(() => (
  <I18nContext.Provider value={i18n}>
    <App />
  </I18nContext.Provider>
), document.getElementById('root'));