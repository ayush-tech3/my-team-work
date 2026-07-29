/**
 * StockCraft AI Engine - Core Simulation & AI Engine
 * Provides market database, paper trading portfolio engine, AI stock analysis,
 * subscription purchase manager, and shared UI components.
 */

window.StockCraft = (function () {
    const STORAGE_KEY = 'stockcraft_state_v1';

    // Initial Stock Market Data for Beginners
    const INITIAL_STOCKS = [
        {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            sector: 'Technology',
            price: 224.50,
            change: +1.85,
            changePercent: '+0.83%',
            high: 226.10,
            low: 222.40,
            pe: 33.4,
            marketCap: '$3.42T',
            riskLevel: 'Low (Beginner Safe)',
            riskScore: 2,
            dividend: '0.5%',
            aiSignal: 'STRONG BUY',
            aiScore: 94,
            aiSummary: 'Top choice for long-term growth and stable dividend returns. Dominates consumer ecosystem with strong AI hardware expansion.',
            aiPros: ['Huge cash reserves', 'Unmatched brand loyalty', 'Growing services revenue'],
            aiCons: ['High P/E valuation', 'Slow hardware growth in some markets'],
            beginnerTip: 'Great first stock for beginners! Apple is a blue-chip company known for steady growth and low risk.',
            chartData: [210, 212, 209, 215, 218, 220, 219, 222, 221, 224.50]
        },
        {
            symbol: 'NVDA',
            name: 'NVIDIA Corporation',
            sector: 'Semiconductors & AI',
            price: 122.80,
            change: +4.20,
            changePercent: '+3.54%',
            high: 124.50,
            low: 118.90,
            pe: 68.2,
            marketCap: '$3.02T',
            riskLevel: 'Moderate (High Growth)',
            riskScore: 6,
            dividend: '0.04%',
            aiSignal: 'BUY',
            aiScore: 91,
            aiSummary: 'Leading the global AI infrastructure boom. High price volatility makes it exciting but requires risk awareness for newcomers.',
            aiPros: ['Monopoly in AI chips (H100/Blackwell)', 'Explosive earnings growth'],
            aiCons: ['Volatile price swings', 'High valuation metric'],
            beginnerTip: 'High growth potential! Consider buying small amounts over time (Dollar Cost Averaging) to manage volatility.',
            chartData: [95, 102, 98, 105, 112, 110, 115, 119, 117, 122.80]
        },
        {
            symbol: 'MSFT',
            name: 'Microsoft Corp',
            sector: 'Software & Cloud',
            price: 448.20,
            change: -0.65,
            changePercent: '-0.14%',
            high: 451.00,
            low: 446.10,
            pe: 35.8,
            marketCap: '$3.33T',
            riskLevel: 'Low (Beginner Safe)',
            riskScore: 2,
            dividend: '0.7%',
            aiSignal: 'STRONG BUY',
            aiScore: 96,
            aiSummary: 'Azure cloud growth combined with OpenAI integration makes Microsoft a premier foundation stock for any portfolio.',
            aiPros: ['Enterprise cloud dominance', 'Generative AI commercialization leadership', 'Consistent quarterly dividends'],
            aiCons: ['Regulatory scrutiny on AI deals'],
            beginnerTip: 'Very safe anchor stock. Microsoft generates steady profits year after year.',
            chartData: [420, 425, 430, 428, 435, 440, 442, 445, 447, 448.20]
        },
        {
            symbol: 'TSLA',
            name: 'Tesla, Inc.',
            sector: 'Automotive & Clean Energy',
            price: 246.30,
            change: -5.10,
            changePercent: '-2.03%',
            high: 254.00,
            low: 243.50,
            pe: 62.1,
            marketCap: '$785B',
            riskLevel: 'High (Speculative)',
            riskScore: 8,
            dividend: '0.0%',
            aiSignal: 'NEUTRAL / HOLD',
            aiScore: 68,
            aiSummary: 'EV margin pressures balanced by Full Self-Driving & Optimus Robot long-term optionality. High swing asset.',
            aiPros: ['Autonomous AI leadership', 'Energy storage growth'],
            aiCons: ['Short-term EV price competition', 'High sentiment sensitivity'],
            beginnerTip: 'Warning for beginners: Tesla experiences large price swings. Only allocate a small percentage of your cash here.',
            chartData: [210, 225, 195, 230, 215, 240, 260, 252, 255, 246.30]
        },
        {
            symbol: 'AMZN',
            name: 'Amazon.com Inc.',
            sector: 'E-Commerce & Cloud',
            price: 186.40,
            change: +2.15,
            changePercent: '+1.17%',
            high: 188.00,
            low: 184.20,
            pe: 42.5,
            marketCap: '$1.94T',
            riskLevel: 'Low-Moderate',
            riskScore: 3,
            dividend: '0.0%',
            aiSignal: 'BUY',
            aiScore: 89,
            aiSummary: 'AWS cloud re-acceleration paired with AI logistics efficiency yields expanding profit margins.',
            aiPros: ['Cloud computing market leader', 'Retail advertising growth'],
            aiCons: ['Heavy capital expenditure in AI data centers'],
            beginnerTip: 'Great combination of e-commerce stability and high-tech cloud expansion.',
            chartData: [170, 173, 175, 172, 178, 181, 180, 183, 185, 186.40]
        },
        {
            symbol: 'RELIANCE',
            name: 'Reliance Industries Ltd',
            sector: 'Conglomerate & Energy',
            price: 2980.00,
            change: +18.50,
            changePercent: '+0.62%',
            high: 3010.00,
            low: 2965.00,
            pe: 28.5,
            marketCap: '₹20.15 Lakh Cr',
            riskLevel: 'Low (Beginner Safe)',
            riskScore: 2,
            dividend: '0.4%',
            aiSignal: 'STRONG BUY',
            aiScore: 93,
            aiSummary: 'India\'s largest market cap company with booming Telecom (Jio) and Retail sectors expanding alongside traditional energy.',
            aiPros: ['Dominant market presence in India', 'Massive digital subscriber base'],
            aiCons: ['Oil-to-chemical margins subject to global crude prices'],
            beginnerTip: 'Ideal starting stock for Indian market investors looking for blue-chip security.',
            chartData: [2800, 2820, 2850, 2890, 2910, 2940, 2930, 2960, 2975, 2980.00]
        },
        {
            symbol: 'TATAMOTORS',
            name: 'Tata Motors Ltd',
            sector: 'Automotive (EV Leader)',
            price: 1012.00,
            change: +14.20,
            changePercent: '+1.42%',
            high: 1025.00,
            low: 998.00,
            pe: 18.2,
            marketCap: '₹3.72 Lakh Cr',
            riskLevel: 'Moderate',
            riskScore: 4,
            dividend: '0.6%',
            aiSignal: 'BUY',
            aiScore: 88,
            aiSummary: 'Leading electric vehicle revolution in India alongside Jaguar Land Rover (JLR) luxury turnaround.',
            aiPros: ['EV market market share > 70% in India', 'Strong JLR cash flows'],
            aiCons: ['Global automotive demand fluctuations'],
            beginnerTip: 'Great growth pick for EV adoption trends in emerging markets.',
            chartData: [880, 910, 930, 920, 950, 975, 990, 985, 1000, 1012.00]
        },
        {
            symbol: 'SPY',
            name: 'SPDR S&P 500 ETF Trust',
            sector: 'Index ETF (Diversified)',
            price: 552.10,
            change: +2.80,
            changePercent: '+0.51%',
            high: 553.50,
            low: 549.80,
            pe: 26.1,
            marketCap: '$560B',
            riskLevel: 'Ultra Low (Safest for Beginners)',
            riskScore: 1,
            dividend: '1.2%',
            aiSignal: 'STRONG BUY (RECOMMENDED)',
            aiScore: 98,
            aiSummary: 'Holds the top 500 largest US companies in one single fund. Historically averages ~10% annual return over time.',
            aiPros: ['Instant diversification across 500 top companies', 'Lowest overall risk profile', 'Ideal for set-and-forget investing'],
            aiCons: ['Will not give 1000% explosive gains overnight'],
            beginnerTip: '🌟 THE #1 RECOMMENDED FIRST PURCHASE FOR ALL BEGINNERS! When in doubt, start with an S&P 500 ETF.',
            chartData: [520, 525, 528, 532, 538, 542, 545, 548, 550, 552.10]
        }
    ];

    // Default State
    function getDefaultState() {
        return {
            currency: '$', // '$' or '₹'
            cash: 25000.00,
            portfolio: [
                { symbol: 'SPY', shares: 10, avgPrice: 535.00 },
                { symbol: 'AAPL', shares: 15, avgPrice: 215.00 }
            ],
            transactions: [
                {
                    id: 'TXN-9021',
                    symbol: 'SPY',
                    type: 'BUY',
                    shares: 10,
                    price: 535.00,
                    total: 5350.00,
                    timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
                    status: 'EXECUTED'
                },
                {
                    id: 'TXN-9022',
                    symbol: 'AAPL',
                    type: 'BUY',
                    shares: 15,
                    price: 215.00,
                    total: 3225.00,
                    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
                    status: 'EXECUTED'
                }
            ],
            plan: 'Free Learner', // 'Free Learner', 'Pro Trader AI', 'Institutional AI'
            badges: ['First Step Investor', 'Diversifier'],
            aiHistory: [
                { sender: 'ai', text: '👋 Hello! I am **StockBuddy AI**, your stock market mentor. Ask me anything! E.g., *"What is a stock?"*, *"Which stock should a beginner buy first?"*, or *"Explain P/E Ratio simply"*.' }
            ]
        };
    }

    // Load State
    function loadState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                return JSON.parse(raw);
            }
        } catch (e) {
            console.error('Failed to load state', e);
        }
        const initial = getDefaultState();
        saveState(initial);
        return initial;
    }

    // Save State
    function saveState(state) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.error('Failed to save state', e);
        }
    }

    // API Methods
    return {
        getStocks: function () {
            return INITIAL_STOCKS;
        },

        getStock: function (symbol) {
            return INITIAL_STOCKS.find(s => s.symbol.toUpperCase() === symbol.toUpperCase()) || INITIAL_STOCKS[0];
        },

        getState: function () {
            return loadState();
        },

        toggleCurrency: function () {
            const state = loadState();
            state.currency = state.currency === '$' ? '₹' : '$';
            saveState(state);
            return state.currency;
        },

        // Buy Stock Order Simulator
        buyStock: function (symbol, shares) {
            shares = parseInt(shares);
            if (isNaN(shares) || shares <= 0) {
                return { success: false, message: 'Please enter a valid number of shares.' };
            }

            const stock = this.getStock(symbol);
            const totalCost = stock.price * shares;
            const state = loadState();

            if (state.cash < totalCost) {
                return {
                    success: false,
                    message: `Insufficient Funds! Total cost is ${state.currency}${totalCost.toFixed(2)}, but you only have ${state.currency}${state.cash.toFixed(2)} in virtual cash.`
                };
            }

            // Execute Trade
            state.cash -= totalCost;

            const existingIndex = state.portfolio.findIndex(p => p.symbol === stock.symbol);
            if (existingIndex >= 0) {
                const existing = state.portfolio[existingIndex];
                const totalShares = existing.shares + shares;
                const newAvgPrice = ((existing.shares * existing.avgPrice) + totalCost) / totalShares;
                state.portfolio[existingIndex].shares = totalShares;
                state.portfolio[existingIndex].avgPrice = newAvgPrice;
            } else {
                state.portfolio.push({
                    symbol: stock.symbol,
                    shares: shares,
                    avgPrice: stock.price
                });
            }

            const txnId = 'TXN-' + Math.floor(100000 + Math.random() * 900000);
            const txn = {
                id: txnId,
                symbol: stock.symbol,
                name: stock.name,
                type: 'BUY',
                shares: shares,
                price: stock.price,
                total: totalCost,
                timestamp: new Date().toISOString(),
                status: 'EXECUTED'
            };

            state.transactions.unshift(txn);
            saveState(state);

            return {
                success: true,
                message: `Successfully purchased ${shares} shares of ${stock.symbol} (${stock.name}) for ${state.currency}${totalCost.toFixed(2)}!`,
                receipt: txn
            };
        },

        // Sell Stock Order Simulator
        sellStock: function (symbol, shares) {
            shares = parseInt(shares);
            if (isNaN(shares) || shares <= 0) {
                return { success: false, message: 'Please enter a valid number of shares.' };
            }

            const stock = this.getStock(symbol);
            const state = loadState();
            const existingIndex = state.portfolio.findIndex(p => p.symbol === stock.symbol);

            if (existingIndex < 0 || state.portfolio[existingIndex].shares < shares) {
                const avail = existingIndex >= 0 ? state.portfolio[existingIndex].shares : 0;
                return {
                    success: false,
                    message: `You do not own ${shares} shares of ${stock.symbol}. Available: ${avail} shares.`
                };
            }

            const totalPayout = stock.price * shares;
            state.cash += totalPayout;

            state.portfolio[existingIndex].shares -= shares;
            if (state.portfolio[existingIndex].shares === 0) {
                state.portfolio.splice(existingIndex, 1);
            }

            const txnId = 'TXN-' + Math.floor(100000 + Math.random() * 900000);
            const txn = {
                id: txnId,
                symbol: stock.symbol,
                name: stock.name,
                type: 'SELL',
                shares: shares,
                price: stock.price,
                total: totalPayout,
                timestamp: new Date().toISOString(),
                status: 'EXECUTED'
            };

            state.transactions.unshift(txn);
            saveState(state);

            return {
                success: true,
                message: `Successfully sold ${shares} shares of ${stock.symbol} for ${state.currency}${totalPayout.toFixed(2)}!`,
                receipt: txn
            };
        },

        // Plan Purchase Checkout Simulator
        purchasePlan: function (planName, price) {
            const state = loadState();
            state.plan = planName;
            
            const txnId = 'SUB-' + Math.floor(100000 + Math.random() * 900000);
            const txn = {
                id: txnId,
                symbol: 'SUBSCRIPTION',
                name: `Plan Upgrade: ${planName}`,
                type: 'PURCHASE',
                shares: 1,
                price: price,
                total: price,
                timestamp: new Date().toISOString(),
                status: 'ACTIVE'
            };

            state.transactions.unshift(txn);
            if (!state.badges.includes('Pro VIP Member')) {
                state.badges.push('Pro VIP Member');
            }
            saveState(state);

            return {
                success: true,
                message: `🎉 Congratulations! Your plan has been upgraded to ${planName}. All premium features are unlocked!`,
                receipt: txn
            };
        },

        // Portfolio Summary calculation
        getPortfolioSummary: function () {
            const state = loadState();
            let investedValue = 0;
            let currentValue = 0;

            const items = state.portfolio.map(item => {
                const stock = this.getStock(item.symbol);
                const itemInvested = item.shares * item.avgPrice;
                const itemCurrent = item.shares * stock.price;
                const gain = itemCurrent - itemInvested;
                const gainPercent = itemInvested > 0 ? (gain / itemInvested) * 100 : 0;

                investedValue += itemInvested;
                currentValue += itemCurrent;

                return {
                    ...item,
                    name: stock.name,
                    currentPrice: stock.price,
                    itemInvested,
                    itemCurrent,
                    gain,
                    gainPercent,
                    riskLevel: stock.riskLevel
                };
            });

            const totalPortfolioValue = state.cash + currentValue;
            const totalGain = currentValue - investedValue;
            const totalGainPercent = investedValue > 0 ? (totalGain / investedValue) * 100 : 0;

            return {
                currency: state.currency,
                cash: state.cash,
                investedValue,
                currentValue,
                totalPortfolioValue,
                totalGain,
                totalGainPercent,
                items
            };
        },

        // Intelligent AI Response Engine
        askAI: function (userQuery, targetSymbol = null) {
            const state = loadState();
            const query = userQuery.toLowerCase();
            let responseText = "";

            if (targetSymbol) {
                const stock = this.getStock(targetSymbol);
                responseText = `### 🤖 StockBuddy AI Breakdown for **${stock.symbol} (${stock.name})**\n\n` +
                    `- **Current Price**: ${state.currency}${stock.price.toFixed(2)} (${stock.changePercent})\n` +
                    `- **AI Recommendation**: <span class="text-emerald-400 font-bold">${stock.aiSignal}</span> (Score: ${stock.aiScore}/100)\n` +
                    `- **Risk Level**: **${stock.riskLevel}** (Risk Score: ${stock.riskScore}/10)\n\n` +
                    `**Why consider this stock?**\n${stock.aiSummary}\n\n` +
                    `💡 **Beginner Tip**: ${stock.beginnerTip}`;
            } else if (query.includes('what is a stock') || query.includes('how does stock work') || query.includes('beginner')) {
                responseText = `### 📚 What is a Stock? (Beginner Explanation)\n\n` +
                    `Think of a **stock** as a tiny piece of ownership in a company!\n` +
                    `When you buy 1 share of **Apple (AAPL)** or **Microsoft (MSFT)**, you literally become a part-owner of that multi-billion dollar company.\n\n` +
                    `**How do you make money?**\n` +
                    `1. 📈 **Capital Growth**: You buy at $100, price rises to $150, you gain $50 per share!\n` +
                    `2. 💵 **Dividends**: Some companies pay you cash directly every quarter just for holding their shares!\n\n` +
                    `🎯 **Where to start?** Try buying **SPY (S&P 500 ETF)** in our paper trading simulator!`;
            } else if (query.includes('how to buy') || query.includes('purchase') || query.includes('order')) {
                responseText = `### 🛒 How to Purchase Your First Stock (Step-by-Step)\n\n` +
                    `1. **Go to the Live Trading Dashboard**.\n` +
                    `2. Select a beginner-friendly stock like **SPY** or **AAPL**.\n` +
                    `3. Enter the quantity of shares (e.g. 5 shares).\n` +
                    `4. Click **Execute Buy Order**.\n\n` +
                    `✨ In our simulator, you start with **${state.currency}25,000 in Virtual Cash**, so you can practice risk-free!`;
            } else if (query.includes('p/e') || query.includes('pe ratio') || query.includes('valuation')) {
                responseText = `### 📊 What is P/E Ratio (Price-to-Earnings)?\n\n` +
                    `The **P/E Ratio** tells you how expensive a stock is relative to its actual profits.\n` +
                    `- **Formula**: Stock Price ÷ Earnings Per Share.\n` +
                    `- **Example**: If P/E is 20, it means investors pay $20 for every $1 of real profit.\n` +
                    `- **General Rule for Beginners**: P/E under 25 is often considered good value, while P/E > 50 (like tech/AI) means investors expect high future growth!`;
            } else if (query.includes('risk') || query.includes('safe') || query.includes('best stock')) {
                responseText = `### 🛡️ Top Recommended Beginner Stocks\n\n` +
                    `Here are the safest, most reliable choices for someone new to investing:\n\n` +
                    `1. 🌟 **SPY (S&P 500 ETF)** - Risk Score 1/10 (Highest safety via 500 top US stocks)\n` +
                    `2. 🍏 **AAPL (Apple Inc)** - Risk Score 2/10 (Blue-chip consumer giant)\n` +
                    `3. 💻 **MSFT (Microsoft)** - Risk Score 2/10 (Rock-solid enterprise cloud & AI)\n` +
                    `4. 🏭 **RELIANCE (India)** - Risk Score 2/10 (India's premier mega-conglomerate)\n\n` +
                    `💡 *Rule of thumb: Never put all your money into a single stock. Diversify across 3-5 companies!*`;
            } else {
                // Generic AI response
                responseText = `### 💡 AI Market Insights & Guidance\n\n` +
                    `I analyzed your question regarding *"${userQuery}"*:\n\n` +
                    `Key Stock Market Rule: **Invest in high-quality companies you understand**. For instance, if you use an iPhone every day, researching Apple (AAPL) is a great place to start.\n\n` +
                    `You currently have **${state.currency}${state.cash.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}** available in your paper trading wallet. Try executing a practice trade in the Dashboard!`;
            }

            state.aiHistory.push({ sender: 'user', text: userQuery });
            state.aiHistory.push({ sender: 'ai', text: responseText });
            saveState(state);

            return responseText;
        },

        resetState: function () {
            localStorage.removeItem(STORAGE_KEY);
            return getDefaultState();
        },

        // Unified Navbar HTML Generator
        renderNavbar: function (activePage = 'home') {
            const state = loadState();
            const links = [
                { name: 'Home', url: '/index.html', key: 'home', icon: 'home' },
                { name: 'Beginner Academy', url: '/prernaa/solutions_page/code.html', key: 'academy', icon: 'school' },
                { name: 'Trading Dashboard', url: '/prernaa/user_dashboard/code.html', key: 'dashboard', icon: 'dashboard' },
                { name: 'AI Copilot & Intelligence', url: '/prernaa/market_intelligence/code.html', key: 'ai', icon: 'auto_awesome' },
                { name: 'Chart Visualizer', url: '/prernaa/market_visualization/code.html', key: 'charts', icon: 'show_chart' },
                { name: 'Pricing & Upgrade', url: '/prernaa/pricing_page/code.html', key: 'pricing', icon: 'workspace_premium' }
            ];

            const navItems = links.map(link => {
                const isActive = link.key === activePage;
                const activeClass = isActive 
                    ? 'text-emerald-400 bg-emerald-500/10 font-bold border-b-2 border-emerald-400' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50';
                return `<a href="${link.url}" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${activeClass}">
                    <span class="material-symbols-outlined text-lg">${link.icon}</span>
                    <span>${link.name}</span>
                </a>`;
            }).join('');

            return `
            <nav class="fixed top-0 left-0 w-full z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 shadow-2xl">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <a href="/index.html" class="flex items-center gap-2 text-xl font-extrabold tracking-tight text-white group">
                        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                            SC
                        </div>
                        <span class="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">StockCraft<span class="text-emerald-400">.AI</span></span>
                        <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold uppercase tracking-wider">Beginner Edition</span>
                    </a>

                    <div class="hidden lg:flex items-center gap-1">
                        ${navItems}
                    </div>

                    <div class="flex items-center gap-3">
                        <button onclick="StockCraft.ui.toggleCurrencyBtn()" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 flex items-center gap-1 transition-all">
                            <span>Currency:</span>
                            <span class="text-emerald-400 font-extrabold text-sm" id="global-currency-indicator">${state.currency}</span>
                        </button>

                        <a href="/prernaa/user_dashboard/code.html" class="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 rounded-xl font-headline font-bold text-sm shadow-lg shadow-emerald-500/25 active:scale-95 transition-all">
                            <span class="material-symbols-outlined text-lg">account_balance_wallet</span>
                            <span>Cash: ${state.currency}${state.cash.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
                        </a>

                        <button id="mobile-menu-btn" onclick="document.getElementById('mobile-menu').classList.toggle('hidden')" class="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg">
                            <span class="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </div>

                <div id="mobile-menu" class="hidden lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
                    ${navItems}
                </div>
            </nav>
            `;
        },

        // Render Global Ticker Tape
        renderTickerTape: function () {
            const stocks = this.getStocks();
            const state = loadState();
            const tickerItems = stocks.map(s => {
                const isPos = s.change >= 0;
                const color = isPos ? 'text-emerald-400' : 'text-rose-400';
                const icon = isPos ? 'trending_up' : 'trending_down';
                return `
                <div class="inline-flex items-center gap-2 px-4 py-1 text-xs border-r border-slate-800 whitespace-nowrap">
                    <span class="font-bold text-slate-200">${s.symbol}</span>
                    <span class="text-slate-400">${state.currency}${s.price.toFixed(2)}</span>
                    <span class="${color} font-semibold flex items-center gap-0.5">
                        <span class="material-symbols-outlined text-xs">${icon}</span>
                        ${s.changePercent}
                    </span>
                </div>
                `;
            }).join('');

            return `
            <div class="w-full bg-slate-900/80 border-b border-slate-800/80 overflow-hidden py-1">
                <div class="flex animate-marquee hover:pause whitespace-nowrap">
                    ${tickerItems}${tickerItems}
                </div>
            </div>
            `;
        },

        // Shared UI Helpers
        ui: {
            toggleCurrencyBtn: function () {
                const newCurrency = window.StockCraft.toggleCurrency();
                window.location.reload();
            },

            showToast: function (title, message, type = 'success') {
                const toast = document.createElement('div');
                toast.className = `fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-xl shadow-2xl backdrop-blur-xl border flex items-start gap-3 animate-fade-in-up ${
                    type === 'success' 
                        ? 'bg-slate-900/95 border-emerald-500/50 text-emerald-300' 
                        : 'bg-slate-900/95 border-rose-500/50 text-rose-300'
                }`;
                toast.innerHTML = `
                    <span class="material-symbols-outlined text-2xl">${type === 'success' ? 'check_circle' : 'error'}</span>
                    <div>
                        <h4 class="font-bold text-sm text-white">${title}</h4>
                        <p class="text-xs mt-0.5 text-slate-300">${message}</p>
                    </div>
                `;
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 4500);
            }
        }
    };
})();
