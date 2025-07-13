#!/bin/bash

# Batch render script for multiple variations
# Usage: ./scripts/batch-render.sh

echo "🎬 Starting batch render of all examples..."

# Create output directory if it doesn't exist
mkdir -p output

# Render Quote Card variations
echo "📝 Rendering Quote Card variations..."
npx remotion render QuoteCard output/quote-gradient.mp4 --props='{"quote":"The only way to do great work is to love what you do.","author":"Steve Jobs","theme":"gradient"}' --overwrite
npx remotion render QuoteCard output/quote-dark.mp4 --props='{"quote":"Innovation distinguishes between a leader and a follower.","author":"Steve Jobs","theme":"dark"}' --overwrite
npx remotion render QuoteCard output/quote-minimal.mp4 --props='{"quote":"Simplicity is the ultimate sophistication.","author":"Leonardo da Vinci","theme":"minimal"}' --overwrite

# Render Product Ad variations
echo "🛍️ Rendering Product Ad variations..."
npx remotion render ProductAd output/product-headphones.mp4 --props='{"productName":"Premium Headphones","price":299,"discount":0.2,"callToAction":"Buy Now - 20% Off","brandColors":{"primary":"#1a1a1a","accent":"#ff6b6b","text":"#ffffff"}}' --overwrite
npx remotion render ProductAd output/product-smartwatch.mp4 --props='{"productName":"Smart Watch Pro","price":399,"discount":0.25,"callToAction":"Limited Time - 25% Off","brandColors":{"primary":"#000000","accent":"#00ff88","text":"#ffffff"}}' --overwrite

# Render User Stats variations
echo "📊 Rendering User Stats variations..."
npx remotion render UserStatsVideo output/user-alex.mp4 --props='{"userName":"Alex Creator","stats":{"views":125000,"followers":5420,"likes":18500,"videos":47},"achievements":["10K Followers","Viral Video","Creator of the Month"]}' --overwrite
npx remotion render UserStatsVideo output/user-sarah.mp4 --props='{"userName":"Sarah Designer","stats":{"views":250000,"followers":12500,"likes":45000,"videos":89},"achievements":["50K Followers","Top Creator 2024","Viral Video Champion"]}' --overwrite

echo "✅ Batch rendering complete! Check the output/ folder for all videos."
echo "📁 Generated files:"
ls -la output/*.mp4