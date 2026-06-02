import { calculateTier } from './tierRules';

export interface PlanGenerationRequest {
  mental: number;
  physical: number;
  spiritual: number;
  financial: number;
  environment_context: string;
  capacity_score?: number;
}

export interface GeneratedPlan {
  primary_focus_pillar: string;
  duration_days: number;
  daily_tasks: Record<number, string>;
}

const TASK_POOLS: Record<number, Record<string, string[]>> = {
  1: {
    mental: ["Sit quietly for 2 minutes. Breathe.", "Acknowledge one thought, let it pass."],
    physical: ["Stretch your neck gently.", "Stand up and walk for 60 seconds."],
    spiritual: ["Close your eyes. Find one sound you hear.", "Think of one person who brings you peace."],
    financial: ["Check your bank balance.", "Write down one thing you spent money on today."],
  },
  2: {
    mental: ["Journal for 5 minutes.", "Set one intention for the day."],
    physical: ["Walk for 10 minutes.", "Prepare one healthy meal."],
    spiritual: ["Practice 5 minutes of stillness.", "Read one paragraph of inspiration."],
    financial: ["Track today's spending.", "Set a daily budget limit."],
  },
  3: {
    mental: ["Learn one new concept.", "Complete a focused 25-minute task."],
    physical: ["Perform 20 minutes of exercise.", "Follow a sleep routine."],
    spiritual: ["Meditate for 15 minutes.", "Practice gratitude journaling."],
    financial: ["Automate one bill payment.", "Categorize your weekly expenses."],
  },
  4: {
    mental: ["Reflect on your progress.", "Journal about your long-term goal."],
    physical: ["Complete a 30-minute high-intensity workout.", "Prepare a balanced meal from scratch."],
    spiritual: ["Dedicate 15 minutes to meditation.", "Write a letter of gratitude."],
    financial: ["Analyze your monthly budget trend.", "Automate one savings transfer."],
  }
};

export const generatePlan = (input: PlanGenerationRequest): GeneratedPlan => {
  const scores = { mental: input.mental, physical: input.physical, spiritual: input.spiritual, financial: input.financial };
  const primary_focus_pillar = (Object.keys(scores) as Array<keyof typeof scores>).reduce((a, b) => scores[a] < scores[b] ? a : b);
  const duration_days = (input.capacity_score ?? 0) > 5 ? 14 : 7;
  const tier = calculateTier(input.mental, input.physical, input.spiritual, input.financial);
  
  const daily_tasks: Record<number, string> = {};
  for (let i = 1; i <= duration_days; i++) {
    const pool = TASK_POOLS[tier]?.[primary_focus_pillar] || ["Focus on daily maintenance."];
    daily_tasks[i] = pool[i % pool.length];
  }

  return { primary_focus_pillar, duration_days, daily_tasks };
};
