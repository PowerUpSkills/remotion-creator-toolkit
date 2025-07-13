# Remotion Creator Toolkit 🎥

> **Complete toolkit for creators to build automated social media content, ads, and personalized videos with code**

Transform your video creation workflow with the power of programmatic video generation using Remotion and React.

**📖 This repository is the companion code for my Medium article:**  
**[The Creator's Complete Guide to Remotion: Build Videos with Code](https://medium.com/@PowerUpSkills)**

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 16+** (18+ recommended)
- **Git** for version control
- **Basic React knowledge** (helpful but not required)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/PowerUpSkills/remotion-creator-toolkit.git
cd remotion-creator-toolkit
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development studio**
```bash
npm start
# Opens Remotion Studio at http://localhost:3000
```

4. **Edit properties interactively**
   - Select any composition in the left panel
   - Use the **right panel** to edit text, colors, and data in real-time
   - Watch your changes update instantly in the preview!

5. **Test render an example**
```bash
npm run render:quote
# Creates output/quote-card.mp4
```

---

## 📁 Project Structure

```
remotion-creator-toolkit/
├── src/
│   ├── examples/
│   │   ├── social-media/
│   │   │   └── QuoteCard.tsx           # Instagram quote cards with themes
│   │   ├── advertisements/
│   │   │   └── ProductAd.tsx           # Product showcase with animations
│   │   └── personalization/
│   │       └── UserStatsVideo.tsx      # Animated user statistics
│   ├── Root.tsx                        # Composition registry
│   └── index.ts                        # Entry point
├── scripts/
│   ├── batch-render.sh                 # Automated batch rendering
│   └── daily-automation.sh             # Daily content generation
├── examples-data/
│   └── users.json                      # Sample user data
├── output/                             # Rendered videos
└── README.md                           # This file
```

---

## 🎯 Example Use Cases

### 1. Social Media Content - Quote Cards

**Perfect for**: Daily motivation posts, brand quotes, inspirational content

**Features**:
- Multiple themes (gradient, dark, minimal)
- Animated text entrance
- Customizable typography and colors
- Optimized for Instagram (1080x1080)

**Usage**:
```bash
npm run render:quote
```

**Customization**:
```bash
remotion render QuoteCard quote-custom.mp4 --props='{
  "quote": "Innovation distinguishes between a leader and a follower",
  "author": "Steve Jobs",
  "theme": "minimal"
}'
```

### 2. Advertisement Templates - Product Ads

**Perfect for**: E-commerce promotions, product launches, A/B testing

**Features**:
- Dynamic pricing with discount calculations
- Brand color theming
- Animated product showcase
- Call-to-action buttons
- Professional animations

**Usage**:
```bash
npm run render:product-ad
```

**Customization**:
```bash
remotion render ProductAd product-promo.mp4 --props='{
  "productName": "Smart Watch Pro",
  "price": 399,
  "discount": 0.25,
  "callToAction": "Limited Time - 25% Off",
  "brandColors": {
    "primary": "#000000",
    "accent": "#00ff88",
    "text": "#ffffff"
  }
}'
```

### 3. Personalized Videos - User Stats

**Perfect for**: Year-end reviews, milestone celebrations, user engagement

**Features**:
- Animated statistics counters
- Achievement showcases
- Personalized user data
- Professional transitions
- Multi-sequence storytelling

**Usage**:
```bash
npm run render:user-stats
```

**Customization**:
```bash
remotion render UserStatsVideo user-review.mp4 --props='{
  "userName": "Sarah Designer",
  "stats": {
    "views": 250000,
    "followers": 12500,
    "likes": 45000,
    "videos": 89
  },
  "achievements": [
    "50K Followers",
    "Top Creator 2024",
    "Viral Video Champion"
  ]
}'
```

---

## 🛠️ Development Workflow

### Running the Studio
```bash
npm start
```
This opens **Remotion Studio** where you can:
- Preview videos in real-time
- **Edit properties interactively** in the right panel (quotes, colors, data)
- Scrub through timelines
- Export videos directly
- **No code required** for customization!

### Interactive Property Editing ✨

**No coding required!** Each template includes interactive controls:

**QuoteCard**:
- 📝 Edit quote text and author name
- 🎨 Switch themes (gradient, dark, minimal) with dropdown
- 👀 See changes instantly in preview

**ProductAd**:
- 🏷️ Change product name and call-to-action text
- 💰 Adjust pricing and discount percentage
- 🎨 Pick brand colors with color picker

**UserStatsVideo**:
- 👤 Edit user name and profile
- 📊 Modify stats (views, followers, likes, videos)
- 🏆 Add/remove achievements from list

Simply select a composition and use the **right panel** to customize everything!

### Rendering Videos

**Single video**:
```bash
remotion render [CompositionId] output/filename.mp4
```

**Batch rendering**:
```bash
npm run render:all
```

**Custom properties**:
```bash
remotion render QuoteCard custom-quote.mp4 --props='{"quote":"Your custom quote","author":"Author Name"}'
```

---

## 🎨 Customization Guide

### Brand Colors
Each template supports brand color customization:

```typescript
const brandColors = {
  primary: '#1a1a1a',    // Background color
  accent: '#ff6b6b',     // Highlight color
  text: '#ffffff'        // Text color
};
```

### Animation Timing
Modify animation speeds by adjusting frame values:

```typescript
const fadeIn = interpolate(frame, [0, 30], [0, 1]); // 1 second fade
const slideUp = interpolate(frame, [0, 60], [100, 0]); // 2 second slide
```

### Typography
Customize fonts and sizes:

```typescript
const textStyle = {
  fontFamily: 'Arial, sans-serif',
  fontSize: 48,
  fontWeight: 'bold'
};
```

---

## 📱 Platform Optimization

### Instagram (1080x1080)
```typescript
<Composition
  width={1080}
  height={1080}
  // ... other props
/>
```

### YouTube Thumbnail (1280x720)
```typescript
<Composition
  width={1280}
  height={720}
  // ... other props
/>
```

### TikTok/Stories (720x1280)
```typescript
<Composition
  width={720}
  height={1280}
  // ... other props
/>
```

---

## 🚀 Advanced Features

### API Integration
Fetch dynamic data for your videos:

```typescript
const [data, setData] = useState(null);
const [handle] = useState(() => delayRender());

useEffect(() => {
  fetch('/api/user-stats')
    .then(res => res.json())
    .then(data => {
      setData(data);
      continueRender(handle);
    });
}, []);
```

### Batch Processing
Generate multiple videos with different data:

```bash
#!/bin/bash
# Generate videos for multiple users
for user in users/*.json; do
  remotion render UserStatsVideo "output/$(basename "$user" .json).mp4" --props="$(cat "$user")"
done
```

### Performance Optimization

**Development vs Production**:
```typescript
const isDev = process.env.NODE_ENV === 'development';

<Composition
  width={isDev ? 540 : 1080}  // Lower resolution for faster preview
  height={isDev ? 540 : 1080}
/>
```

**Asset Preloading**:
```typescript
import {prefetch} from 'remotion';

useEffect(() => {
  prefetch('/large-background.jpg');
  prefetch('/brand-logo.png');
}, []);
```

---

## 📊 Creator Use Cases

### Content Creator Workflow
```bash
# Morning routine: Generate daily content
npm run render:quote -- --props='{"quote":"Daily motivation quote","author":"You"}'

# Product launch: Create ad variants
for theme in gradient dark minimal; do
  remotion render ProductAd "ads/product-$theme.mp4" --props="{\"theme\":\"$theme\"}"
done

# Monthly review: User stats video
remotion render UserStatsVideo "monthly-review.mp4" --props="$(curl -s /api/monthly-stats)"
```

### A/B Testing
Generate multiple ad variants:
```bash
# Test different CTAs
remotion render ProductAd ad-v1.mp4 --props='{"callToAction":"Buy Now"}'
remotion render ProductAd ad-v2.mp4 --props='{"callToAction":"Shop Today"}'
remotion render ProductAd ad-v3.mp4 --props='{"callToAction":"Get Yours"}'
```

### Personalization at Scale
```bash
# Generate personalized videos for all users
jq -c '.[]' users.json | while read user; do
  id=$(echo "$user" | jq -r '.id')
  remotion render UserStatsVideo "personalized/user-$id.mp4" --props="$user"
done
```

---

## 🏗️ Building Your Own Templates

### 1. Create Component Structure
```typescript
interface MyTemplateProps {
  title: string;
  data: any[];
  theme: 'light' | 'dark';
}

export const MyTemplate: React.FC<MyTemplateProps> = ({ title, data, theme }) => {
  const frame = useCurrentFrame();
  
  return (
    <AbsoluteFill>
      {/* Your template content */}
    </AbsoluteFill>
  );
};
```

### 2. Register in Root.tsx
```typescript
<Composition
  id="MyTemplate"
  component={MyTemplate}
  durationInFrames={180}
  fps={30}
  width={1080}
  height={1080}
  defaultProps={{
    title: "Default Title",
    data: [],
    theme: "light"
  }}
/>
```

### 3. Add Render Script
```json
{
  "scripts": {
    "render:my-template": "remotion render MyTemplate output/my-template.mp4"
  }
}
```

---

## 🔧 Technical Requirements

- **Node.js**: 16+ (18+ recommended)
- **RAM**: 4GB minimum, 8GB+ recommended
- **Storage**: 2GB for dependencies and cache
- **OS**: macOS, Windows, or Linux

---

## 📖 Learning Resources

- **📝 [Medium Article](https://medium.com/@PowerUpSkills)** - Complete guide that accompanies this code
- [Remotion Documentation](https://www.remotion.dev/docs)
- [React Fundamentals](https://react.dev/learn)
- [Animation Principles](https://www.remotion.dev/docs/animating)
- [Performance Guide](https://www.remotion.dev/docs/performance)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-template`)
3. Add your template to the appropriate folder
4. Update the README and Root.tsx
5. Commit your changes (`git commit -m 'Add amazing template'`)
6. Push to the branch (`git push origin feature/amazing-template`)
7. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Note**: Remotion itself has a special license. For individual creators, it's free to use. Companies with 4+ employees need a paid license. See [Remotion's licensing](https://www.remotion.dev/license) for details.

---

## 🎯 Next Steps

1. **Explore the examples** in Remotion Studio
2. **Customize templates** with your brand colors and content
3. **Set up automation** workflows for regular content creation
4. **Integrate with APIs** for dynamic, data-driven videos
5. **Scale your content** production 10x with programmatic generation

---

## 📞 Support

- 🐛 [Report bugs](https://github.com/PowerUpSkills/remotion-creator-toolkit/issues)
- 💡 [Request features](https://github.com/PowerUpSkills/remotion-creator-toolkit/discussions)
- 📚 [Remotion Community](https://discord.gg/6VzzNDwUwV)
- 📖 [Read the full guide](https://medium.com/@PowerUpSkills)

---

**Ready to revolutionize your video creation workflow?** Start with `npm start` and begin building videos with code! 🚀