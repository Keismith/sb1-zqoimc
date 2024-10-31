import { jsPDF } from 'jspdf';
import { TechnologyInput, MetricTarget } from '../types';

export const generatePDF = (
  input: TechnologyInput,
  metricTargets: MetricTarget[]
) => {
  const doc = new jsPDF();
  let yPos = 20;

  // Title
  doc.setFontSize(20);
  doc.text('Technology Assessment Report', 20, yPos);
  yPos += 20;

  // Technology Information
  doc.setFontSize(16);
  doc.text('Technology Information', 20, yPos);
  yPos += 10;

  doc.setFontSize(12);
  doc.text(`Name: ${input.name}`, 20, yPos);
  yPos += 10;

  if (input.cost) {
    doc.text(`Cost: $${input.cost}`, 20, yPos);
    yPos += 10;
  }

  // Goals
  if (input.goals?.length) {
    yPos += 10;
    doc.setFontSize(16);
    doc.text('Goals', 20, yPos);
    yPos += 10;
    doc.setFontSize(12);
    input.goals.forEach(goal => {
      doc.text(`• ${goal}`, 25, yPos);
      yPos += 7;
    });
  }

  // Metric Targets
  if (metricTargets.length) {
    yPos += 10;
    doc.setFontSize(16);
    doc.text('Metric Targets', 20, yPos);
    yPos += 10;
    doc.setFontSize(12);
    metricTargets.forEach(metric => {
      doc.text(`• ${metric.name}: ${metric.target} ${metric.unit}`, 25, yPos);
      yPos += 7;
    });
  }

  doc.save('technology-assessment.pdf');
};