import { t } from "@/server/trpc";
import { add } from "./add";

/* --------------------------------- router --------------------------------- */
export const newsletter = t.router({ add });