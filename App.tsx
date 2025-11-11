
import React, { useState, useEffect, useCallback } from 'react';
import { Chat } from '@google/genai';
import Header from './components/Header';
import ChatHistory from './components/ChatHistory';
import InputBar from './components/InputBar';
import { Message, Rank, GeminiResponse } from './types';
import { RANKS } from './constants';
import { initChat, sendMessageToAI } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [charmPoints, setCharmPoints] = useState<number>(0);
  const [rank, setRank] = useState<Rank>(RANKS[0]);
  const [geminiChat, setGeminiChat] = useState<Chat | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  useEffect(() => {
    try {
      const chat = initChat(charmPoints);
      setGeminiChat(chat);
    } catch(e) {
      console.error(e);
      // Display an error message to the user
      setMessages([{
        role: 'model',
        content: "Error: Could not initialize the game. Please ensure your API key is configured correctly and refresh the page. 🖤"
      }]);
      setIsGameOver(true);
    }
  }, []);

  useEffect(() => {
    const currentRank = RANKS.slice().reverse().find(r => charmPoints >= r.minPoints) || RANKS[0];
    setRank(currentRank);
  }, [charmPoints]);

  const handleSendMessage = useCallback(async () => {
    if (!userInput.trim() || isLoading || !geminiChat || isGameOver) return;

    const userMessage: Message = { role: 'user', content: userInput.trim() };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const aiResponse: GeminiResponse = await sendMessageToAI(geminiChat, userMessage.content, charmPoints);

      const modelMessage: Message = { role: 'model', content: aiResponse.reply };
      setMessages(prev => [...prev, modelMessage]);

      if(aiResponse.pointsAwarded > 0) {
        setCharmPoints(prev => prev + aiResponse.pointsAwarded);
      }

      if (aiResponse.gameOver) {
        setIsGameOver(true);
      }
    } catch (error) {
      console.error("Failed to get response from AI", error);
      const errorMessage: Message = {
        role: 'model',
        content: "🌙 My apologies, a supernova seems to have interfered with my circuits. I lost my train of thought. Let's try that again! ⚡"
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [userInput, isLoading, geminiChat, charmPoints, isGameOver]);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900 flex flex-col font-sans">
      <Header charmPoints={charmPoints} rank={rank} />
      <ChatHistory messages={messages} isLoading={isLoading} />
      <InputBar
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onSend={handleSendMessage}
        isLoading={isLoading}
        isGameOver={isGameOver}
      />
    </div>
  );
};

export default App;
