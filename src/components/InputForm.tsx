import React from 'react';
import { useForm } from 'react-hook-form';
import { TechnologyInput } from '../types';
import { DynamicInputList } from './DynamicInputList';
import { AlertCircle } from 'lucide-react';

export function InputForm({ onSubmit }: { onSubmit: (data: TechnologyInput) => void }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TechnologyInput>({
    defaultValues: {
      name: '',
      goals: [''],
      priorities: [''],
      otherInputs: [''],
    },
  });

  const onError = (errors: any) => {
    console.error('Form validation errors:', errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Technology Name
        </label>
        <input
          type="text"
          {...register('name', { 
            required: 'Technology name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' }
          })}
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          } focus:outline-none focus:ring-2 transition duration-200`}
          placeholder="Enter technology name"
        />
        {errors.name && (
          <div className="mt-1 flex items-center text-red-600">
            <AlertCircle className="w-4 h-4 mr-1" />
            <p className="text-sm">{errors.name.message}</p>
          </div>
        )}
      </div>

      <DynamicInputList
        label="Goals"
        fieldName="goals"
        register={register}
        watch={watch}
        setValue={setValue}
        placeholder="Enter a goal"
      />

      <DynamicInputList
        label="Priorities"
        fieldName="priorities"
        register={register}
        watch={watch}
        setValue={setValue}
        placeholder="Enter a priority"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cost (Optional)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
          <input
            type="number"
            {...register('cost', {
              min: { value: 0, message: 'Cost cannot be negative' },
              validate: (value) => !value || value >= 0 || 'Cost must be a positive number'
            })}
            className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            placeholder="Enter cost"
          />
        </div>
        {errors.cost && (
          <div className="mt-1 flex items-center text-red-600">
            <AlertCircle className="w-4 h-4 mr-1" />
            <p className="text-sm">{errors.cost.message}</p>
          </div>
        )}
      </div>

      <DynamicInputList
        label="Other Inputs"
        fieldName="otherInputs"
        register={register}
        watch={watch}
        setValue={setValue}
        placeholder="Enter additional information"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 px-4 rounded-lg text-white font-medium transition duration-200 ${
          isSubmitting
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
      </button>
    </form>
  );
}