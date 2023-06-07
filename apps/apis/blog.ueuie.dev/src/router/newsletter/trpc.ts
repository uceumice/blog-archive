import { router } from "../trpc";
import { add } from "./add";

/* --------------------------------- router --------------------------------- */
export const newsletter = router({ add });