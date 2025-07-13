import React from 'react';
import { Composition } from 'remotion';

// Import our example components
import { QuoteCard } from './examples/social-media/QuoteCard';
import { ProductAd } from './examples/advertisements/ProductAd';
import { UserStatsVideo } from './examples/personalization/UserStatsVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Social Media Examples */}
      <Composition
        id="QuoteCard"
        component={QuoteCard}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          quote: "The only way to do great work is to love what you do.",
          author: "Steve Jobs",
          theme: "gradient"
        }}
      />

      {/* Advertisement Examples */}
      <Composition
        id="ProductAd"
        component={ProductAd}
        durationInFrames={240}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          productName: "Premium Headphones",
          productImage: "/product-sample.jpg",
          price: 299,
          discount: 0.2,
          callToAction: "Buy Now - 20% Off",
          brandColors: {
            primary: '#1a1a1a',
            accent: '#ff6b6b',
            text: '#ffffff'
          }
        }}
      />

      {/* Personalization Examples */}
      <Composition
        id="UserStatsVideo"
        component={UserStatsVideo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          userName: "Alex Creator",
          userAvatar: "/avatar-sample.jpg",
          stats: {
            views: 125000,
            followers: 5420,
            likes: 18500,
            videos: 47
          },
          achievements: [
            "10K Followers",
            "Viral Video",
            "Creator of the Month"
          ]
        }}
      />
    </>
  );
};