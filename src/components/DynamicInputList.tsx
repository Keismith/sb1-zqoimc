import React from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { PlusCircle, MinusCircle, AlertCircle } from 'lucide-react';
import { TechnologyInput } from '../types';

interface DynamicInputListProps {
  label: string;
  fieldName: keyof Pick<TechnologyInput, 'goals' | 'priorities' | 'otherInputs'>;
  register: UseFormRegister<TechnologyInput>;
  watch: UseFormWatch<TechnologyInput>;
  setValue: UseFormSetValue<TechnologyInput>;
  placeholder?: string;
}

export function DynamicInputList({
  label,
  fieldName,
  register,
  watch,
  setValue,
  placeholder,
}: DynamicInputListProps) {
  const fields = watch(fieldName) || [''];

  const addField = () => {
    setValue(fieldName, [...fields, '']);
  };

  const removeField = (index: number) => {
    if (fields.length > 1) {
      setValue(
        fieldName,
        fields.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="space-y-3">
        {fields.map((_, index) => (
          <div key={index} className="flex gap-2 items-center">
            <div className="flex-1">
              <input
                type="text"
                {...register(`${fieldName}.${index}` as any)}
                placeholder={placeholder}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
              />
            </div>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => removeField(index)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition duration-200"
                title="Remove item"
              >
                <MinusCircle className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addField}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition duration-200"
      >
        <PlusCircle className="w-5 h-5 mr-1" />
        Add {label}
      </button>
    </div>
  );
}