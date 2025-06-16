class TNFDashboard {
    constructor() {
        this.currentView = 'overview';
        this.selectedWeek = null;
        this.selectedFormat = null;
        this.animationEnabled = true;
        this.init();
    }

    init() {
        this.setupDOM();
        this.loadData();
        this.createDashboard();
        this.bindEvents();
        this.initAnimations();
        this.hideLoadingScreen();
    }

    setupDOM() {
        this.root = document.getElementById('root');
        this.root.innerHTML = this.getInitialHTML();
    }

    getInitialHTML() {
        return `
            <div class="loading-screen" id="loadingScreen">
                <div class="loading-content">
                    <div class="loading-logo">
                        <div class="loading-ring"></div>
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 36px;">🏈</div>
                    </div>
                    <h2 style="color: var(--color-primary); margin-bottom: 10px;">TNF 2025</h2>
                    <p style="color: rgba(255, 255, 255, 0.7);">Loading Premium Experience...</p>
                </div>
            </div>

            <nav class="navigation">
                <div class="container">
                    <div class="nav-content">
                        <a href="#" class="nav-logo">
                            <div class="nav-logo-icon">🏈</div>
                            <span>TNF 2025</span>
                        </a>
                        <ul class="nav-tabs">
                            <li><a href="#overview" class="nav-tab active" data-view="overview">Overview</a></li>
                            <li><a href="#creative" class="nav-tab" data-view="creative">Creative Suite</a></li>
                            <li><a href="#formats" class="nav-tab" data-view="formats">Ad Formats</a></li>
                            <li><a href="#timeline" class="nav-tab" data-view="timeline">Campaign Timeline</a></li>
                            <li><a href="#audience" class="nav-tab" data-view="audience">Targeting</a></li>
                            <li><a href="#proposal" class="nav-tab" data-view="proposal">Investment</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main id="mainContent">
                <!-- Dynamic content will be inserted here -->
            </main>
        `;
    }

    loadData() {
        this.data = {
            campaign: {
                name: "Thursday Night Football 2025",
                client: "Amazon Prime Video",
                duration: "16 Weeks",
                startDate: "September 4, 2025",
                endDate: "December 25, 2025",
                totalGames: 16,
                reach: "45M+ Unique Viewers",
                impressions: "450M+ Premium Impressions"
            },
            weeks: [
                { week: 2, date: "Sep 11", teams: "Packers vs Commanders", priority: "high", theme: "Season Kickoff", special: true },
                { week: 3, date: "Sep 18", teams: "Bills vs Dolphins", priority: "medium", theme: "Division Rivalry" },
                { week: 4, date: "Sep 25", teams: "Seahawks vs Cardinals", priority: "medium", theme: "NFC West Battle" },
                { week: 5, date: "Oct 2", teams: "49ers vs Rams", priority: "high", theme: "California Clash" },
                { week: 6, date: "Oct 9", teams: "Eagles vs Giants", priority: "high", theme: "NFC East Showdown" },
                { week: 7, date: "Oct 16", teams: "Steelers vs Bengals", priority: "medium", theme: "AFC North Battle" },
                { week: 8, date: "Oct 23", teams: "Vikings vs Chargers", priority: "medium", theme: "Cross-Conference" },
                { week: 9, date: "Oct 30", teams: "Ravens vs Dolphins", priority: "medium", theme: "Halloween Game" },
                { week: 10, date: "Nov 6", teams: "Raiders vs Broncos", priority: "medium", theme: "AFC West Rivalry" },
                { week: 11, date: "Nov 13", teams: "Jets vs Patriots", priority: "high", theme: "Classic Rivalry" },
                { week: 12, date: "Nov 20", teams: "Bills vs Texans", priority: "high", theme: "Playoff Preview" },
                { week: 13, date: "Nov 28", teams: "Bears vs Eagles", priority: "critical", theme: "Black Friday Special", special: true },
                { week: 14, date: "Dec 4", teams: "Cowboys vs Lions", priority: "medium", theme: "NFC Showdown" },
                { week: 15, date: "Dec 11", teams: "Falcons vs Buccaneers", priority: "medium", theme: "NFC South Battle" },
                { week: 16, date: "Dec 18", teams: "Rams vs Seahawks", priority: "high", theme: "Division Decider" },
                { week: 17, date: "Dec 25", teams: "Broncos vs Chiefs", priority: "critical", theme: "Christmas Special", special: true }
            ],
            formats: [
                {
                    name: "Venti Video",
                    description: "Premium full-screen video experience with interactive elements",
                    specs: { duration: "15-30s", viewability: "95%+", engagement: "18%" },
                    features: ["Auto-play capability", "Interactive CTAs", "Dynamic creative optimization", "Live score integration"]
                },
                {
                    name: "Runway",
                    description: "High-impact display format with cinematic transitions",
                    specs: { size: "Responsive", viewability: "92%+", engagement: "14%" },
                    features: ["Parallax effects", "Multi-asset carousel", "Gesture controls", "Real-time updates"]
                },
                {
                    name: "Hover",
                    description: "Engaging hover-activated rich media experience",
                    specs: { activation: "Hover/Touch", viewability: "88%+", engagement: "22%" },
                    features: ["User-initiated expansion", "Video integration", "Social sharing", "Team customization"]
                },
                {
                    name: "Outstream",
                    description: "Native video placement within editorial content",
                    specs: { placement: "In-article", viewability: "90%+", completion: "75%" },
                    features: ["Contextual placement", "Sound-off autoplay", "Scroll-triggered", "Caption support"]
                },
                {
                    name: "Connected TV",
                    description: "Premium large-screen experience for streaming devices",
                    specs: { resolution: "4K", viewability: "98%+", completion: "85%" },
                    features: ["TV-optimized creative", "QR code integration", "Second-screen sync", "Voice activation ready"]
                }
            ],
            audiences: {
                primary: [
                    { name: "TNF Avid Fans", size: "2.3M", index: 487, description: "Watch 10+ games per season" },
                    { name: "TNF Enthusiasts", size: "4.1M", index: 342, description: "High engagement viewers" },
                    { name: "Prime Video Sports", size: "8.7M", index: 256, description: "Regular sports streamers" }
                ],
                secondary: [
                    { name: "Fantasy Players", size: "6.2M", index: 298, description: "Active fantasy participants" },
                    { name: "Team Loyalists", size: "12.4M", index: 189, description: "Strong team affinity" },
                    { name: "Casual Viewers", size: "18.2M", index: 124, description: "Occasional watchers" }
                ]
            },
            creative: {
                phases: [
                    {
                        name: "Pre-Game Build-Up",
                        timing: "Tuesday-Wednesday",
                        variants: ["Player Spotlight", "Team Stats", "Rivalry History"],
                        cta: "Set Reminder"
                    },
                    {
                        name: "Game Day Hype",
                        timing: "Thursday AM",
                        variants: ["Tonight's Matchup", "Key Players", "Live Countdown"],
                        cta: "Watch Tonight"
                    },
                    {
                        name: "Live Experience",
                        timing: "Thursday PM",
                        variants: ["Live Scores", "Real-time Stats", "Play Highlights"],
                        cta: "Watch Now"
                    }
                ]
            },
            investment: {
                tiers: [
                    {
                        name: "Touchdown",
                        amount: "$500K",
                        features: ["3 Premium Formats", "8 Game Coverage", "Standard Targeting"],
                        color: "bronze"
                    },
                    {
                        name: "Field Goal",
                        amount: "$1M",
                        features: ["5 Premium Formats", "Full Season Coverage", "Advanced Targeting", "Custom Creative"],
                        color: "silver"
                    },
                    {
                        name: "Championship",
                        amount: "$2M+",
                        features: ["All Formats", "Exclusive Placements", "First-Party Data", "Dedicated Team", "Real-time Optimization"],
                        color: "gold"
                    }
                ]
            }
        };
    }

    createDashboard() {
        this.renderView(this.currentView);
    }

    renderView(view) {
        const content = document.getElementById('mainContent');
        let html = '';

        switch(view) {
            case 'overview':
                html = this.renderOverview();
                break;
            case 'creative':
                html = this.renderCreative();
                break;
            case 'formats':
                html = this.renderFormats();
                break;
            case 'timeline':
                html = this.renderTimeline();
                break;
            case 'audience':
                html = this.renderAudience();
                break;
            case 'proposal':
                html = this.renderProposal();
                break;
        }

        content.innerHTML = html;
        this.initViewAnimations();
        this.initCharts();
    }

    renderOverview() {
        return `
            <section class="hero">
                <div class="hero-bg"></div>
                <div class="container">
                    <div class="hero-content fade-in">
                        <h1 class="hero-title">The Prime Night of Football</h1>
                        <p class="hero-subtitle">Exclusive Partnership Opportunity with Amazon Prime Video</p>
                        
                        <div class="hero-stats">
                            <div class="stat-card scale-in">
                                <div class="stat-icon">📺</div>
                                <div class="stat-value">16</div>
                                <div class="stat-label">Premium Games</div>
                            </div>
                            <div class="stat-card scale-in">
                                <div class="stat-icon">👥</div>
                                <div class="stat-value">45M+</div>
                                <div class="stat-label">Unique Reach</div>
                            </div>
                            <div class="stat-card scale-in">
                                <div class="stat-icon">🎯</div>
                                <div class="stat-value">5</div>
                                <div class="stat-label">Premium Formats</div>
                            </div>
                            <div class="stat-card scale-in">
                                <div class="stat-icon">📈</div>
                                <div class="stat-value">98%</div>
                                <div class="stat-label">Viewability</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <div class="section-header fade-in">
                        <h2 class="section-title">Why TNF on Prime Video?</h2>
                        <p class="section-subtitle">The most premium streaming sports property</p>
                    </div>

                    <div class="creative-showcase">
                        <div class="creative-card fade-in">
                            <div class="creative-preview">
                                <div class="creative-preview-content">
                                    <div style="font-size: 60px; margin-bottom: 20px;">🏆</div>
                                    <h3 style="font-size: 24px; font-weight: 600;">Exclusive Rights</h3>
                                </div>
                            </div>
                            <div class="creative-info">
                                <h3 class="creative-title">Premium Exclusivity</h3>
                                <p class="creative-description">The only place to watch Thursday Night Football, driving must-see appointment viewing.</p>
                                <div class="creative-metrics">
                                    <div class="metric">
                                        <div class="metric-value">100%</div>
                                        <div class="metric-label">Exclusive</div>
                                    </div>
                                    <div class="metric">
                                        <div class="metric-value">16</div>
                                        <div class="metric-label">Games</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="creative-card fade-in">
                            <div class="creative-preview" style="background: linear-gradient(135deg, #146EB4 0%, #FF6900 100%);">
                                <div class="creative-preview-content">
                                    <div style="font-size: 60px; margin-bottom: 20px;">📱</div>
                                    <h3 style="font-size: 24px; font-weight: 600;">Multi-Platform</h3>
                                </div>
                            </div>
                            <div class="creative-info">
                                <h3 class="creative-title">Everywhere Fans Are</h3>
                                <p class="creative-description">Seamless experience across mobile, desktop, tablet, and connected TV devices.</p>
                                <div class="creative-metrics">
                                    <div class="metric">
                                        <div class="metric-value">4+</div>
                                        <div class="metric-label">Platforms</div>
                                    </div>
                                    <div class="metric">
                                        <div class="metric-value">HD/4K</div>
                                        <div class="metric-label">Quality</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="creative-card fade-in">
                            <div class="creative-preview" style="background: linear-gradient(135deg, #7C3AED 0%, #EC4899 100%);">
                                <div class="creative-preview-content">
                                    <div style="font-size: 60px; margin-bottom: 20px;">🎮</div>
                                    <h3 style="font-size: 24px; font-weight: 600;">Interactive</h3>
                                </div>
                            </div>
                            <div class="creative-info">
                                <h3 class="creative-title">Next-Gen Experience</h3>
                                <p class="creative-description">Live stats, alternate camera angles, and interactive features enhance viewing.</p>
                                <div class="creative-metrics">
                                    <div class="metric">
                                        <div class="metric-value">Live</div>
                                        <div class="metric-label">Stats</div>
                                    </div>
                                    <div class="metric">
                                        <div class="metric-value">X-Ray</div>
                                        <div class="metric-label">Features</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section" style="background: rgba(255, 255, 255, 0.02);">
                <div class="container">
                    <div class="section-header fade-in">
                        <h2 class="section-title">Campaign Intelligence</h2>
                        <p class="section-subtitle">Data-driven insights for maximum impact</p>
                    </div>

                    <div class="chart-container fade-in">
                        <div class="chart-header">
                            <h3 class="chart-title">Weekly Viewership Patterns</h3>
                            <div class="chart-legend">
                                <div class="legend-item">
                                    <div class="legend-color" style="background: var(--color-primary);"></div>
                                    <span>Live Viewers</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-color" style="background: var(--color-secondary);"></div>
                                    <span>VOD Views</span>
                                </div>
                            </div>
                        </div>
                        <canvas id="viewershipChart" width="400" height="200"></canvas>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; margin-top: 30px;">
                        <div class="chart-container fade-in">
                            <div class="chart-header">
                                <h3 class="chart-title">Audience Composition</h3>
                            </div>
                            <canvas id="audienceChart" width="200" height="200"></canvas>
                        </div>

                        <div class="chart-container fade-in">
                            <div class="chart-header">
                                <h3 class="chart-title">Platform Distribution</h3>
                            </div>
                            <canvas id="platformChart" width="200" height="200"></canvas>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderCreative() {
        return `
            <section class="hero" style="padding-top: 140px; padding-bottom: 40px;">
                <div class="container">
                    <div class="hero-content fade-in">
                        <h1 class="hero-title" style="font-size: 48px;">Creative Excellence</h1>
                        <p class="hero-subtitle">Dynamic creative strategy that evolves throughout the week</p>
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <div class="timeline">
                        <div class="timeline-line"></div>
                        ${this.data.creative.phases.map((phase, index) => `
                            <div class="timeline-item fade-in">
                                <div class="timeline-dot"></div>
                                <div class="timeline-content">
                                    <div class="timeline-date">${phase.timing}</div>
                                    <h3 class="timeline-title">${phase.name}</h3>
                                    <p class="timeline-description">Creative Variants: ${phase.variants.join(', ')}</p>
                                    <div style="margin-top: 15px;">
                                        <span style="background: var(--gradient-primary); padding: 8px 20px; border-radius: 20px; font-weight: 500; color: var(--color-dark);">
                                            ${phase.cta}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>

            <section class="section" style="background: rgba(255, 255, 255, 0.02);">
                <div class="container">
                    <div class="section-header fade-in">
                        <h2 class="section-title">Live Integration Demo</h2>
                        <p class="section-subtitle">Real-time creative adaptation during games</p>
                    </div>

                    <div class="demo-container fade-in">
                        <div class="demo-device">
                            <div class="device-frame">
                                <div class="device-screen" id="creativeDemo">
                                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; width: 100%; padding: 20px;">
                                        <h3 style="font-size: 24px; margin-bottom: 20px;">Live Now on Prime Video</h3>
                                        <div style="font-size: 18px; margin-bottom: 10px;">Bills vs Dolphins</div>
                                        <div style="font-size: 36px; font-weight: 700; margin-bottom: 20px;">
                                            <span style="color: var(--color-primary);">14</span> - <span style="color: var(--color-secondary);">10</span>
                                        </div>
                                        <div style="font-size: 14px; color: rgba(255, 255, 255, 0.7); margin-bottom: 30px;">3rd Quarter • 8:42</div>
                                        <button style="background: var(--color-primary); color: white; border: none; padding: 15px 40px; border-radius: 30px; font-size: 18px; font-weight: 600; cursor: pointer;">
                                            Watch Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="demo-controls">
                            <button class="demo-button active" onclick="tnfDashboard.showCreativePhase('pre')">Pre-Game</button>
                            <button class="demo-button" onclick="tnfDashboard.showCreativePhase('live')">Live Game</button>
                            <button class="demo-button" onclick="tnfDashboard.showCreativePhase('post')">Post-Game</button>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderFormats() {
        return `
            <section class="hero" style="padding-top: 140px; padding-bottom: 40px;">
                <div class="container">
                    <div class="hero-content fade-in">
                        <h1 class="hero-title" style="font-size: 48px;">Premium Ad Formats</h1>
                        <p class="hero-subtitle">Industry-leading formats designed for maximum impact</p>
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <div class="format-gallery">
                        ${this.data.formats.map((format, index) => `
                            <div class="format-card fade-in" data-format="${index}">
                                <div class="format-icon">${this.getFormatIcon(format.name)}</div>
                                <h3 class="format-name">${format.name}</h3>
                                <p class="format-description">${format.description}</p>
                                <div class="format-specs">
                                    ${Object.entries(format.specs).map(([key, value]) => `
                                        <div class="spec">
                                            <span style="text-transform: capitalize;">${key}:</span>
                                            <strong>${value}</strong>
                                        </div>
                                    `).join('')}
                                </div>
                                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                                    <h4 style="font-size: 14px; margin-bottom: 10px; color: var(--color-accent);">Key Features</h4>
                                    <ul style="list-style: none; space-y: 5px;">
                                        ${format.features.map(feature => `
                                            <li style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
                                                <span style="color: var(--color-success);">✓</span>
                                                <span style="font-size: 14px; color: rgba(255, 255, 255, 0.8);">${feature}</span>
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>

            <section class="section" style="background: rgba(255, 255, 255, 0.02);">
                <div class="container">
                    <div class="section-header fade-in">
                        <h2 class="section-title">Format Performance</h2>
                        <p class="section-subtitle">Proven results across our premium inventory</p>
                    </div>

                    <div class="chart-container fade-in">
                        <canvas id="formatPerformanceChart" width="400" height="300"></canvas>
                    </div>
                </div>
            </section>
        `;
    }

    renderTimeline() {
        return `
            <section class="hero" style="padding-top: 140px; padding-bottom: 40px;">
                <div class="container">
                    <div class="hero-content fade-in">
                        <h1 class="hero-title" style="font-size: 48px;">16-Week Campaign Journey</h1>
                        <p class="hero-subtitle">Strategic game selection for maximum impact</p>
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
                        ${this.data.weeks.map((week, index) => `
                            <div class="format-card fade-in" style="${week.special ? 'border: 2px solid var(--color-primary);' : ''} ${week.priority === 'critical' ? 'background: rgba(255, 105, 0, 0.1);' : ''}">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                                    <span style="font-size: 14px; color: var(--color-accent);">Week ${week.week}</span>
                                    ${week.special ? '<span style="background: var(--color-primary); color: var(--color-dark); padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">SPECIAL</span>' : ''}
                                </div>
                                <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 10px;">${week.teams}</h3>
                                <p style="color: rgba(255, 255, 255, 0.7); font-size: 14px; margin-bottom: 5px;">${week.date}</p>
                                <p style="color: var(--color-secondary); font-size: 14px; font-weight: 500;">${week.theme}</p>
                                ${week.priority === 'critical' ? '<div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.1);"><span style="color: var(--color-primary); font-size: 12px; font-weight: 600;">🔥 PREMIUM OPPORTUNITY</span></div>' : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>

            <section class="section" style="background: rgba(255, 255, 255, 0.02);">
                <div class="container">
                    <div class="section-header fade-in">
                        <h2 class="section-title">Special Event Games</h2>
                        <p class="section-subtitle">Tentpole moments for maximum brand impact</p>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
                        ${this.data.weeks.filter(w => w.special).map(week => `
                            <div class="creative-card fade-in">
                                <div class="creative-preview" style="background: var(--gradient-primary);">
                                    <div class="creative-preview-content">
                                        <div style="font-size: 48px; margin-bottom: 20px;">${week.theme === 'Season Kickoff' ? '🚀' : week.theme === 'Black Friday Special' ? '🛍️' : '🎄'}</div>
                                        <h3 style="font-size: 20px; font-weight: 600;">${week.theme}</h3>
                                    </div>
                                </div>
                                <div class="creative-info">
                                    <h3 class="creative-title">${week.teams}</h3>
                                    <p class="creative-description">${week.date} • Week ${week.week}</p>
                                    <div class="creative-metrics">
                                        <div class="metric">
                                            <div class="metric-value">2.5x</div>
                                            <div class="metric-label">Viewership</div>
                                        </div>
                                        <div class="metric">
                                            <div class="metric-value">Premium</div>
                                            <div class="metric-label">Placement</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    renderAudience() {
        return `
            <section class="hero" style="padding-top: 140px; padding-bottom: 40px;">
                <div class="container">
                    <div class="hero-content fade-in">
                        <h1 class="hero-title" style="font-size: 48px;">Precision Targeting</h1>
                        <p class="hero-subtitle">Reach the right fans at the right moment</p>
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <div class="section-header fade-in">
                        <h2 class="section-title">Primary Audiences</h2>
                        <p class="section-subtitle">High-value viewer segments</p>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 60px;">
                        ${this.data.audiences.primary.map((audience, index) => `
                            <div class="stat-card fade-in" style="text-align: left;">
                                <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 10px; color: var(--color-primary);">${audience.name}</h3>
                                <p style="color: rgba(255, 255, 255, 0.7); margin-bottom: 20px;">${audience.description}</p>
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div class="stat-value" style="font-size: 28px;">${audience.size}</div>
                                        <div class="stat-label">Audience Size</div>
                                    </div>
                                    <div style="text-align: right;">
                                        <div style="font-size: 24px; font-weight: 600; color: var(--color-accent);">${audience.index}</div>
                                        <div class="stat-label">Index</div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="section-header fade-in">
                        <h2 class="section-title">Extended Reach</h2>
                        <p class="section-subtitle">Growth opportunity segments</p>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
                        ${this.data.audiences.secondary.map((audience, index) => `
                            <div class="format-card fade-in">
                                <h3 class="format-name" style="font-size: 20px;">${audience.name}</h3>
                                <p class="format-description">${audience.description}</p>
                                <div class="format-specs">
                                    <div class="spec">
                                        <span>Size:</span>
                                        <strong>${audience.size}</strong>
                                    </div>
                                    <div class="spec">
                                        <span>Index:</span>
                                        <strong>${audience.index}</strong>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>

            <section class="section" style="background: rgba(255, 255, 255, 0.02);">
                <div class="container">
                    <div class="section-header fade-in">
                        <h2 class="section-title">Audience Insights</h2>
                        <p class="section-subtitle">Behavioral patterns and preferences</p>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px;">
                        <div class="chart-container fade-in">
                            <div class="chart-header">
                                <h3 class="chart-title">Viewing Behavior</h3>
                            </div>
                            <canvas id="behaviorChart" width="200" height="200"></canvas>
                        </div>

                        <div class="chart-container fade-in">
                            <div class="chart-header">
                                <h3 class="chart-title">Device Preference</h3>
                            </div>
                            <canvas id="deviceChart" width="200" height="200"></canvas>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderProposal() {
        return `
            <section class="hero" style="padding-top: 140px; padding-bottom: 40px;">
                <div class="container">
                    <div class="hero-content fade-in">
                        <h1 class="hero-title" style="font-size: 48px;">Investment Options</h1>
                        <p class="hero-subtitle">Flexible tiers designed for your objectives</p>
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px;">
                        ${this.data.investment.tiers.map((tier, index) => `
                            <div class="creative-card fade-in" style="${tier.color === 'gold' ? 'border: 2px solid var(--color-accent); transform: scale(1.05);' : ''}">
                                <div class="creative-preview" style="background: ${tier.color === 'bronze' ? 'linear-gradient(135deg, #CD7F32 0%, #B87333 100%)' : tier.color === 'silver' ? 'linear-gradient(135deg, #C0C0C0 0%, #B8B8B8 100%)' : 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'};">
                                    <div class="creative-preview-content">
                                        <h3 style="font-size: 28px; font-weight: 700;">${tier.name}</h3>
                                        <div style="font-size: 36px; margin-top: 10px;">${tier.amount}</div>
                                    </div>
                                </div>
                                <div class="creative-info">
                                    <h3 class="creative-title">Package Includes:</h3>
                                    <ul style="list-style: none; margin-top: 20px;">
                                        ${tier.features.map(feature => `
                                            <li style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                                                <span style="color: var(--color-success); font-size: 20px;">✓</span>
                                                <span style="color: rgba(255, 255, 255, 0.9);">${feature}</span>
                                            </li>
                                        `).join('')}
                                    </ul>
                                    ${tier.color === 'gold' ? '<div style="margin-top: 20px; padding: 15px; background: rgba(255, 215, 0, 0.2); border-radius: 10px; text-align: center;"><span style="color: var(--color-accent); font-weight: 600;">RECOMMENDED</span></div>' : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>

            <section class="cta-section">
                <div class="container">
                    <div class="cta-content">
                        <h2 class="cta-title">Ready to Score Big?</h2>
                        <p class="cta-description">Partner with Kargo for the 2025 TNF season on Amazon Prime Video</p>
                        <a href="#" class="cta-button" onclick="tnfDashboard.showContactModal(); return false;">Start the Conversation</a>
                    </div>
                </div>
            </section>
        `;
    }

    getFormatIcon(formatName) {
        const icons = {
            'Venti Video': '🎬',
            'Runway': '🚀',
            'Hover': '👆',
            'Outstream': '📱',
            'Connected TV': '📺'
        };
        return icons[formatName] || '📊';
    }

    bindEvents() {
        // Navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const view = tab.dataset.view;
                this.switchView(view);
            });
        });

        // Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        // Observe all animatable elements
        setTimeout(() => {
            document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
                observer.observe(el);
            });
        }, 100);
    }

    switchView(view) {
        this.currentView = view;
        
        // Update navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.view === view) {
                tab.classList.add('active');
            }
        });

        // Render new view
        this.renderView(view);
    }

    initAnimations() {
        if (!this.animationEnabled) return;

        // GSAP animations
        if (typeof gsap !== 'undefined') {
            gsap.from('.hero-title', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' });
            gsap.from('.hero-subtitle', { duration: 1, y: 30, opacity: 0, delay: 0.2, ease: 'power3.out' });
            gsap.from('.stat-card', { duration: 0.8, y: 50, opacity: 0, stagger: 0.1, delay: 0.4, ease: 'power3.out' });
        }
    }

    initViewAnimations() {
        // Re-initialize animations for new content
        setTimeout(() => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
                observer.observe(el);
            });
        }, 100);
    }

    initCharts() {
        // Initialize Chart.js charts based on current view
        if (this.currentView === 'overview') {
            this.createViewershipChart();
            this.createAudienceChart();
            this.createPlatformChart();
        } else if (this.currentView === 'formats') {
            this.createFormatPerformanceChart();
        } else if (this.currentView === 'audience') {
            this.createBehaviorChart();
            this.createDeviceChart();
        }
    }

    createViewershipChart() {
        const ctx = document.getElementById('viewershipChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
                datasets: [{
                    label: 'Live Viewers (M)',
                    data: [12.5, 13.2, 14.1, 15.8, 16.2, 14.9, 15.5, 16.8],
                    borderColor: '#FF6900',
                    backgroundColor: 'rgba(255, 105, 0, 0.1)',
                    tension: 0.4
                }, {
                    label: 'VOD Views (M)',
                    data: [3.2, 3.5, 3.8, 4.2, 4.5, 4.1, 4.3, 4.7],
                    borderColor: '#146EB4',
                    backgroundColor: 'rgba(20, 110, 180, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                }
            }
        });
    }

    createAudienceChart() {
        const ctx = document.getElementById('audienceChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Avid Fans', 'Enthusiasts', 'Regular Viewers', 'Casual Viewers'],
                datasets: [{
                    data: [15, 25, 35, 25],
                    backgroundColor: [
                        '#FF6900',
                        '#146EB4',
                        '#7C3AED',
                        '#EC4899'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            padding: 20
                        }
                    }
                }
            }
        });
    }

    createPlatformChart() {
        const ctx = document.getElementById('platformChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mobile', 'CTV', 'Desktop', 'Tablet'],
                datasets: [{
                    label: 'Platform Usage %',
                    data: [35, 30, 25, 10],
                    backgroundColor: [
                        'rgba(255, 105, 0, 0.8)',
                        'rgba(20, 110, 180, 0.8)',
                        'rgba(124, 58, 237, 0.8)',
                        'rgba(236, 72, 153, 0.8)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                }
            }
        });
    }

    createFormatPerformanceChart() {
        const ctx = document.getElementById('formatPerformanceChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Viewability', 'Engagement', 'Completion', 'Brand Lift', 'Recall'],
                datasets: [{
                    label: 'Venti Video',
                    data: [95, 85, 78, 82, 88],
                    borderColor: '#FF6900',
                    backgroundColor: 'rgba(255, 105, 0, 0.2)'
                }, {
                    label: 'Connected TV',
                    data: [98, 80, 85, 90, 92],
                    borderColor: '#146EB4',
                    backgroundColor: 'rgba(20, 110, 180, 0.2)'
                }, {
                    label: 'Runway',
                    data: [92, 75, 70, 78, 80],
                    borderColor: '#7C3AED',
                    backgroundColor: 'rgba(124, 58, 237, 0.2)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.5)',
                            backdropColor: 'transparent'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            padding: 20
                        }
                    }
                }
            }
        });
    }

    createBehaviorChart() {
        const ctx = document.getElementById('behaviorChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: ['Live Viewing', 'VOD', 'Highlights', 'Stats Check', 'Social Share'],
                datasets: [{
                    data: [65, 20, 8, 5, 2],
                    backgroundColor: [
                        'rgba(255, 105, 0, 0.8)',
                        'rgba(20, 110, 180, 0.8)',
                        'rgba(124, 58, 237, 0.8)',
                        'rgba(236, 72, 153, 0.8)',
                        'rgba(16, 185, 129, 0.8)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        },
                        ticks: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    createDeviceChart() {
        const ctx = document.getElementById('deviceChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Smart TV', 'Mobile', 'Desktop', 'Tablet', 'Gaming Console'],
                datasets: [{
                    data: [42, 28, 18, 8, 4],
                    backgroundColor: [
                        '#FF6900',
                        '#146EB4',
                        '#7C3AED',
                        '#EC4899',
                        '#10B981'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            padding: 15
                        }
                    }
                }
            }
        });
    }

    showCreativePhase(phase) {
        const demo = document.getElementById('creativeDemo');
        if (!demo) return;

        const content = {
            pre: `
                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, #0F1111 0%, #232F3E 100%); display: flex; align-items: center; justify-content: center;">
                    <div style="text-align: center; padding: 20px;">
                        <div style="font-size: 14px; color: var(--color-accent); margin-bottom: 20px;">TOMORROW ON PRIME VIDEO</div>
                        <h3 style="font-size: 28px; margin-bottom: 20px;">Bills vs Dolphins</h3>
                        <div style="display: flex; justify-content: center; gap: 40px; margin-bottom: 30px;">
                            <div>
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 24 24' fill='%23FF6900'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E" alt="Team Logo" style="width: 60px; height: 60px;">
                                <div style="margin-top: 10px; font-weight: 600;">Bills</div>
                            </div>
                            <div style="font-size: 24px; line-height: 60px;">VS</div>
                            <div>
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 24 24' fill='%23146EB4'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E" alt="Team Logo" style="width: 60px; height: 60px;">
                                <div style="margin-top: 10px; font-weight: 600;">Dolphins</div>
                            </div>
                        </div>
                        <button style="background: var(--color-primary); color: white; border: none; padding: 15px 40px; border-radius: 30px; font-size: 18px; font-weight: 600; cursor: pointer;">
                            Set Reminder
                        </button>
                    </div>
                </div>
            `,
            live: `
                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: #000; display: flex; flex-direction: column;">
                    <div style="background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%); padding: 20px; position: relative; z-index: 10;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <div style="width: 12px; height: 12px; background: #FF0000; border-radius: 50%; animation: pulse 2s infinite;"></div>
                                <span style="font-size: 14px; font-weight: 600;">LIVE</span>
                            </div>
                            <div style="font-size: 14px;">Q3 8:42</div>
                        </div>
                    </div>
                    <div style="flex: 1; position: relative; background: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"%3E%3Crect fill="%23006400" width="1200" height="800"/%3E%3Cline x1="100" y1="100" x2="100" y2="700" stroke="white" stroke-width="4"/%3E%3Cline x1="1100" y1="100" x2="1100" y2="700" stroke="white" stroke-width="4"/%3E%3C/svg%3E') center/cover;">
                        <div style="position: absolute; bottom: 20px; left: 20px; right: 20px; background: rgba(0,0,0,0.8); padding: 15px; border-radius: 10px;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div style="display: flex; gap: 30px;">
                                    <div>
                                        <div style="font-size: 12px; color: rgba(255, 255, 255, 0.7);">BILLS</div>
                                        <div style="font-size: 24px; font-weight: 700;">21</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 12px; color: rgba(255, 255, 255, 0.7);">DOLPHINS</div>
                                        <div style="font-size: 24px; font-weight: 700;">17</div>
                                    </div>
                                </div>
                                <button style="background: var(--color-primary); color: white; border: none; padding: 10px 25px; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer;">
                                    Watch Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            post: `
                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, #0F1111 0%, #232F3E 100%); display: flex; align-items: center; justify-content: center;">
                    <div style="text-align: center; padding: 20px;">
                        <div style="font-size: 14px; color: var(--color-accent); margin-bottom: 20px;">FINAL SCORE</div>
                        <h3 style="font-size: 24px; margin-bottom: 20px;">Bills Win!</h3>
                        <div style="font-size: 48px; font-weight: 700; margin-bottom: 20px;">
                            <span style="color: var(--color-primary);">24</span>
                            <span style="margin: 0 20px;">-</span>
                            <span>17</span>
                        </div>
                        <div style="margin-bottom: 30px;">
                            <div style="font-size: 14px; color: rgba(255, 255, 255, 0.7); margin-bottom: 10px;">Game Highlights</div>
                            <div style="display: flex; gap: 10px; justify-content: center;">
                                <div style="width: 80px; height: 60px; background: rgba(255, 255, 255, 0.1); border-radius: 8px;"></div>
                                <div style="width: 80px; height: 60px; background: rgba(255, 255, 255, 0.1); border-radius: 8px;"></div>
                                <div style="width: 80px; height: 60px; background: rgba(255, 255, 255, 0.1); border-radius: 8px;"></div>
                            </div>
                        </div>
                        <button style="background: var(--color-primary); color: white; border: none; padding: 15px 40px; border-radius: 30px; font-size: 18px; font-weight: 600; cursor: pointer;">
                            Watch Replay
                        </button>
                    </div>
                </div>
            `
        };

        demo.innerHTML = content[phase];

        // Update button states
        document.querySelectorAll('.demo-button').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.toLowerCase().includes(phase)) {
                btn.classList.add('active');
            }
        });
    }

    showContactModal() {
        alert('Contact modal would open here with a form to connect with the Kargo sales team.');
    }

    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 1500);
    }
}

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.tnfDashboard = new TNFDashboard();
});