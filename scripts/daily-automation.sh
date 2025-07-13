#!/bin/bash

# Daily content automation script
# Usage: ./scripts/daily-automation.sh

DATE=$(date +"%Y-%m-%d")
QUOTES_API="https://api.quotable.io/random"

echo "🌅 Generating daily content for $DATE..."

# Fetch a random quote
QUOTE_DATA=$(curl -s "$QUOTES_API")
QUOTE=$(echo "$QUOTE_DATA" | jq -r '.content')
AUTHOR=$(echo "$QUOTE_DATA" | jq -r '.author')

# Generate daily quote card
echo "📝 Creating daily quote card..."
npx remotion render QuoteCard "output/daily-quote-$DATE.mp4" \
  --props="{\"quote\":\"$QUOTE\",\"author\":\"$AUTHOR\",\"theme\":\"gradient\"}" \
  --overwrite

echo "✅ Daily content generated: output/daily-quote-$DATE.mp4"
echo "Quote: $QUOTE - $AUTHOR"

# Optional: Upload to social media platforms
# Uncomment and configure based on your platforms
# echo "📤 Uploading to social media..."
# python3 scripts/upload-to-instagram.py "output/daily-quote-$DATE.mp4"
# python3 scripts/upload-to-youtube.py "output/daily-quote-$DATE.mp4"