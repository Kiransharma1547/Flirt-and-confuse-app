
import React from 'react';
import { GAME_TITLE, AI_NAME } from '../constants';
import { Rank } from '../types';

interface HeaderProps {
  charmPoints: number;
  rank: Rank;
}

const Header: React.FC<HeaderProps> = ({ charmPoints, rank }) => {
  return (
    <div className="p-4 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-left">
          <h1 className="text-xl md:text-2xl font-bold text-fuchsia-400 tracking-wider">
            {GAME_TITLE}
          </h1>
          <p className="text-sm text-slate-400">with {AI_NAME} 🖤</p>
        </div>
        <div className="text-right bg-gray-800/50 p-2 px-4 rounded-lg border border-gray-700">
          <p className="font-bold text-lg text-cyan-400">{charmPoints} <span className="text-sm font-normal">Charm Points</span></p>
          <p className="text-sm text-slate-300">{rank.name} {rank.emoji}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
