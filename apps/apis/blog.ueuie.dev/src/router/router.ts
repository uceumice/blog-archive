import { t } from '../server/trpc';
import { newsletter } from './modules/newsletters/router';
import { information } from './modules/information/router';

/* --------------------------------- router --------------------------------- */
export const router = t.router({ newsletter, information });
export type Router = typeof router;
