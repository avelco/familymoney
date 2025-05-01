import React from 'react';

// Define position type
type ButtonPosition = 'left' | 'center' | 'right';

// Interface for button props
interface ButtonProps {
  text: string;
  position?: ButtonPosition;
}

// Helper function to get position classes
const getPositionClasses = (position: ButtonPosition = 'center'): string => {
  const baseClasses = "btn btn-blue";
  
  switch (position) {
    case 'left':
      return `${baseClasses} mr-auto`;
    case 'right':
      return `${baseClasses} ml-auto`;
    case 'center':
    default:
      return `${baseClasses} mx-auto`;
  }
};

export const SubmitButton = ({ text, position = 'center' }: ButtonProps) => {
  return (
    <div className="w-full flex">
      <button type="submit" className={getPositionClasses(position)}>
        {text}
      </button>
    </div>
  );
};

export const LoadingButton = ({ text, position = 'center' }: ButtonProps) => {
  return (
    <div className="w-full flex">
      <button
        className={`${getPositionClasses(position)} disabled:opacity-50 
        disabled:cursor-not-allowed flex items-center justify-center gap-x-2`}
        disabled
      >
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span>{text}</span>
      </button>
    </div>
  );
};
