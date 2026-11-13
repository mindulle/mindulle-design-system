import React from 'react';

export interface MindulleLogoProps extends React.SVGAttributes<SVGSVGElement> {
  /** 심볼 크기 또는 높이 (기본값: 32) */
  size?: number;
  /** 테마 모드 ('dark' | 'light' | 'auto') */
  theme?: 'dark' | 'light' | 'auto';
  /** 배경 라운드 박스 렌더링 여부 (기본값: false) */
  withBackground?: boolean;
}

/**
 * MindulleLogo
 *
 * 민들레 디자인 시스템(MDS v0.1.0) 공식 심볼 로고 컴포넌트.
 * 비바람을 가르는 비대칭 돛(Dynamic Wing-Sail)과 황금 씨앗(Golden Seed) 벡터 모티프.
 */
export function MindulleLogo({
  size = 32,
  theme = 'auto',
  withBackground = false,
  className = '',
  style,
  ...props
}: MindulleLogoProps) {
  const isLight = theme === 'light';
  const strokeColor = isLight ? '#1c1514' : 'currentColor';
  const goldColor = '#ffd166';
  const goldSub = '#f59e0b';
  const bgColor = isLight ? '#faf8f5' : '#060911';
  const fillOpacity = isLight ? 0.05 : 0.1;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      className={`mds-logo ${className}`}
      style={style}
      {...props}
    >
      {withBackground && (
        <rect width="24" height="24" rx="4" fill={bgColor} />
      )}

      {/* 01. Seed Origin Pod (Gold Core at Base) */}
      <path
        d="M 11.5,17.2 C 9.6,17.5 8.6,19 9.8,21.5 C 10.6,22.2 11.6,22.4 12.4,21.8 C 13.8,19.4 13,17.6 11.5,17.2 Z"
        fill={goldColor}
        stroke={goldSub}
        strokeWidth="1.0"
      />
      <circle cx="11.5" cy="19.4" r="0.65" fill="#ffffff" />

      {/* 02. The Main Mast (True 2px Stem - Crisp curving mast) */}
      <path
        d="M 11.5,17.2 C 12.6,12.8 13.8,8.2 13.5,3.6"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* 03. Primary Main Sail (Sweeping aerodynamic wing) */}
      <path
        d="M 12.2,14.6 C 8.2,13.2 4.6,11.2 3.6,7.6 C 6.2,7.4 9.2,8 13.2,8.4 Z"
        stroke={strokeColor}
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill={strokeColor}
        fillOpacity={fillOpacity}
      />
      {/* Sail Internal Gold Tension Spine */}
      <path
        d="M 11.4,13.6 C 8.6,12.3 6.6,11 5.2,8.6"
        stroke={goldColor}
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* 04. Top Jib Sail (Secondary upper aerodynamic feather) */}
      <path
        d="M 13,8 C 9.8,6.6 7.8,5.2 7.2,3.2 C 9.2,3.1 11.2,3.6 13.4,4.2 Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill={strokeColor}
        fillOpacity={fillOpacity}
      />

      {/* 05. Leading Whispering Breeze Line (Dash) */}
      <path
        d="M 13.5,3.6 C 16.8,5.2 19.2,8.4 20.4,13"
        stroke={goldColor}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeDasharray="2 1.5"
        opacity="0.85"
      />

      {/* Apex Lift Core */}
      <circle cx="13.5" cy="3.6" r="1.4" fill={goldColor} />
      <circle cx="13.1" cy="3.2" r="0.5" fill="#ffffff" />
    </svg>
  );
}
