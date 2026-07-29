/**
 * StockCraft AI Engine - Core Client & Backend API Integration Layer
 * Handles Backend Authentication, Wallet Deposits, Paper Trading Orders,
 * Live Market Ticks, AI Response Engine, and Persistent Sessions.
 */

window.StockCraft = (function () {
    const API_BASE = ''; // Relative path to Express server
    const TOKEN_KEY = 'stockcraft_token_v1';
    const LOCAL_STATE_KEY = 'stockcraft_state_v1';

    // Default Stocks Data Fallback
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
            aiSummary: 'EV margin pressures balanced by Full Self-Driving & Optimus Robot long-term optionality.',
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
            aiSummary: 'India\'s largest market cap company with booming Telecom (Jio) and Retail sectors.',
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
            aiSummary: 'Holds the top 500 largest US companies in one single fund. Historically averages ~10% annual return.',
            beginnerTip: '🌟 THE #1 RECOMMENDED FIRST PURCHASE FOR ALL BEGINNERS! When in doubt, start with an S&P 500 ETF.',
            chartData: [520, 525, 528, 532, 538, 542, 545, 548, 550, 552.10]
        }
    ];

    // Local State Helper
    function getLocalState() {
        try {
            const raw = localStorage.getItem(LOCAL_STATE_KEY);
            if (raw) return JSON.parse(raw);
        } catch (e) {}
        const def = {
            currency: '$',
            cash: 25000.00,
            plan: 'Free Learner',
            name: 'Guest Trader',
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
                    timestamp: new Date().toISOString(),
                    status: 'EXECUTED'
                }
            ],
            aiHistory: [
                { sender: 'ai', text: '👋 Hello! I am **StockBuddy AI**, your stock market mentor. Ask me anything!' }
            ]
        };
        localStorage.setItem(LOCAL_STATE_KEY, JSON.stringify(def));
        return def;
    }

    function saveLocalState(st) {
        localStorage.setItem(LOCAL_STATE_KEY, JSON.stringify(st));
    }

    // API Helper
    async function apiCall(endpoint, method = 'GET', data = null) {
        const token = localStorage.getItem(TOKEN_KEY);
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        try {
            const opts = { method, headers };
            if (data) opts.body = JSON.stringify(data);
            const res = await fetch(API_BASE + endpoint, opts);
            return await res.json();
        } catch (e) {
            console.warn('Backend API connection offline, using client fallback', e);
            return null;
        }
    }

    return {
        getToken: function () {
            return localStorage.getItem(TOKEN_KEY);
        },

        getStocks: function () {
            return INITIAL_STOCKS;
        },

        getStock: function (symbol) {
            return INITIAL_STOCKS.find(s => s.symbol.toUpperCase() === symbol.toUpperCase()) || INITIAL_STOCKS[0];
        },

        getState: function () {
            return getLocalState();
        },

        // --- AUTHENTICATION API ---
        register: async function (name, email, password, currency) {
            const res = await apiCall('/api/auth/register', 'POST', { name, email, password, currency });
            if (res && res.success) {
                localStorage.setItem(TOKEN_KEY, res.token);
                const st = getLocalState();
                st.name = res.user.name;
                st.cash = res.user.cash;
                st.currency = res.user.currency;
                st.portfolio = res.user.portfolio;
                st.transactions = res.user.transactions;
                saveLocalState(st);
                return { success: true, user: res.user };
            } else if (res && res.error) {
                return { success: false, message: res.error };
            }
            // Fallback
            const st = getLocalState();
            st.name = name;
            st.currency = currency || '$';
            saveLocalState(st);
            return { success: true, user: st };
        },

        login: async function (email, password) {
            const res = await apiCall('/api/auth/login', 'POST', { email, password });
            if (res && res.success) {
                localStorage.setItem(TOKEN_KEY, res.token);
                const st = getLocalState();
                st.name = res.user.name;
                st.cash = res.user.cash;
                st.currency = res.user.currency;
                st.portfolio = res.user.portfolio;
                st.transactions = res.user.transactions;
                saveLocalState(st);
                return { success: true, user: res.user };
            } else if (res && res.error) {
                return { success: false, message: res.error };
            }
            return { success: false, message: 'Invalid credentials or connection error' };
        },

        logout: function () {
            localStorage.removeItem(TOKEN_KEY);
            window.location.reload();
        },

        // --- WALLET & ADD MONEY OPTION ---
        addMoney: async function (amount, paymentMethod = 'CREDIT_CARD') {
            amount = parseFloat(amount);
            if (isNaN(amount) || amount <= 0) {
                return { success: false, message: 'Please enter a valid amount.' };
            }

            const res = await apiCall('/api/wallet/deposit', 'POST', { amount, paymentMethod });
            if (res && res.success) {
                const st = getLocalState();
                st.cash = res.newCash;
                st.transactions.unshift(res.receipt);
                saveLocalState(st);
                return { success: true, message: res.message, newCash: res.newCash, receipt: res.receipt };
            }

            // Local Engine Fallback
            const st = getLocalState();
            st.cash += amount;
            const txn = {
                id: 'DEP-' + Math.floor(100000 + Math.random() * 900000),
                symbol: 'WALLET_DEPOSIT',
                type: 'DEPOSIT',
                shares: 1,
                price: amount,
                total: amount,
                timestamp: new Date().toISOString(),
                status: 'COMPLETED'
            };
            st.transactions.unshift(txn);
            saveLocalState(st);

            return {
                success: true,
                message: `🎉 Successfully deposited ${st.currency}${amount.toFixed(2)} into your trading wallet!`,
                newCash: st.cash,
                receipt: txn
            };
        },

        // --- PURCHASE STOCK SIMULATOR ---
        buyStock: async function (symbol, shares) {
            shares = parseInt(shares);
            if (isNaN(shares) || shares <= 0) return { success: false, message: 'Invalid number of shares.' };

            const res = await apiCall('/api/trade/buy', 'POST', { symbol, shares });
            if (res && res.success) {
                const st = getLocalState();
                st.cash = res.userCash;
                st.portfolio = res.portfolio;
                st.transactions.unshift(res.receipt);
                saveLocalState(st);
                return { success: true, message: res.message, receipt: res.receipt };
            } else if (res && res.error) {
                return { success: false, message: res.error };
            }

            // Local Engine Fallback
            const stock = this.getStock(symbol);
            const total = stock.price * shares;
            const st = getLocalState();

            if (st.cash < total) {
                return {
                    success: false,
                    message: `Insufficient Funds! Total cost is ${st.currency}${total.toFixed(2)}, but you only have ${st.currency}${st.cash.toFixed(2)}. Click "Add Money" to deposit funds.`
                };
            }

            st.cash -= total;
            const idx = st.portfolio.findIndex(p => p.symbol === stock.symbol);
            if (idx >= 0) {
                const totalShares = st.portfolio[idx].shares + shares;
                st.portfolio[idx].avgPrice = ((st.portfolio[idx].shares * st.portfolio[idx].avgPrice) + total) / totalShares;
                st.portfolio[idx].shares = totalShares;
            } else {
                st.portfolio.push({ symbol: stock.symbol, shares, avgPrice: stock.price });
            }

            const txn = {
                id: 'TXN-' + Math.floor(100000 + Math.random() * 900000),
                symbol: stock.symbol,
                type: 'BUY',
                shares,
                price: stock.price,
                total,
                timestamp: new Date().toISOString(),
                status: 'EXECUTED'
            };
            st.transactions.unshift(txn);
            saveLocalState(st);

            return { success: true, message: `Successfully purchased ${shares} shares of ${stock.symbol}!`, receipt: txn };
        },

        sellStock: async function (symbol, shares) {
            shares = parseInt(shares);
            if (isNaN(shares) || shares <= 0) return { success: false, message: 'Invalid number of shares.' };

            const res = await apiCall('/api/trade/sell', 'POST', { symbol, shares });
            if (res && res.success) {
                const st = getLocalState();
                st.cash = res.userCash;
                st.portfolio = res.portfolio;
                st.transactions.unshift(res.receipt);
                saveLocalState(st);
                return { success: true, message: res.message, receipt: res.receipt };
            } else if (res && res.error) {
                return { success: false, message: res.error };
            }

            // Fallback
            const stock = this.getStock(symbol);
            const st = getLocalState();
            const idx = st.portfolio.findIndex(p => p.symbol === stock.symbol);

            if (idx < 0 || st.portfolio[idx].shares < shares) {
                return { success: false, message: `Insufficient position in ${symbol}.` };
            }

            const payout = stock.price * shares;
            st.cash += payout;
            st.portfolio[idx].shares -= shares;
            if (st.portfolio[idx].shares === 0) st.portfolio.splice(idx, 1);

            const txn = {
                id: 'TXN-' + Math.floor(100000 + Math.random() * 900000),
                symbol: stock.symbol,
                type: 'SELL',
                shares,
                price: stock.price,
                total: payout,
                timestamp: new Date().toISOString(),
                status: 'EXECUTED'
            };
            st.transactions.unshift(txn);
            saveLocalState(st);

            return { success: true, message: `Successfully sold ${shares} shares of ${stock.symbol}!`, receipt: txn };
        },

        purchasePlan: function (planName, price) {
            const st = getLocalState();
            st.plan = planName;
            const txn = {
                id: 'SUB-' + Math.floor(100000 + Math.random() * 900000),
                symbol: 'SUBSCRIPTION',
                type: 'PURCHASE',
                shares: 1,
                price,
                total: price,
                timestamp: new Date().toISOString(),
                status: 'ACTIVE'
            };
            st.transactions.unshift(txn);
            saveLocalState(st);
            return { success: true, message: `🎉 Upgraded to ${planName}!`, receipt: txn };
        },

        getPortfolioSummary: function () {
            const state = getLocalState();
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

        askAI: function (userQuery, targetSymbol = null) {
            const state = getLocalState();
            let responseText = "";

            if (targetSymbol) {
                const stock = this.getStock(targetSymbol);
                responseText = `### 🤖 StockBuddy AI Evaluation: **${stock.symbol} (${stock.name})**\n\n` +
                    `- **Current Price**: ${state.currency}${stock.price.toFixed(2)} (${stock.changePercent})\n` +
                    `- **AI Recommendation**: <span class="text-emerald-400 font-bold">${stock.aiSignal}</span> (Score: ${stock.aiScore}/100)\n` +
                    `- **Risk Level**: **${stock.riskLevel}**\n\n` +
                    `**Why consider this stock?**\n${stock.aiSummary}\n\n` +
                    `💡 **Beginner Tip**: ${stock.beginnerTip}`;
            } else {
                responseText = `### 💡 AI Market Guidance for Beginners\n\n` +
                    `Question: *"${userQuery}"*\n\n` +
                    `Rule of Thumb: **Invest in what you know and understand.** Always maintain cash reserve! You currently have **${state.currency}${state.cash.toLocaleString(undefined, {minimumFractionDigits:2})}** available in your wallet.`;
            }

            state.aiHistory.push({ sender: 'user', text: userQuery });
            state.aiHistory.push({ sender: 'ai', text: responseText });
            saveLocalState(state);
            return responseText;
        },

        // Dynamic Header Navigation Renderer with Login Status & Add Money Modal Launcher
        renderNavbar: function (activePage = 'home') {
            const state = getLocalState();
            const isLoggedIn = !!localStorage.getItem(TOKEN_KEY);

            const links = [
                { name: 'Home', url: '/index.html', key: 'home', icon: 'home' },
                { name: 'Beginner Academy', url: '/prernaa/solutions_page/code.html', key: 'academy', icon: 'school' },
                { name: 'Trading Dashboard', url: '/prernaa/user_dashboard/code.html', key: 'dashboard', icon: 'dashboard' },
                { name: 'AI Copilot', url: '/prernaa/market_intelligence/code.html', key: 'ai', icon: 'auto_awesome' },
                { name: 'Chart Studio', url: '/prernaa/market_visualization/code.html', key: 'charts', icon: 'show_chart' },
                { name: 'Pricing & Plans', url: '/prernaa/pricing_page/code.html', key: 'pricing', icon: 'workspace_premium' }
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

            const authBtn = isLoggedIn
                ? `<button onclick="StockCraft.logout()" class="px-3 py-1.5 bg-slate-800 hover:bg-rose-500/20 text-rose-300 text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm">logout</span>
                    <span>Logout</span>
                   </button>`
                : `<a href="/prernaa/authentication/code.html" class="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm">login</span>
                    <span>Sign In</span>
                   </a>`;

            return `
            <nav class="fixed top-0 left-0 w-full z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 shadow-2xl">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <a href="/index.html" class="flex items-center gap-2 text-xl font-extrabold tracking-tight text-white group">
                        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                            SC
                        </div>
                        <span class="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">StockCraft<span class="text-emerald-400">.AI</span></span>
                    </a>

                    <div class="hidden lg:flex items-center gap-1">
                        ${navItems}
                    </div>

                    <div class="flex items-center gap-2.5">
                        <!-- Add Money Button -->
                        <button onclick="StockCraft.ui.openAddMoneyModal()" class="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-xl flex items-center gap-1 transition-all active:scale-95">
                            <span class="material-symbols-outlined text-base">add_circle</span>
                            <span>Add Money</span>
                        </button>

                        <a href="/prernaa/user_dashboard/code.html" class="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 rounded-xl font-headline font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition-all">
                            <span class="material-symbols-outlined text-base">account_balance_wallet</span>
                            <span>${state.currency}${state.cash.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
                        </a>

                        ${authBtn}
                    </div>
                </div>
            </nav>

            <!-- Add Money Modal Container -->
            <div id="global-add-money-modal" class="fixed inset-0 z-50 hidden bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
                <div class="glass-panel max-w-md w-full p-6 rounded-3xl border-emerald-500/40 shadow-2xl relative">
                    <button onclick="StockCraft.ui.closeAddMoneyModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white">
                        <span class="material-symbols-outlined">close</span>
                    </button>

                    <div class="space-y-4">
                        <div class="flex items-center gap-3 border-b border-slate-800 pb-3">
                            <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                                <span class="material-symbols-outlined text-2xl">account_balance_wallet</span>
                            </div>
                            <div>
                                <h3 class="font-headline font-bold text-white text-lg">Add Money to Trading Wallet</h3>
                                <p class="text-xs text-slate-400">Instant Deposit via Credit Card, UPI, or Bank Transfer</p>
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-300 uppercase mb-2">Select Deposit Amount:</label>
                            <div class="grid grid-cols-4 gap-2 mb-3">
                                <button onclick="setDepositInput(1000)" class="py-2 bg-slate-900 hover:bg-emerald-500/20 border border-slate-700 text-white rounded-xl text-xs font-bold">+1,000</button>
                                <button onclick="setDepositInput(5000)" class="py-2 bg-slate-900 hover:bg-emerald-500/20 border border-slate-700 text-white rounded-xl text-xs font-bold">+5,000</button>
                                <button onclick="setDepositInput(10000)" class="py-2 bg-slate-900 hover:bg-emerald-500/20 border border-slate-700 text-white rounded-xl text-xs font-bold">+10,000</button>
                                <button onclick="setDepositInput(25000)" class="py-2 bg-slate-900 hover:bg-emerald-500/20 border border-slate-700 text-white rounded-xl text-xs font-bold">+25,000</button>
                            </div>
                            <input id="deposit-amount-input" type="number" value="5000" min="100" class="w-full bg-slate-900 border border-slate-700 focus:border-emerald-400 text-white rounded-xl px-4 py-3 text-sm focus:outline-none font-headline font-bold"/>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-300 uppercase mb-1">Payment Method:</label>
                            <select id="deposit-method-select" class="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none">
                                <option value="CREDIT_CARD">💳 Credit / Debit Card (Instant)</option>
                                <option value="UPI">📱 UPI / QR Code Instant Transfer</option>
                                <option value="NETBANKING">🏦 NetBanking / Wire Transfer</option>
                            </select>
                        </div>

                        <button onclick="executeWalletDeposit()" class="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-headline font-black text-sm rounded-xl shadow-xl shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2">
                            <span class="material-symbols-outlined text-lg">add_circle</span>
                            <span>Confirm & Add Money</span>
                        </button>
                    </div>
                </div>
            </div>
            `;
        },

        renderTickerTape: function () {
            const stocks = this.getStocks();
            const state = getLocalState();
            const items = stocks.map(s => {
                const isPos = s.change >= 0;
                return `
                <div class="inline-flex items-center gap-2 px-4 py-1 text-xs border-r border-slate-800 whitespace-nowrap">
                    <span class="font-bold text-slate-200">${s.symbol}</span>
                    <span class="text-slate-400">${state.currency}${s.price.toFixed(2)}</span>
                    <span class="${isPos ? 'text-emerald-400' : 'text-rose-400'} font-semibold flex items-center gap-0.5">
                        <span class="material-symbols-outlined text-xs">${isPos ? 'trending_up' : 'trending_down'}</span>
                        ${s.changePercent}
                    </span>
                </div>
                `;
            }).join('');

            return `
            <div class="w-full bg-slate-900/80 border-b border-slate-800/80 overflow-hidden py-1">
                <div class="flex animate-marquee hover:pause whitespace-nowrap">
                    ${items}${items}
                </div>
            </div>
            `;
        },

        ui: {
            openAddMoneyModal: function () {
                document.getElementById('global-add-money-modal').classList.remove('hidden');
            },

            closeAddMoneyModal: function () {
                document.getElementById('global-add-money-modal').classList.add('hidden');
            },

            showToast: function (title, message, type = 'success') {
                const toast = document.createElement('div');
                toast.className = `fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-xl shadow-2xl backdrop-blur-xl border flex items-start gap-3 animate-fade-in-up ${
                    type === 'success' ? 'bg-slate-900/95 border-emerald-500/50 text-emerald-300' : 'bg-slate-900/95 border-rose-500/50 text-rose-300'
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

// Global Deposit Helpers
function setDepositInput(val) {
    document.getElementById('deposit-amount-input').value = val;
}

async function executeWalletDeposit() {
    const amt = parseFloat(document.getElementById('deposit-amount-input').value);
    const method = document.getElementById('deposit-method-select').value;
    const res = await StockCraft.addMoney(amt, method);
    StockCraft.ui.closeAddMoneyModal();

    if (res.success) {
        StockCraft.ui.showToast('Money Added!', res.message, 'success');
        setTimeout(() => window.location.reload(), 1200);
    } else {
        StockCraft.ui.showToast('Deposit Failed', res.message, 'error');
    }
}
