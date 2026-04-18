import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

interface Props { name: string; size?: number; color?: string }

export function IEIcon({ name, size = 20, color = '#000' }: Props) {
  const p = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: color,
    strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
  };
  switch (name) {
    case 'plus':    return <Svg {...p}><Path d="M12 5v14M5 12h14"/></Svg>;
    case 'back':    return <Svg {...p}><Path d="m15 6-6 6 6 6"/></Svg>;
    case 'forward': return <Svg {...p}><Path d="m9 6 6 6-6 6"/></Svg>;
    case 'close':   return <Svg {...p}><Path d="M6 6l12 12M18 6 6 18"/></Svg>;
    case 'check':   return <Svg {...p}><Path d="m5 12 5 5L20 7"/></Svg>;
    case 'bell':    return <Svg {...p}><Path d="M6 8a6 6 0 1 1 12 0c0 7 3 6 3 9H3c0-3 3-2 3-9z"/><Path d="M10 19a2 2 0 0 0 4 0"/></Svg>;
    case 'camera':  return <Svg {...p}><Path d="M4 7h3l2-2h6l2 2h3v11H4z"/><Circle cx={12} cy={12.5} r={3.5}/></Svg>;
    case 'pin':     return <Svg {...p}><Path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z"/><Circle cx={12} cy={10} r={2.5}/></Svg>;
    case 'clock':   return <Svg {...p}><Circle cx={12} cy={12} r={9}/><Path d="M12 7v5l3 2"/></Svg>;
    case 'filter':  return <Svg {...p}><Path d="M4 5h16M7 12h10M10 19h4"/></Svg>;
    case 'qr':      return <Svg {...p}><Rect x={4} y={4} width={6} height={6}/><Rect x={14} y={4} width={6} height={6}/><Rect x={4} y={14} width={6} height={6}/><Path d="M14 14h2v2M20 14v2m-6 4h2v-2m4-2v6"/></Svg>;
    case 'edit':    return <Svg {...p}><Path d="M4 20h4l10-10-4-4L4 16z"/></Svg>;
    case 'face':    return <Svg {...p}><Circle cx={12} cy={12} r={9}/><Circle cx={9} cy={10} r={1} fill={color} stroke="none"/><Circle cx={15} cy={10} r={1} fill={color} stroke="none"/><Path d="M9 15c1 1 2 1.5 3 1.5s2-.5 3-1.5"/></Svg>;
    case 'finger':  return <Svg {...p}><Path d="M10 14V5a2 2 0 1 1 4 0v6"/><Path d="M14 11V4a2 2 0 1 1 4 0v11c0 3-3 6-6 6s-6-2-6-5l-2-4 3-1 3 4"/></Svg>;
    case 'search':  return <Svg {...p}><Circle cx={11} cy={11} r={7}/><Path d="m20 20-3.5-3.5"/></Svg>;
    case 'users':   return <Svg {...p}><Circle cx={9} cy={8} r={3.2}/><Path d="M3.5 19c0-3 2.5-5.2 5.5-5.2s5.5 2.2 5.5 5.2"/><Circle cx={17} cy={7} r={2.6}/><Path d="M15 13.5c1-.5 1.8-.7 2.8-.7 2.2 0 3.7 1.4 3.7 3.4"/></Svg>;
    case 'box':     return <Svg {...p}><Path d="M3.5 7.2 12 3l8.5 4.2v9.6L12 21l-8.5-4.2z"/><Path d="M3.5 7.2 12 11.5l8.5-4.3M12 21v-9.5"/></Svg>;
    case 'gear':    return <Svg {...p}><Circle cx={12} cy={12} r={3}/><Path d="M12 2v2m0 16v2M4 12H2m20 0h-2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M5.6 18.4l1.4-1.4m10-10 1.4-1.4"/></Svg>;
    case 'lock':    return <Svg {...p}><Rect x={5} y={11} width={14} height={10} rx={2}/><Path d="M8 11V7a4 4 0 0 1 8 0v4"/></Svg>;
    default: return null;
  }
}
