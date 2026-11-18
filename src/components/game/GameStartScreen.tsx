
import React from 'react';
import { GameMode } from '../../types/game';
import { getGameModeInfo } from '../../utils/gameUtils';

interface GameStartScreenProps {
  gameMode: GameMode;
  onStartGame: () => void;
}

const GameStartScreen: React.FC<GameStartScreenProps> = ({
  gameMode,
  onStartGame
}) => {
  const modeInfo = getGameModeInfo(gameMode);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <modeInfo.icon className={`w-8 h-8 ${modeInfo.color} mr-2`} />
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {modeInfo.name} Mode
          </h2>
        </div>
        <p className="text-gray-300 mb-6 text-sm sm:text-base">
          {gameMode === 'speed' 
            ? 'MUCH faster sequences! Dramatically reduced timing!' 
            : gameMode === 'hard'
            ? '6 different colors! Faster sequences and bonus points!'
            : 'Memorize the color sequence and repeat it!'
          }
        </p>
        {gameMode !== 'normal' && (
          <p className={`${modeInfo.color} text-xs sm:text-sm mb-4`}>
            {gameMode === 'speed' && '⚡ Double score • ⚡ Extreme speed'}
            {gameMode === 'hard' && '💀 6 colors • 💀 2.5x score • 💀 High speed'}
          </p>
        )}
      </div>
      <button onClick={onStartGame} className="neon-button text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4">
        START GAME
      </button>
    </div>
  );
};

export default GameStartScreen;
