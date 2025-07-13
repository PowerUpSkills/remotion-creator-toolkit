import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring
} from 'remotion';

interface QuoteCardProps {
  quote: string;
  author: string;
  theme: 'gradient' | 'dark' | 'minimal';
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  author,
  theme = 'gradient'
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance animations
  const quoteOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp'
  });

  const authorSpring = spring({
    frame: frame - 60,
    fps,
    config: {
      damping: 100,
      stiffness: 200
    }
  });

  const authorY = interpolate(authorSpring, [0, 1], [50, 0]);

  // Background styles based on theme
  const getBackgroundStyle = () => {
    switch (theme) {
      case 'gradient':
        return {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        };
      case 'dark':
        return {
          background: '#2c3e50'
        };
      case 'minimal':
        return {
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          color: '#2c3e50'
        };
      default:
        return {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        };
    }
  };

  return (
    <AbsoluteFill
      style={{
        ...getBackgroundStyle(),
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
        fontFamily: 'Arial, sans-serif',
        color: theme === 'minimal' ? '#2c3e50' : '#ffffff'
      }}
    >
      <div
        style={{
          textAlign: 'center',
          maxWidth: '80%'
        }}
      >
        {/* Quote Text */}
        <h2
          style={{
            fontSize: 48,
            fontWeight: 300,
            lineHeight: 1.3,
            margin: 0,
            opacity: quoteOpacity,
            textShadow: theme === 'minimal' ? 'none' : '0 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          "{quote}"
        </h2>

        {/* Author */}
        <p
          style={{
            fontSize: 32,
            fontWeight: 500,
            margin: '40px 0 0 0',
            opacity: 0.9,
            transform: `translateY(${authorY}px)`,
            textShadow: theme === 'minimal' ? 'none' : '0 1px 2px rgba(0,0,0,0.2)'
          }}
        >
          — {author}
        </p>
      </div>

      {/* Decorative elements */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 60,
          width: 60,
          height: 60,
          background: theme === 'minimal' ? '#4ecdc4' : 'rgba(255,255,255,0.2)',
          borderRadius: '50%',
          opacity: interpolate(frame, [0, 60], [0, 0.7])
        }}
      />
      
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          right: 60,
          width: 40,
          height: 40,
          background: theme === 'minimal' ? '#ff6b6b' : 'rgba(255,255,255,0.15)',
          borderRadius: '50%',
          opacity: interpolate(frame, [30, 90], [0, 0.6])
        }}
      />
    </AbsoluteFill>
  );
};