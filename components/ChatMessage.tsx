
import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isModel = message.role === 'model';

  return (
    <div className={`flex items-start gap-3 my-4 ${isModel ? 'justify-start' : 'justify-end'}`}>
      {isModel && (
        <div className="w-10 h-10 rounded-full bg-fuchsia-900/50 flex items-center justify-center text-xl shrink-0 border-2 border-fuchsia-500">
          🖤
        </div>
      )}
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg p-4 rounded-2xl shadow-lg whitespace-pre-wrap ${
          isModel
            ? 'bg-gray-800 text-slate-200 rounded-tl-none border border-gray-700'
            : 'bg-indigo-600 text-white rounded-br-none'
        }`}
      >
        {message.content}
      </div>
       {!isModel && (
        <div className="w-10 h-10 rounded-full bg-indigo-900/50 flex items-center justify-center text-xl shrink-0 border-2 border-indigo-500">
          💬
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
