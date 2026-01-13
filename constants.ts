
import { TargetZone } from './types';

export const DIAL_RADIUS = 200;
export const DIAL_CENTER_X = 250;
export const DIAL_CENTER_Y = 250;

export const TARGET_ZONES: TargetZone[] = [
  { points: 2, width: 22, color: '#f87171' }, // Red (outer)
  { points: 3, width: 14, color: '#fbbf24' }, // Yellow (inner)
  { points: 4, width: 6, color: '#4ade80' },  // Green (bullseye)
  { points: 3, width: 14, color: '#fbbf24' }, // Yellow (inner)
  { points: 2, width: 22, color: '#f87171' }, // Red (outer)
];

export const TOTAL_ZONE_WIDTH = 22; // Half width of the entire target structure
