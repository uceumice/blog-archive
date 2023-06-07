
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"done.invoke.(machine).getting_locale_by_cf_headers:invocation[0]": { type: "done.invoke.(machine).getting_locale_by_cf_headers:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.(machine).getting_locale_by_cf_headers:invocation[0]": { type: "error.platform.(machine).getting_locale_by_cf_headers:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "fetch.cf": "done.invoke.(machine).getting_locale_by_cf_headers:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "get.locale.by.stored.preference": "";
"get.locale.by.url.prefix": "xstate.init";
"get.locale.fallback": "error.platform.(machine).getting_locale_by_cf_headers:invocation[0]";
"sync.to.local-storage": "" | "done.invoke.(machine).getting_locale_by_cf_headers:invocation[0]";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "empty": "";
        };
        eventsCausingServices: {
          "fetch.cf": "";
        };
        matchesStates: "getting_locale_by_cf_headers" | "getting_locale_by_stored_preference" | "getting_locale_by_url_prefix" | "getting_locale_fallback" | "idle";
        tags: never;
      }
  