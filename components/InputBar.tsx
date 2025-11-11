
import React from 'react';

interface InputBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  isLoading: boolean;
  isGameOver: boolean;
}

const InputBar: React.FC<InputBarProps> = ({ value, onChange, onSend, isLoading, isGameOver }) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading && !isGameOver) {
      onSend();
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyPress={handleKeyPress}
          placeholder={isGameOver ? "Game Over! Thanks for playing." : "Type your message here..."}
          disabled={isLoading || isGameOver}
          className="w-full bg-gray-800 border-2 border-gray-600 focus:border-fuchsia-500 focus:ring-fuchsia-500 rounded-full py-3 pl-5 pr-16 text-white transition-colors duration-300 disabled:opacity-50"
        />
        <button
          onClick={onSend}
          disabled={isLoading || isGameOver || value.trim() === ''}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-full h-10 w-10 flex items-center justify-center transition-transform duration-200 active:scale-90 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InputBar;
