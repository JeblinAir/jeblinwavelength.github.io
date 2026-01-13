
export enum GamePhase {
  SETUP = 'SETUP',
  GUESSING = 'GUESSING',
  REVEALED = 'REVEALED'
}

export interface TargetZone {
  points: number;
  width: number;
  color: string;
}

export interface GameState {
  targetAngle: number;
  needleAngle: number;
  phase: GamePhase;
  score: number | null;
}
