import React from 'react';
import { BarChart, Download, Loader, AlertCircle } from 'lucide-react';
import { useTechnologyStore } from '../store/technologyStore';
import { MetricTarget } from '../types';
import { generatePDF } from '../utils/pdfGenerator';

export function MetricsDisplay() {
  const { 
    input, 
    metricTargets, 
    category, 
    feedback,
    isLoading,
    error,
    setFeedback,
    setError
  } = useTechnologyStore();

  const handleDownload = () => {
    generatePDF(input, metricTargets);
  };

  const retryFeedback = () => {
    setFeedback(null);
    setError(null);
  };

  if (!input.name) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
        <div className="text-center py-12">
          <BarChart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Assessment Data</h3>
          <p className="text-gray-500">
            Submit the assessment form to view AI analysis and metrics
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BarChart className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Assessment Results</h2>
          </div>
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition duration-200"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </button>
        </div>

        <div className="space-y-6">
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold mb-3">Technology Details</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {input.name}</p>
              <div>
                <p className="font-medium mb-1">Goals:</p>
                <ul className="list-disc list-inside pl-4">
                  {input.goals.map((goal, index) => (
                    <li key={index} className="text-gray-700">{goal}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium mb-1">Priorities:</p>
                <ul className="list-disc list-inside pl-4">
                  {input.priorities.map((priority, index) => (
                    <li key={index} className="text-gray-700">{priority}</li>
                  ))}
                </ul>
              </div>
              {input.cost && (
                <p><span className="font-medium">Cost:</span> ${input.cost}</p>
              )}
            </div>
          </div>

          {metricTargets.length > 0 && (
            <div className="grid gap-4">
              {metricTargets.map((metric: MetricTarget, index: number) => (
                <div 
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition duration-200"
                >
                  <h3 className="font-medium text-gray-900 mb-2">{metric.name}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        Target: {metric.target}
                      </span>
                      <span className="text-gray-500">
                        Unit: {metric.unit}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 mt-6">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">AI Analysis & Feedback</h2>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-6 h-6 text-blue-600 animate-spin" />
            <span className="ml-2 text-gray-600">Generating AI analysis...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 mt-0.5" />
              <div>
                <p className="font-medium">Error generating analysis</p>
                <p className="mt-1 text-sm">{error}</p>
                <button
                  onClick={retryFeedback}
                  className="mt-3 inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-700 hover:text-red-800 hover:bg-red-100 rounded-md transition duration-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        ) : feedback ? (
          <div className="prose prose-blue max-w-none">
            {feedback.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              )
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}