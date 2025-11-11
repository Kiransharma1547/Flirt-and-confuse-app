
import React, { useRef, useEffect } from 'react';
import { Message } from '../types';
import ChatMessage from './ChatMessage';
import Spinner from './Spinner';

interface ChatHistoryProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, isLoading }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
      {messages.map((msg, index) => (
        <ChatMessage key={index} message={msg} />
      ))}
      {isLoading && (
        <div className="flex items-start gap-3 my-4 justify-start">
            <div className="w-10 h-10 rounded-full bg-fuchsia-900/50 flex items-center justify-center text-xl shrink-0 border-2 border-fuchsia-500">
                🖤
            </div>
            <div className="bg-gray-800 text-slate-200 rounded-2xl rounded-tl-none p-4 shadow-lg border border-gray-700">
                <div className="flex items-center gap-2">
                    <Spinner />
                    <span>thinking...</span>
                </div>
            </div>
        </div>
      )}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default ChatHistory;
