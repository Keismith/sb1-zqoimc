import { create } from 'zustand';
import { TechnologyInput, MetricTarget, TechnologyCategory } from '../types';

interface TechnologyState {
  input: TechnologyInput;
  category: TechnologyCategory | null;
  metricTargets: MetricTarget[];
  feedback: string | null;
  isLoading: boolean;
  error: string | null;
  setInput: (input: TechnologyInput) => void;
  setCategory: (category: TechnologyCategory) => void;
  setMetricTargets: (targets: MetricTarget[]) => void;
  setFeedback: (feedback: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTechnologyStore = create<TechnologyState>((set) => ({
  input: {
    name: '',
    goals: [],
    priorities: [],
    otherInputs: [],
  },
  category: null,
  metricTargets: [],
  feedback: null,
  isLoading: false,
  error: null,
  setInput: (input) => set({ input }),
  setCategory: (category) => set({ category }),
  setMetricTargets: (targets) => set({ metricTargets: targets }),
  setFeedback: (feedback) => set({ feedback }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));