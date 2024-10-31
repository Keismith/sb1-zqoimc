import React from 'react';
import { FormFieldProps } from '../../types';
import { AlertCircle } from 'lucide-react';

export function FormField({ label, error, required, children }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <div className="flex items-center text-red-600">
          <AlertCircle className="w-4 h-4 mr-1" />
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}