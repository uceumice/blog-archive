import { interpret } from "xstate";
import { xstate } from "./xstate";
import { store } from "./store";

// execute logic
// interpret(xstate).start().onDone(() => {
//     console.log(`LOCALE: ${store.selected.get()}`)
// });

