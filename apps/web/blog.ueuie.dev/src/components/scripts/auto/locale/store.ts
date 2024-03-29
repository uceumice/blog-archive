import { type Locale, parseLocale } from '~/utils/i18n';

/* --------------------------------- Helpers -------------------------------- */
function setter(k: string, l: Locale) {
  if (parseLocale.lang(l)) {
    localStorage.setItem(k, l);
    return true;
  } else {
    return false;
  }
}

function getter(k: string) {
  const locale_ = localStorage.getItem(k);
  if (parseLocale.lang(locale_)) {
    return locale_ as Locale;
  }
  return null;
}

/* ---------------------------------- Store --------------------------------- */
export const store = {
  // ?? locale set as prefered or infered from the prefix
  // !! this is the locale which sets the rendering language
  selected: {
    set: (l: Locale) => setter('locale', l),
    get: () => getter('locale'),
  },
  // ?? locale set as prefered (location/manually)
  // ?? -> avoids rewriting prefered locale with a [lang] prefix
  prefered: {
    set: (l: Locale) => setter('pref.locale', l),
    get: () => getter('pref.locale'),
  },
  prefixed: {
    set: (l: boolean) => {
      if (typeof l !== 'boolean') return false;
      localStorage.setItem('prefixed', l ? '+' : '-');
      return true;
    },
    get: () => {
      const prefixed_ = localStorage.getItem('prefixed');
      if (prefixed_) {
        if (prefixed_ === '+') return true;
        if (prefixed_ === '-') return false;
      }
      return null;
    },
  },
};
