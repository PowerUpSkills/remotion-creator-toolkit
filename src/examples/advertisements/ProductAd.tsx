import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence
} from 'remotion';

interface BrandColors {
  primary: string;
  accent: string;
  text: string;
}

interface ProductAdProps {
  productName: string;
  productImage: string;
  price: number;
  discount?: number;
  callToAction: string;
  brandColors: BrandColors;
}

export const ProductAd: React.FC<ProductAdProps> = ({
  productName,
  productImage,
  price,
  discount,
  callToAction,
  brandColors
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Animation timings
  const productEntranceSpring = spring({
    frame: frame - 15,
    fps,
    config: {
      damping: 100,
      stiffness: 200
    }
  });

  const titleSlideY = interpolate(frame, [30, 60], [100, 0], {
    extrapolateRight: 'clamp'
  });

  const priceScale = spring({
    frame: frame - 90,
    fps,
    config: {
      damping: 80,
      stiffness: 300
    }
  });

  const ctaOpacity = interpolate(frame, [150, 180], [0, 1], {
    extrapolateRight: 'clamp'
  });

  // Exit animation
  const exitScale = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 1.1],
    { extrapolateLeft: 'clamp' }
  );

  const discountedPrice = discount ? price * (1 - discount) : price;

  return (
    <AbsoluteFill
      style={{
        background: brandColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
        transform: `scale(${exitScale})`
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: -200,
          right: -200,
          width: 400,
          height: 400,
          background: `linear-gradient(45deg, ${brandColors.accent}20, transparent)`,
          borderRadius: '50%',
          opacity: 0.3
        }}
      />

      {/* Product showcase placeholder */}
      <Sequence from={0} durationInFrames={durationInFrames}>
        <div
          style={{
            width: '60%',
            height: 300,
            background: `linear-gradient(135deg, ${brandColors.accent}40, ${brandColors.accent}20)`,
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
            transform: `scale(${productEntranceSpring})`,
            border: `2px solid ${brandColors.accent}40`
          }}
        >
          <div
            style={{
              color: brandColors.text,
              fontSize: 24,
              opacity: 0.7,
              textAlign: 'center'
            }}
          >
            Product Image Placeholder
            <br />
            <span style={{ fontSize: 16 }}>
              ({productImage})
            </span>
          </div>
        </div>
      </Sequence>

      {/* Product name */}
      <h1
        style={{
          color: brandColors.text,
          fontSize: 64,
          fontWeight: 'bold',
          textAlign: 'center',
          margin: '0 40px 20px 40px',
          transform: `translateY(${titleSlideY}px)`,
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}
      >
        {productName}
      </h1>

      {/* Price section */}
      <div
        style={{
          textAlign: 'center',
          margin: '20px 0 40px 0',
          transform: `scale(${priceScale})`
        }}
      >
        {discount && (
          <span
            style={{
              textDecoration: 'line-through',
              color: brandColors.text,
              opacity: 0.6,
              fontSize: 36,
              marginRight: 20
            }}
          >
            ${price}
          </span>
        )}
        <span
          style={{
            color: brandColors.accent,
            fontSize: 56,
            fontWeight: 'bold'
          }}
        >
          ${discountedPrice.toFixed(2)}
        </span>
        {discount && (
          <div
            style={{
              color: brandColors.accent,
              fontSize: 24,
              fontWeight: 'bold',
              marginTop: 10
            }}
          >
            Save {Math.round(discount * 100)}%!
          </div>
        )}
      </div>

      {/* Call to action */}
      <div
        style={{
          background: `linear-gradient(135deg, ${brandColors.accent}, ${brandColors.accent}CC)`,
          padding: '20px 60px',
          borderRadius: 50,
          color: brandColors.primary,
          fontSize: 32,
          fontWeight: 'bold',
          textAlign: 'center',
          opacity: ctaOpacity,
          cursor: 'pointer',
          boxShadow: `0 8px 24px ${brandColors.accent}40`,
          border: `2px solid ${brandColors.accent}`,
          textShadow: '0 1px 2px rgba(0,0,0,0.2)'
        }}
      >
        {callToAction}
      </div>

      {/* Animated accent elements */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          left: 100,
          width: 20,
          height: 20,
          background: brandColors.accent,
          borderRadius: '50%',
          opacity: interpolate(frame, [60, 120], [0, 0.8], {
            extrapolateRight: 'clamp'
          })
        }}
      />
    </AbsoluteFill>
  );
};