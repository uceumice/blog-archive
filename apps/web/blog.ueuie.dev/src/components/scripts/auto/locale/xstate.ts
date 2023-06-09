import { assign, createMachine } from 'xstate';
import { Locale, parseLocale } from '~/utils/i18n';
import { locales } from '~/utils/i18n';
import { store } from './store';

/* -------------------------------------------------------------------------- */
/*                               XState Typings                               */
/* -------------------------------------------------------------------------- */
interface Context {
  selected: Locale | null;
  prefixed: null | boolean;
}

/* -------------------------------------------------------------------------- */
/*                              XState Definition                             */
/* -------------------------------------------------------------------------- */
export const xstate = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOhgBdyCoB9AGwHtN06waAjATxoFcAnOjQAOfMADNcADwDEAbQAMAXUSghDWLioN8KkJMQBmeQBYSARmMBWeQCZjt+QHZrxgDQhOiABxmSxxwCcQQHyAQBsAWZhjsYAvrHuaFh4hKQUVPi0jMysHNz8giLiUnJmykggahpaOhX6CEamFtZ2Ds4m7p4IxgGWJF6WLcb21gGOjvGJGDgExGRglNT0TCxsXDSw5AyiEMKiYmCi+Jhgckq6VZq42rr1jl5eJGFW8mHRzgaRZp2Ilmby5nkQJsf0cRjMZi8BkmICSM1S80WmWWOTW3E220ge3EhzAx1OsjKF3UVxudUQ90ez2sb3Glk+EJ+DXpJEc8haBihUVCYUsMLhKTmB3I8KyK1y60wYmkEG0YBIBAAbgwANbygWzUjC0Uo1Z5GhShBKlY1BSKM3E6rXWqgeoQsK+ULWMEGGwOgzjJkGYYkGxeYE2eRmSyBgIDfnTQVahY67J6yXSw58bYkIR0dDkMTbVAkDUI7UpMWo-WG43MU1KC0VS41W6Ie2O3pOAyu92ejyIGx2Py8oEeyz2UKOMIR5KaxEZIt6sQsOjsLAqs7lVQk2vkhDBwZ+dpBSy8kEGSxMrumYy90JWN2BYw2eIJED4BgQOC6PPES2km16RAAWjCTL-Ud4TmdIljjCV8gEbEJHqFcrTJW1EBvJkrDCEhDxaB5A0+LwrCAqMJzA8U0Q2LYdmg3F8Q-NdEO6N5+hCEw-RBSwAldNwO26NkniBWwzCCIEvDCW97zfaMRULXUIINMRqOtOsEF6XxPkEwZ-Rsb0vT9PxrHkQ83ldRw7Hw8dQORcC2BnOg5wXOSEO-DcDDMRxWV0qEPQMCI3SZfiAhIXpgndMInJsIyTIRXAIFYOyvztN4ARDP4QVCPsoS9V1zAHdkQ2MJynACO9YiAA */
    tsTypes: {} as import('./xstate.typegen').Typegen0,
    predictableActionArguments: true,
    context: {
      selected: null,
      prefixed: null,
    },
    schema: {
      context: {} as Context,
      services: {} as {
        'fetch.cf': { data: Locale };
      },
    },
    initial: 'getting_locale_by_url_prefix',
    states: {
      // [1] /[lang]/... detection
      getting_locale_by_url_prefix: {
        entry: 'get.locale.by.url.prefix',
        always: [
          {
            cond: 'empty',
            target: 'getting_locale_by_stored_preference',
          },
          {
            target: 'idle',
          },
        ],
      },
      // [2] `pref.locale` detection
      getting_locale_by_stored_preference: {
        entry: 'get.locale.by.stored.preference',
        always: [
          {
            cond: 'empty',
            target: 'getting_locale_by_cf_headers',
          },
          {
            target: 'idle',
          },
        ],
      },
      // [3] `request.cf` detection
      getting_locale_by_cf_headers: {
        invoke: {
          src: 'fetch.cf',
          onDone: {
            target: 'idle',
            actions: assign({ selected: (_, { data }) => data as Locale }),
          },
          onError: {
            target: 'getting_locale_fallback',
          },
        },
      },
      // [4] fallback to english, as international language
      getting_locale_fallback: {
        entry: 'get.locale.fallback',
        always: {
          target: 'idle',
        },
      },
      idle: {
        type: 'final',
        entry: 'sync.to.local-storage',
      },
    },
  },
  {
    actions: {
      'get.locale.by.url.prefix': assign(() => {
        const [prefix] = window.location.pathname.slice(1).split('/');
        if (!prefix) return { prefixed: false };

        const locale = parseLocale(prefix);
        if (!locale) return { prefixed: false };

        return { selected: locale, prefixed: true };
      }),
      'get.locale.by.stored.preference': assign({
        selected: store.prefered.get(),
      }),
      'get.locale.fallback': assign({
        selected: locales[0],
      }),
      /* ---------------------------------- sync ---------------------------------- */
      'sync.to.local-storage': (ctx) => {
        // [1] set selected locale
        store.selected.set(ctx.selected!);

        // [2] check if the prefered locale is set, if not set
        const prefered_ = store.prefered.get();
        if (prefered_ === null || parseLocale(prefered_) === null) {
          store.prefered.set(ctx.selected!);
        }

        // [3] set prefixed flag
        store.prefixed.set(!!ctx.prefixed);
      },
    },
    services: {
      'fetch.cf': async () => {
        const response = await fetch(`${import.meta.env.DEV ? 'http://localhost:3000' : import.meta.env.SITE}/apis_/locale`).then((res) =>
          res.json()
        );
        if (!response) throw Error();
        if (!parseLocale(response)) throw Error();
        return response as Locale;
      },
    },
    guards: {
      empty: ({ selected }) => {
        return selected === null;
      },
    },
  }
);
