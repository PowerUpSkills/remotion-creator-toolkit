import React from 'react';
import { Composition } from 'remotion';
import { z } from 'zod';

// Import our example components
import { QuoteCard } from './examples/social-media/QuoteCard';
import { ProductAd } from './examples/advertisements/ProductAd';
import { UserStatsVideo } from './examples/personalization/UserStatsVideo';

// Schema definitions for interactive editing
const QuoteCardSchema = z.object({
  quote: z.string().describe('The inspirational quote text'),
  author: z.string().describe('Quote author name'),
  theme: z.enum(['gradient', 'dark', 'minimal']).describe('Visual theme style')
});

const BrandColorsSchema = z.object({
  primary: z.string().describe('Primary background color (hex)'),
  accent: z.string().describe('Accent/highlight color (hex)'),
  text: z.string().describe('Text color (hex)')
});

const ProductAdSchema = z.object({
  productName: z.string().describe('Product name/title'),
  productImage: z.string().describe('Product image URL or path'),
  price: z.number().min(0).describe('Original price'),
  discount: z.number().min(0).max(1).optional().describe('Discount percentage (0.2 = 20%)'),
  callToAction: z.string().describe('Call-to-action button text'),
  brandColors: BrandColorsSchema
});

const UserStatsSchema = z.object({
  views: z.number().min(0).describe('Total views count'),
  followers: z.number().min(0).describe('Followers count'),
  likes: z.number().min(0).describe('Total likes received'),
  videos: z.number().min(0).describe('Number of videos posted')
});

const UserStatsVideoSchema = z.object({
  userName: z.string().describe('User\'s display name'),
  userAvatar: z.string().describe('Avatar image URL or path'),
  stats: UserStatsSchema,
  achievements: z.array(z.string()).describe('List of achievements')
});

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
        schema={QuoteCardSchema}
        defaultProps={{
          quote: "The only way to do great work is to love what you do.",
          author: "Steve Jobs",
          theme: "gradient" as const
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
        schema={ProductAdSchema}
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
        schema={UserStatsVideoSchema}
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