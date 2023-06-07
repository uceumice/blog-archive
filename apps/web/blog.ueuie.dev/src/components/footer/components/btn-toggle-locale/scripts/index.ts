import { interpret } from "xstate";
import { xstate } from "./xstate";
import { btn } from "./select";

const service = interpret(xstate).start();

/* -------------------------------------------------------------------------- */
/*                  XState Register Listeners/Event Emitters                  */
/* -------------------------------------------------------------------------- */
btn.onmouseenter, btn.onmouseover = () => service.send('OPENED');
btn.onmouseleave, btn.onmouseout = () => service.send('CLOSED');
btn.onclick = () => service.send('TOGGLE');