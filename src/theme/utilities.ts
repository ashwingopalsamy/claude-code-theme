export const transparent = '#00000000';

export function opacity(color: string, alpha: number): string {
  const hex = color.replace('#', '');
  const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
  return `#${hex}${alphaHex}`;
}

export function shade(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const rgb = {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
  
  const factor = 1 - amount;
  const shaded = {
    r: Math.round(rgb.r * factor),
    g: Math.round(rgb.g * factor),
    b: Math.round(rgb.b * factor),
  };
  
  return `#${[shaded.r, shaded.g, shaded.b]
    .map(c => c.toString(16).padStart(2, '0'))
    .join('')}`;
}

export function mix(color1: string, color2: string, weight: number = 0.5): string {
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');
  
  const rgb1 = {
    r: parseInt(hex1.slice(0, 2), 16),
    g: parseInt(hex1.slice(2, 4), 16),
    b: parseInt(hex1.slice(4, 6), 16),
  };
  
  const rgb2 = {
    r: parseInt(hex2.slice(0, 2), 16),
    g: parseInt(hex2.slice(2, 4), 16),
    b: parseInt(hex2.slice(4, 6), 16),
  };
  
  const mixed = {
    r: Math.round(rgb1.r * weight + rgb2.r * (1 - weight)),
    g: Math.round(rgb1.g * weight + rgb2.g * (1 - weight)),
    b: Math.round(rgb1.b * weight + rgb2.b * (1 - weight)),
  };
  
  return `#${[mixed.r, mixed.g, mixed.b]
    .map(c => c.toString(16).padStart(2, '0'))
    .join('')}`;
}