
import React from 'react';
import { GameState, GameMode } from '../../types/game';
import { getGameModeInfo } from '../../utils/gameUtils';

interface GameStatusProps {
  gameState: GameState;
  gameMode: GameMode;
  level: number;
}

const GameStatus: React.FC<GameStatusProps> = ({
  gameState,
  gameMode,
  level
}) => {
  const modeInfo = getGameModeInfo(gameMode);

  return (
    <div className="text-center mb-6 sm:mb-8">
      {gameState === 'showing' && (
        <div>
          <p className="text-base sm:text-xl text-neon-green animate-pulse">
            Memorize the sequence...
          </p>
          {((gameMode === 'speed' && level > 2) || (gameMode === 'hard' && level > 3)) && (
            <p className={`text-xs sm:text-sm ${modeInfo.color} mt-1`}>
              {gameMode === 'speed' ? '⚡ SPEED EXTREMA! ⚡' : '💀 MODO HARD! 💀'}
            </p>
          )}
        </div>
      )}
      {gameState === 'waiting' && (
        <p className="text-base sm:text-xl text-neon-blue animate-pulse">
          Your turn! Repeat the sequence
        </p>
      )}
      {gameState === 'paused' && (
        <p className="text-base sm:text-xl text-yellow-400">
          Game paused
        </p>
      )}
    </div>
  );
};

export default GameStatus;
