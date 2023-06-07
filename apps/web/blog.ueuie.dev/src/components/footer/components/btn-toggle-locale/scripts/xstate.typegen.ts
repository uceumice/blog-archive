
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"xstate.init": { type: "xstate.init" };
"xstate.stop": { type: "xstate.stop" };
        };
        invokeSrcNameMap: {
          
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "content.selected.next": "TOGGLE";
"content.selected.sync": "TOGGLE";
"content.selected.sync.tooltip-content": "" | "TOGGLE" | "xstate.stop";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          
        };
        matchesStates: "content" | "content.idle" | "content.init" | "tooltip" | "tooltip.closed" | "tooltip.opened" | { "content"?: "idle" | "init";
"tooltip"?: "closed" | "opened"; };
        tags: never;
      }
  