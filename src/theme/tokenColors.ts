import type { TextmateColors, ThemeContext } from '../types';
import getBaseTokens from './tokens';

export function getTokenColors(context: ThemeContext): TextmateColors {
  return getBaseTokens(context);
}
