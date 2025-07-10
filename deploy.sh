#!/bin/bash

# RCV Explained - Deployment Script
# This script helps deploy the static site to various hosting services

echo "🚀 RCV Explained - Deployment Helper"
echo "====================================="

# Check if files exist
if [ ! -f "index.html" ] || [ ! -f "styles.css" ] || [ ! -f "script.js" ]; then
    echo "❌ Error: Required files missing. Make sure you're in the project directory."
    exit 1
fi

echo "✅ All required files found!"

# Show deployment options
echo ""
echo "Choose your deployment method:"
echo "1) GitHub Pages (recommended)"
echo "2) Netlify (drag & drop)"
echo "3) Vercel"
echo "4) Just validate files"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "📋 GitHub Pages Deployment Steps:"
        echo "1. Create a new GitHub repository"
        echo "2. Upload these files to the repository:"
        echo "   - index.html"
        echo "   - styles.css" 
        echo "   - script.js"
        echo "   - 404.html"
        echo "   - README.md"
        echo "3. Go to Settings → Pages"
        echo "4. Select 'Deploy from a branch' → 'main' branch"
        echo "5. Your site will be live in a few minutes!"
        echo ""
        echo "🌐 Repository URL format: https://username.github.io/repository-name"
        ;;
    2)
        echo ""
        echo "📋 Netlify Deployment Steps:"
        echo "1. Go to https://netlify.com"
        echo "2. Drag and drop this entire folder to the deployment area"
        echo "3. Your site will be instantly deployed!"
        echo "4. You'll get a random URL like: https://random-name.netlify.app"
        echo "5. You can customize the URL in the site settings"
        ;;
    3)
        echo ""
        echo "📋 Vercel Deployment Steps:"
        echo "1. Install Vercel CLI: npm i -g vercel"
        echo "2. Run: vercel"
        echo "3. Follow the prompts to deploy"
        echo "4. Your site will be live at the provided URL"
        ;;
    4)
        echo ""
        echo "🔍 File Validation:"
        echo "✅ index.html - Main page"
        echo "✅ styles.css - Styles and design system"
        echo "✅ script.js - Interactive features"
        echo "✅ 404.html - Error page"
        echo "✅ README.md - Documentation"
        echo ""
        echo "📊 File sizes:"
        ls -lh *.html *.css *.js
        echo ""
        echo "🎯 Ready for deployment!"
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "💡 Tips:"
echo "- Test locally first by opening index.html in your browser"
echo "- Check that dark mode toggle works"
echo "- Verify the RCV simulator generates and runs elections"
echo "- Test on mobile devices for responsiveness"
echo ""
echo "🎉 Happy deploying!" 