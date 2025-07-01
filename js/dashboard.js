// Dashboard functionality
class AccessibilityDashboard {
    constructor() {
        this.data = {
            violations: 5,
            passed: 34,
            incomplete: 2,
            score: 83,
            siteUrl: 'www.ingeniux.com',
            lastScan: new Date(),
            aiInsights: [
                {
                    type: 'High Priority',
                    message: 'Color contrast issues affect 19 elements. Consider using darker shades for better readability and WCAG compliance.'
                },
                {
                    type: 'Quick Win',
                    message: 'Adding proper semantic landmarks would improve navigation for 55+ elements with minimal effort.'
                },
                {
                    type: 'Accessibility Impact',
                    message: 'The missing iframe title affects screen reader users trying to understand embedded content.'
                },
                {
                    type: 'Best Practice',
                    message: 'Implement automated accessibility testing in your deployment pipeline to catch issues early.'
                },
                {
                    type: 'User Experience',
                    message: 'These fixes will improve usability for all users, not just those using assistive technologies.'
                }
            ],
            violations: [
                {
                    id: 'color-contrast',
                    title: 'Color Contrast Insufficient',
                    description: 'Text and background colors don\'t meet WCAG 2.1 AA minimum contrast ratio requirements',
                    impact: 'serious',
                    nodes: 19,
                    guideline: '1.4.3 Contrast (Minimum) - Level AA',
                    example: {
                        element: 'Get a Demo Button',
                        code: '<a href="/demo-request" class="demo" title="Get a demo">Get a demo</a>',
                        failure: 'Contrast Ratio: 2.9:1 (Required: 4.5:1)\nColors: White text (#ffffff) on green background (#4fab41)\nImpact: Users with visual impairments may struggle to read button text'
                    },
                    learnMoreUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html'
                },
                {
                    id: 'missing-labels',
                    title: 'Form Elements Missing Labels',
                    description: 'Form controls without proper labels are not accessible to screen readers',
                    impact: 'serious',
                    nodes: 8,
                    guideline: '4.1.2 Name, Role, Value - Level A',
                    example: {
                        element: 'Search Input',
                        code: '<input type="search" placeholder="Search...">',
                        failure: 'Missing aria-label or associated label element\nScreen readers cannot identify the purpose of this input\nImpact: Users with screen readers cannot understand what to enter'
                    },
                    learnMoreUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html'
                },
                {
                    id: 'missing-alt-text',
                    title: 'Images Without Alt Text',
                    description: 'Images missing alternative text descriptions for screen readers',
                    impact: 'moderate',
                    nodes: 12,
                    guideline: '1.1.1 Non-text Content - Level A',
                    example: {
                        element: 'Product Screenshot',
                        code: '<img src="product-screenshot.jpg">',
                        failure: 'Missing alt attribute\nScreen readers will announce filename instead of meaningful description\nImpact: Blind users cannot understand the image content'
                    },
                    learnMoreUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html'
                },
                {
                    id: 'keyboard-navigation',
                    title: 'Keyboard Navigation Issues',
                    description: 'Interactive elements not accessible via keyboard navigation',
                    impact: 'serious',
                    nodes: 6,
                    guideline: '2.1.1 Keyboard - Level A',
                    example: {
                        element: 'Custom Dropdown',
                        code: '<div class="dropdown" onclick="toggleDropdown()">',
                        failure: 'Not focusable with keyboard\nNo ARIA attributes for screen reader support\nImpact: Keyboard-only users cannot access dropdown functionality'
                    },
                    learnMoreUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html'
                },
                {
                    id: 'iframe-title',
                    title: 'Iframe Missing Title',
                    description: 'Embedded content without descriptive titles',
                    impact: 'moderate',
                    nodes: 3,
                    guideline: '4.1.2 Name, Role, Value - Level A',
                    example: {
                        element: 'YouTube Video',
                        code: '<iframe src="https://youtube.com/embed/..."></iframe>',
                        failure: 'Missing title attribute\nScreen readers cannot describe the embedded content\nImpact: Users don\'t know what the embedded content contains'
                    },
                    learnMoreUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html'
                }
            ]
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateDisplay();
        this.initializeAnimations();
    }

    bindEvents() {
        // Button event listeners
        document.getElementById('settingsBtn')?.addEventListener('click', this.showSettings.bind(this));
        document.getElementById('exportBtn')?.addEventListener('click', this.exportReport.bind(this));
        document.getElementById('rerunBtn')?.addEventListener('click', this.rerunAnalysis.bind(this));
        
        // Add click events for violation cards
        document.querySelectorAll('.violation-card').forEach(card => {
            card.addEventListener('click', this.handleViolationCardClick.bind(this));
        });
    }

    updateDisplay() {
        // Update stats
        document.getElementById('violationsCount').textContent = this.data.violations.length;
        document.getElementById('passedCount').textContent = this.data.passed;
        document.getElementById('incompleteCount').textContent = this.data.incomplete;
        document.getElementById('overallScore').textContent = `${this.data.score}%`;
        
        // Update meta info
        document.getElementById('siteUrl').textContent = this.data.siteUrl;
        document.getElementById('scanDate').textContent = this.formatDate(this.data.lastScan);
        
        // Update progress bar
        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            setTimeout(() => {
                progressFill.style.width = `${this.data.score}%`;
            }, 500);
        }
        
        // Update trends
        document.getElementById('violationsTrend').textContent = '2 new since last scan';
        document.getElementById('passedTrend').textContent = '3 improved from fixes';
        
        // Render violations
        this.renderViolations();
    }

    renderViolations() {
        const container = document.getElementById('violationsContainer');
        if (!container) return;

        // Clear existing content except the first violation card (which is in HTML)
        const existingCards = container.querySelectorAll('.violation-card');
        existingCards.forEach((card, index) => {
            if (index > 0) card.remove();
        });

        // Add additional violation cards
        this.data.violations.slice(1).forEach((violation, index) => {
            const card = this.createViolationCard(violation, index + 1);
            container.appendChild(card);
        });
    }

    createViolationCard(violation, index) {
        const card = document.createElement('div');
        card.className = 'violation-card';
        card.style.animationDelay = `${(index + 1) * 0.1}s`;
        
        card.innerHTML = `
            <div class="violation-header">
                <div class="violation-title-section">
                    <h3 class="violation-title">${violation.title}</h3>
                    <p class="violation-description">${violation.description}</p>
                </div>
                <div class="violation-meta">
                    <div class="impact-badge ${violation.impact}">${violation.impact}</div>
                    <div class="node-count-badge">
                        <span>🎯</span>
                        <span>${violation.nodes} elements</span>
                    </div>
                </div>
            </div>
            <div class="violation-content">
                <p><strong>WCAG Guideline:</strong> ${violation.guideline}</p>
                
                <h4 style="margin: 20px 0 12px 0; color: var(--text-primary); font-weight: 600;">Example: ${violation.example.element}</h4>
                <div class="code-example">${this.escapeHtml(violation.example.code)}</div>
                
                <div class="failure-message">
                    ${violation.example.failure.replace(/\n/g, '<br>')}
                </div>

                <a href="${violation.learnMoreUrl}" class="learn-more-link" target="_blank" rel="noopener">
                    <span>Learn More</span>
                    <svg class="icon icon-sm" viewBox="0 0 24 24">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                        <polyline points="15,3 21,3 21,9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                </a>
            </div>
        `;
        
        return card;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }).format(date);
    }

    showSettings() {
        this.showToast('Settings panel would open here', 'info');
    }

    async exportReport() {
        const button = document.getElementById('exportBtn');
        const originalText = button.innerHTML;
        
        // Disable button and show loading
        button.disabled = true;
        button.innerHTML = `
            <div class="loading-spinner" style="width: 16px; height: 16px; border-width: 2px;"></div>
            <span>Exporting...</span>
        `;
        
        try {
            // Simulate export process
            await this.delay(2000);
            
            // Create and download a simple report
            const reportData = {
                siteUrl: this.data.siteUrl,
                scanDate: this.data.lastScan,
                score: this.data.score,
                violations: this.data.violations,
                passed: this.data.passed,
                incomplete: this.data.incomplete,
                violationDetails: this.data.violations
            };
            
            const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `accessibility-report-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showToast('Report exported successfully!', 'success');
        } catch (error) {
            this.showToast('Export failed. Please try again.', 'error');
        } finally {
            button.disabled = false;
            button.innerHTML = originalText;
        }
    }

    async rerunAnalysis() {
        const button = document.getElementById('rerunBtn');
        const originalText = button.innerHTML;
        const loadingOverlay = document.getElementById('loadingOverlay');
        
        // Show loading overlay
        loadingOverlay.style.display = 'flex';
        
        // Disable button
        button.disabled = true;
        button.innerHTML = `
            <div class="loading-spinner" style="width: 16px; height: 16px; border-width: 2px;"></div>
            <span>Analyzing...</span>
        `;
        
        try {
            // Always use the Render backend for analysis
            const response = await fetch('https://a11y-backend.onrender.com/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: this.data.siteUrl.startsWith('http') ? this.data.siteUrl : `https://${this.data.siteUrl}` })
            });
            if (!response.ok) throw new Error('Backend analysis failed');
            const axeResults = await response.json();

            // Map Axe results to dashboard data
            this.data.violations = axeResults.violations.length;
            this.data.passed = axeResults.passes ? axeResults.passes.length : 0;
            this.data.incomplete = axeResults.incomplete ? axeResults.incomplete.length : 0;
            this.data.score = this.calculateScore(axeResults);
            this.data.lastScan = new Date();
            this.data.violations = axeResults.violations.map(v => ({
                id: v.id,
                title: v.help,
                description: v.description,
                impact: v.impact || 'minor',
                nodes: v.nodes.length,
                guideline: v.tags && v.tags.length ? v.tags.join(', ') : '',
                example: {
                    element: v.nodes[0]?.html || '',
                    code: v.nodes[0]?.html || '',
                    failure: v.nodes[0]?.failureSummary || v.help
                },
                learnMoreUrl: v.helpUrl
            }));

            // Update display
            this.updateDisplay();
            this.showToast('Analysis completed successfully!', 'success');
        } catch (error) {
            this.showToast('Analysis failed. Please try again.', 'error');
        } finally {
            // Hide loading overlay
            loadingOverlay.style.display = 'none';
            // Restore button
            button.disabled = false;
            button.innerHTML = originalText;
        }
    }

    calculateScore(axeResults) {
        // Simple scoring: 100 - (violations * 5), min 0, max 100
        const v = axeResults.violations.length;
        let score = 100 - v * 5;
        if (score < 0) score = 0;
        if (score > 100) score = 100;
        return score;
    }

    handleViolationCardClick(event) {
        const card = event.currentTarget;
        const title = card.querySelector('.violation-title').textContent;
        
        // Add a subtle animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        this.showToast(`Clicked on: ${title}`, 'info');
    }

    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                ${this.getToastIcon(type)}
            </div>
            <div class="toast-message">${message}</div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <svg class="icon icon-sm" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        `;
        
        toastContainer.appendChild(toast);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 5000);
    }

    getToastIcon(type) {
        const icons = {
            success: `<svg class="icon icon-sm" viewBox="0 0 24 24" style="color: var(--accent-green);">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                        <polyline points="22,4 12,14.01 9,11.01"/>
                      </svg>`,
            error: `<svg class="icon icon-sm" viewBox="0 0 24 24" style="color: var(--accent-red);">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="15" y1="9" x2="9" y2="15"/>
                      <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>`,
            info: `<svg class="icon icon-sm" viewBox="0 0 24 24" style="color: var(--accent-blue);">
                     <circle cx="12" cy="12" r="10"/>
                     <line x1="12" y1="16" x2="12" y2="12"/>
                     <line x1="12" y1="8" x2="12.01" y2="8"/>
                   </svg>`
        };
        return icons[type] || icons.info;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    initializeAnimations() {
        // Trigger progress bar animation
        setTimeout(() => {
            const progressFill = document.getElementById('progressFill');
            if (progressFill) {
                const progress = progressFill.getAttribute('data-progress');
                progressFill.style.width = `${progress}%`;
            }
        }, 1000);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AccessibilityDashboard();
});

// Add some utility functions for the global scope
window.toggleDropdown = function(element) {
    console.log('Dropdown toggled');
};

// Keyboard navigation improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or overlays
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay && loadingOverlay.style.display !== 'none') {
            loadingOverlay.style.display = 'none';
        }
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityDashboard;
} 