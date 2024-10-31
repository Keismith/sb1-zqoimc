export type TechnologyCategory =
  | 'LMS'
  | 'VirtualClassroom'
  | 'StudentEngagement'
  | 'AssessmentProctoring'
  | 'Grading'
  | 'VideoConferencing'
  | 'DataAnalytics'
  | 'IDVerification'
  | 'CollaborativeLearning'
  | 'ContentCreation'
  | 'AlumniEngagement'
  | 'ResearchSupport'
  | 'Entrepreneurship';

export interface TechnologyInput {
  name: string;
  goals: string[];
  priorities: string[];
  cost?: number;
  otherInputs?: string[];
}

export interface MetricTarget {
  name: string;
  target: number;
  unit: string;
}

export interface Technology {
  name: string;
  category: TechnologyCategory;
  goals: string[];
  priorities: string[];
  cost?: number;
  metricTargets: MetricTarget[];
}

export interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
  icon?: React.ReactNode;
}