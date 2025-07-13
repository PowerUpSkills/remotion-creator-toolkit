import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  spring
} from 'remotion';

interface UserStats {
  views: number;
  followers: number;
  likes: number;
  videos: number;
}

interface UserStatsVideoProps {
  userName: string;
  userAvatar: string;
  stats: UserStats;
  achievements: string[];
}

const WelcomeSection: React.FC<{
  userName: string;
  userAvatar: string;
}> = ({ userName, userAvatar }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nameSpring = spring({
    frame: frame - 20,
    fps,
    config: {
      damping: 100,
      stiffness: 200
    }
  });

  const avatarScale = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp'
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center'
      }}
    >
      {/* Avatar placeholder */}
      <div
        style={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 40,
          transform: `scale(${avatarScale})`,
          border: '6px solid rgba(255,255,255,0.3)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
        }}
      >
        <span style={{ fontSize: 24, color: 'white', opacity: 0.8 }}>
          Avatar
        </span>
      </div>

      {/* Welcome text */}
      <h1
        style={{
          fontSize: 72,
          fontWeight: 'bold',
          margin: 0,
          transform: `scale(${nameSpring})`,
          textShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}
      >
        Welcome, {userName}!
      </h1>

      <p
        style={{
          fontSize: 32,
          margin: '20px 0 0 0',
          opacity: interpolate(frame, [40, 70], [0, 0.8])
        }}
      >
        Your 2024 Year in Review
      </p>
    </div>
  );
};

const StatsAnimation: React.FC<{ stats: UserStats }> = ({ stats }) => {
  const frame = useCurrentFrame();

  const statsEntries = Object.entries(stats);

  return (
    <div
      style={{
        padding: 80,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 60,
        height: '100%',
        alignItems: 'center'
      }}
    >
      {statsEntries.map(([key, value], index) => {
        const animatedValue = interpolate(
          frame,
          [index * 15, (index + 1) * 15 + 30],
          [0, value],
          { extrapolateRight: 'clamp' }
        );

        const scale = interpolate(
          frame,
          [index * 15, (index + 1) * 15 + 15],
          [0, 1],
          { extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={key}
            style={{
              textAlign: 'center',
              background: 'rgba(255,255,255,0.1)',
              padding: 40,
              borderRadius: 20,
              transform: `scale(${scale})`,
              border: '2px solid rgba(255,255,255,0.2)'
            }}
          >
            <h3
              style={{
                fontSize: 28,
                margin: '0 0 20px 0',
                textTransform: 'uppercase',
                letterSpacing: 2,
                opacity: 0.9
              }}
            >
              {key}
            </h3>
            <p
              style={{
                fontSize: 64,
                fontWeight: 'bold',
                margin: 0,
                color: '#4ecdc4',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              {Math.floor(animatedValue).toLocaleString()}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const AchievementShowcase: React.FC<{
  achievements: string[];
}> = ({ achievements }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        padding: 80,
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <h2
        style={{
          fontSize: 48,
          marginBottom: 60,
          opacity: interpolate(frame, [0, 30], [0, 1])
        }}
      >
        🏆 Your Achievements
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 30,
          alignItems: 'center'
        }}
      >
        {achievements.map((achievement, index) => {
          const delay = index * 20;
          const opacity = interpolate(
            frame,
            [delay, delay + 30],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );
          const slideY = interpolate(
            frame,
            [delay, delay + 30],
            [50, 0],
            { extrapolateRight: 'clamp' }
          );

          return (
            <div
              key={achievement}
              style={{
                background: 'linear-gradient(135deg, #ff6b6b, #ffa500)',
                padding: '20px 40px',
                borderRadius: 50,
                fontSize: 28,
                fontWeight: 'bold',
                color: 'white',
                opacity,
                transform: `translateY(${slideY}px)`,
                boxShadow: '0 4px 16px rgba(255,107,107,0.4)',
                border: '2px solid rgba(255,255,255,0.3)'
              }}
            >
              {achievement}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const UserStatsVideo: React.FC<UserStatsVideoProps> = ({
  userName,
  userAvatar,
  stats,
  achievements
}) => {
  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
        color: 'white',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: -300,
          left: -300,
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(78,205,196,0.2) 0%, transparent 70%)',
          borderRadius: '50%'
        }}
      />

      {/* Welcome section */}
      <Sequence from={0} durationInFrames={90}>
        <WelcomeSection userName={userName} userAvatar={userAvatar} />
      </Sequence>

      {/* Stats animation */}
      <Sequence from={90} durationInFrames={120}>
        <StatsAnimation stats={stats} />
      </Sequence>

      {/* Achievement showcase */}
      <Sequence from={210} durationInFrames={90}>
        <AchievementShowcase achievements={achievements} />
      </Sequence>
    </AbsoluteFill>
  );
};