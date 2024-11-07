import React, { useState } from 'react';
import { TechnologyForm } from './components/TechnologyForm';
import { MetricsList } from './components/MetricsList';
import { ErrorMessage } from './components/ErrorMessage';
import { analyzeTechnology } from './services/openai';
import { MetricsResult, TechnologyInput } from './types';

export default function App() {
  const [metrics, setMetrics] = useState<MetricsResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: TechnologyInput) => {
    setError(null);
    setLoading(true);
    
    try {
      const result = await analyzeTechnology(data);
      setMetrics(result);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'An unexpected error occurred. Please check your API key and try again.';
      setError(errorMessage);
      setMetrics(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Tech Adoption Metrics</h1>
        <p className="text-gray-600 mb-6">
          Input your technology name, goals, and any other information to receive metrics and benchmarks that will best track its effectiveness.
        </p>
        
        <TechnologyForm onSubmit={handleSubmit} disabled={loading} />
        
        {error && <ErrorMessage message={error} />}
        {loading && (
          <div className="mt-4 text-center text-gray-600">
            Analyzing technology...
          </div>
        )}
        {metrics && <MetricsList metrics={metrics} />}
      </div>
    </div>
  );
}