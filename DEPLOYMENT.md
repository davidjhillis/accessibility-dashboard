# Deployment Guide

This guide will help you deploy the Accessibility Dashboard to various platforms.

## 🚀 Quick Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI globally**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from the project root**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy: `Y`
   - Which scope: Choose your account
   - Link to existing project: `N`
   - Project name: `accessibility-dashboard` (or your preferred name)
   - Directory: `./` (current directory)

5. **Your dashboard will be live!** Vercel will provide you with URLs like:
   - Preview: `https://accessibility-dashboard-abc123.vercel.app`
   - Production: `https://accessibility-dashboard.vercel.app`

### Option 2: Deploy via GitHub Integration

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/accessibility-dashboard.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the settings
   - Click "Deploy"

## 🌐 Alternative Deployment Options

### Deploy to Netlify

1. **Option A: Drag & Drop**
   - Build your project: `npm run build`
   - Go to [netlify.com](https://netlify.com)
   - Drag the project folder to the deploy area

2. **Option B: Git Integration**
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `./`

### Deploy to GitHub Pages

1. **Enable GitHub Pages**
   ```bash
   git checkout -b gh-pages
   git push origin gh-pages
   ```

2. **Go to Repository Settings**
   - Navigate to "Pages" section
   - Select source: "Deploy from a branch"
   - Branch: `gh-pages`
   - Your site: `https://USERNAME.github.io/accessibility-dashboard`

### Deploy to Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Deploy**
   ```bash
   firebase deploy
   ```

## 🔧 Environment Configuration

### Custom Domain Setup (Vercel)

1. **Add domain in Vercel dashboard**
   - Go to your project settings
   - Navigate to "Domains"
   - Add your custom domain

2. **Configure DNS**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or add A record pointing to Vercel's IP

### Environment Variables

If you need to add environment variables:

1. **Create `.env.local` file** (not tracked by git)
   ```
   NEXT_PUBLIC_API_URL=https://your-api.com
   ANALYTICS_ID=your-analytics-id
   ```

2. **Add to Vercel dashboard**
   - Go to project settings
   - Navigate to "Environment Variables"
   - Add your variables

## 🎯 Performance Optimization

### Pre-deployment Checklist

- [ ] Test all interactive features
- [ ] Verify responsive design on different devices
- [ ] Check accessibility compliance
- [ ] Test export functionality
- [ ] Validate all animations work smoothly
- [ ] Ensure proper error handling

### Post-deployment Verification

1. **Test the live site**
   ```bash
   # Test with curl
   curl -I https://your-domain.com
   
   # Check response headers
   curl -H "Accept: text/html" https://your-domain.com
   ```

2. **Verify features**
   - [ ] Dashboard loads correctly
   - [ ] Stats animate properly
   - [ ] Export button works
   - [ ] Re-run analysis functions
   - [ ] Toast notifications appear
   - [ ] Responsive design works

## 🔒 Security Headers

The project includes security headers in `vercel.json`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

## 📊 Analytics Setup

### Google Analytics (Optional)

1. **Add tracking code to `index.html`**
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_TRACKING_ID');
   </script>
   ```

### Vercel Analytics

1. **Enable in Vercel dashboard**
   - Go to your project
   - Navigate to "Analytics"
   - Enable Web Analytics

## 🐛 Troubleshooting Deployment

### Common Issues

1. **Build fails**
   - Check `package.json` scripts
   - Verify all dependencies are listed
   - Check for syntax errors

2. **404 errors**
   - Verify `vercel.json` routing configuration
   - Check file paths and naming

3. **Assets not loading**
   - Check relative paths in HTML
   - Verify CSS/JS file references

4. **JavaScript errors**
   - Check browser console
   - Verify all scripts are properly linked
   - Test in different browsers

### Debug Commands

```bash
# Check project structure
ls -la

# Verify package.json
cat package.json

# Test local build
npm run build

# Check git status
git status

# View recent commits
git log --oneline -5
```

## 🔄 Continuous Deployment

With GitHub integration, your dashboard will automatically redeploy when you:

1. **Make changes and push**
   ```bash
   git add .
   git commit -m "Update dashboard features"
   git push origin main
   ```

2. **Vercel will automatically:**
   - Detect the changes
   - Build the project
   - Deploy to production
   - Update the live URL

## 🎉 Success!

Your Accessibility Dashboard is now live! Share the URL with your team and start monitoring your website's accessibility compliance.

### Next Steps

- Customize the dashboard data for your website
- Set up regular accessibility scans
- Configure team notifications
- Add custom branding
- Integrate with your CMS

---

Need help? Check the [main README](README.md) or open an issue on GitHub. 