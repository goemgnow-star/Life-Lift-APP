import { t } from '../trpc';
import { assessmentRouter } from './assessment';
import { hopeRouter } from './hope';
import { habitsRouter } from './habits';
import { journalRouter } from './journal';
import { settingsRouter } from './settings';

export const appRouter = t.router({
  assessment: assessmentRouter,
  hope: hopeRouter,
  habits: habitsRouter,
  journal: journalRouter,
  settings: settingsRouter,
});

export type AppRouter = typeof appRouter;
