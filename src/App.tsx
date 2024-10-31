import React from 'react';
import { Layers } from 'lucide-react';
import { InputForm } from './components/InputForm';
import { MetricsDisplay } from './components/MetricsDisplay';
import { TechnologyInput } from './types';
import { useTechnologyStore } from './store/technologyStore';
import { generateFeedback } from './utils/openai';

function App() {
  const { setInput, setFeedback, setIsLoading, setError } = useTechnologyStore();

  const handleSubmit = async (data: TechnologyInput) => {
    const cleanedData = {
      ...data,
      goals: data.goals.filter(goal => goal.trim() !== ''),
      priorities: data.priorities.filter(priority => priority.trim() !== ''),
      otherInputs: data.otherInputs?.filter(input => input.trim() !== ''),
    };
    
    setInput(cleanedData);
    setIsLoading(true);
    setError(null);
    
    try {
      const feedback = await generateFeedback(cleanedData);
      setFeedback(feedback);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate feedback';
      setError(errorMessage);
      console.error('Feedback generation error:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Layers className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Educational Technology Assessment
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Evaluate and track your educational technology metrics with our comprehensive assessment tool
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Input Details</h2>
            <InputForm onSubmit={handleSubmit} />
          </div>

          <div className="space-y-6">
            <MetricsDisplay />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;