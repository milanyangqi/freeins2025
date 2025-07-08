import React from 'react';

interface ProcessStepProps {
  title: string;
  description: string;
  image?: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ title, description, image }) => {
  return (
    <div className="process-step">
      {image && (
        <div className="process-step-image">
          <img src={image} alt={title} />
        </div>
      )}
      <h3 className="process-step-title">{title}</h3>
      <p className="process-step-description">{description}</p>
    </div>
  );
};

export default ProcessStep;