# Accessibility Dashboard

A modern, interactive dashboard for WCAG 2.1 compliance reporting and accessibility analysis. Built for content management systems like Ingeniux CMS to help teams track and improve their website accessibility.

![Accessibility Dashboard](https://via.placeholder.com/800x400/2563eb/ffffff?text=Accessibility+Dashboard)

## 🌟 Features

- **Real-time Analytics**: Live monitoring of accessibility metrics
- **WCAG 2.1 Compliance**: Comprehensive reporting against WCAG 2.1 AA standards
- **Interactive Visualizations**: Beautiful charts and progress indicators
- **AI-Powered Insights**: Smart recommendations for accessibility improvements
- **Export Functionality**: Download detailed accessibility reports
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with clean, accessible design principles

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ (for development server)
- Modern web browser
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/accessibility-dashboard.git
   cd accessibility-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
accessibility-dashboard/
├── index.html              # Main HTML file
├── styles/
│   └── main.css            # Stylesheet with CSS custom properties
├── js/
│   ├── dashboard.js        # Core dashboard functionality
│   └── animations.js       # UI animations and effects
├── package.json            # Node.js dependencies and scripts
├── vercel.json            # Vercel deployment configuration
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## 🎨 Customization

### Styling

The dashboard uses CSS custom properties for easy theming:

```css
:root {
    --accent-blue: #2563eb;
    --accent-green: #059669;
    --accent-red: #dc2626;
    /* ... more variables */
}
```

### Data Integration

To connect your own accessibility data, modify the `data` object in `js/dashboard.js`:

```javascript
this.data = {
    violations: 5,
    passed: 34,
    incomplete: 2,
    score: 83,
    siteUrl: 'your-website.com',
    // ... add your data
};
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (static site)
- `npm run start` - Start production server
- `npm run preview` - Preview production build

### Code Structure

- **dashboard.js**: Main application logic, data management, and event handling
- **animations.js**: Smooth animations, transitions, and visual effects
- **main.css**: Responsive styling with modern CSS features

## 🚀 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts** and your dashboard will be live!

### Deploy to Netlify

1. Connect your Git repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.`
4. Deploy!

### Deploy to GitHub Pages

1. Push to GitHub
2. Go to repository Settings > Pages
3. Select source branch
4. Your site will be available at `https://username.github.io/accessibility-dashboard`

## 🧪 Testing

The dashboard includes interactive features you can test:

- **Re-run Analysis**: Click to simulate new accessibility scans
- **Export Report**: Download accessibility data as JSON
- **Interactive Cards**: Click on violation cards for details
- **Toast Notifications**: See real-time feedback
- **Responsive Design**: Test on different screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📊 Accessibility Features

This dashboard itself follows accessibility best practices:

- ✅ Semantic HTML structure
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ High contrast colors
- ✅ Responsive design
- ✅ Screen reader friendly
- ✅ Focus management

## 🔧 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📖 API Documentation

### Dashboard Class

The main `AccessibilityDashboard` class provides these methods:

- `updateDisplay()` - Refresh dashboard data
- `exportReport()` - Generate and download report
- `rerunAnalysis()` - Simulate new accessibility scan
- `showToast(message, type)` - Display notification

### Animations Class

The `DashboardAnimations` class handles:

- Scroll-triggered animations
- Count-up number animations
- Hover effects
- Progress bar animations
- Success celebrations

## 🐛 Troubleshooting

### Common Issues

1. **Dashboard not loading**
   - Check browser console for errors
   - Ensure all files are properly linked
   - Verify web server is running

2. **Animations not working**
   - Check browser support for CSS animations
   - Verify JavaScript is enabled
   - Look for console errors

3. **Export not working**
   - Ensure browser allows file downloads
   - Check popup blockers
   - Verify JavaScript permissions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web standards
- Icons from [Tabler Icons](https://tabler-icons.io/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Inspired by accessibility advocacy and WCAG guidelines

## 📞 Support

- 📧 Email: support@your-domain.com
- 💬 Issues: [GitHub Issues](https://github.com/your-username/accessibility-dashboard/issues)
- 📚 Documentation: [Project Wiki](https://github.com/your-username/accessibility-dashboard/wiki)

---

Made with ❤️ for a more accessible web 