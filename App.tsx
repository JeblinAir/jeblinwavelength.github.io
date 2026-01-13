
import React, { useState, useCallback, useEffect } from 'react';
import Dial from './components/Dial';
import Needle from './components/Needle';
import { GamePhase, GameState } from './types';

const getRandomAngle = () => Math.floor(Math.random() * 150) + 15; // 15 to 165

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    targetAngle: getRandomAngle(),
    needleAngle: 90,
    phase: GamePhase.SETUP,
    score: null,
  });

  const calculateScore = (target: number, guess: number) => {
    const diff = Math.abs(target - guess);
    if (diff <= 2) return 4;
    if (diff <= 7) return 3;
    if (diff <= 12) return 2;
    return 0;
  };

  const handleHide = () => {
    setGameState(prev => ({ ...prev, phase: GamePhase.GUESSING }));
  };

  const handleReveal = () => {
    const score = calculateScore(gameState.targetAngle, gameState.needleAngle);
    setGameState(prev => ({ ...prev, phase: GamePhase.REVEALED, score }));
  };

  const handleNewRound = () => {
    setGameState({
      targetAngle: getRandomAngle(),
      needleAngle: 90,
      phase: GamePhase.SETUP,
      score: null,
    });
  };

  const handleNeedleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameState.phase !== GamePhase.REVEALED) {
      setGameState(prev => ({ ...prev, needleAngle: Number(e.target.value) }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 font-sans selection:bg-teal-500/30">
      {/* Header */}
      <div className="mb-12 text-center animate-in fade-in slide-in-from-top duration-700">
        <h1 className="text-5xl font-black tracking-tighter mb-2 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
          WAVELENGTH
        </h1>
        <p className="text-slate-400 font-medium">Find the frequency.</p>
      </div>

      {/* Main Game Container */}
      <div className="w-full max-w-3xl bg-slate-900/40 rounded-3xl p-8 border border-white/5 shadow-2xl backdrop-blur-sm relative overflow-hidden">
        
        {/* The Dial Area */}
        <div className="relative mb-8">
          <Dial targetAngle={gameState.targetAngle} phase={gameState.phase} />
          <Needle 
            angle={gameState.needleAngle} 
            color={gameState.phase === GamePhase.SETUP ? "#94a3b8" : "#2dd4bf"} 
          />
        </div>

        {/* Input Slider */}
        <div className="w-full px-8 mb-10 group">
          <label className="block text-center text-xs font-bold tracking-widest uppercase text-slate-500 mb-4 group-hover:text-teal-400 transition-colors">
            Adjust Frequency
          </label>
          <input
            type="range"
            min="0"
            max="180"
            step="0.1"
            value={gameState.needleAngle}
            onChange={handleNeedleChange}
            disabled={gameState.phase === GamePhase.REVEALED}
            className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-600">
            <span>LEFT</span>
            <span>CENTER</span>
            <span>RIGHT</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-6">
          {gameState.phase === GamePhase.SETUP && (
            <div className="text-center">
              <p className="text-sm text-slate-400 mb-4 bg-slate-800/50 px-4 py-2 rounded-full">
                Psychic: Study the target, then hide it!
              </p>
              <button
                onClick={handleHide}
                className="group relative px-12 py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-teal-500/25 active:scale-95"
              >
                <i className="fa-solid fa-eye-slash mr-2 group-hover:animate-pulse"></i>
                HIDE TARGET
              </button>
            </div>
          )}

          {gameState.phase === GamePhase.GUESSING && (
            <div className="text-center">
              <p className="text-sm text-slate-400 mb-4 bg-slate-800/50 px-4 py-2 rounded-full">
                Teammate: Adjust the needle and reveal!
              </p>
              <button
                onClick={handleReveal}
                className="group relative px-12 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/25 active:scale-95"
              >
                <i className="fa-solid fa-bolt mr-2 group-hover:animate-bounce"></i>
                REVEAL SCORE
              </button>
            </div>
          )}

          {gameState.phase === GamePhase.REVEALED && (
            <div className="text-center animate-in zoom-in duration-500">
              <div className="mb-6">
                <span className="text-xs font-bold text-slate-500 block uppercase tracking-widest mb-1">Result</span>
                <div className="text-6xl font-black text-white flex items-baseline justify-center gap-2">
                  {gameState.score}
                  <span className="text-2xl text-slate-500 font-bold uppercase tracking-tight">Points</span>
                </div>
              </div>
              <button
                onClick={handleNewRound}
                className="group relative px-12 py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-2xl transition-all active:scale-95"
              >
                <i className="fa-solid fa-rotate-right mr-2 group-hover:rotate-180 transition-transform duration-500"></i>
                NEW ROUND
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer Instructions */}
      <footer className="mt-12 text-slate-600 text-[11px] font-bold uppercase tracking-[0.2em] max-w-md text-center leading-relaxed">
        <div className="grid grid-cols-3 gap-8 border-t border-white/5 pt-8">
          <div>
            <div className="text-teal-500 mb-1">Phase 1</div>
            <div>Target Appears</div>
          </div>
          <div>
            <div className="text-teal-500 mb-1">Phase 2</div>
            <div>Hide & Guess</div>
          </div>
          <div>
            <div className="text-teal-500 mb-1">Phase 3</div>
            <div>Score Points</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
