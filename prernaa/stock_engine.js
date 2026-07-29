/**
 * StockCraft AI Engine - Core Client & Backend API Integration Layer
 * Handles Backend Authentication, Wallet Deposits, Paper Trading Orders,
 * Hourly & Real-Time Market Ticks, Multi-Timeframe Datasets, AI Engine, and Sessions.
 */

window.StockCraft = (function () {
    const API_BASE = ''; 
    const TOKEN_KEY = 'stockcraft_token_v1';
    const LOCAL_STATE_KEY = 'stockcraft_state_v1';

    // Stock Market Database with Multi-Timeframe Data (1H, 1D, 30D, 1Y)
    const INITIAL_STOCKS = [
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
            trendType: 'INCREASING',
            predictedGain: '+18.4% (AI Forecast)',
            riskLevel: 'Moderate (High Growth)',
            riskScore: 6,
            dividend: '0.04%',
            aiSignal: 'STRONG BUY (TOP GAINER)',
            aiScore: 96,
            aiSummary: '🔥 PREDICTED TO INCREASE: Surging demand for Blackwell AI chips. Hourly momentum is strongly bullish.',
            beginnerTip: 'Great growth choice! High hourly volatility, ideal for dollar-cost averaging.',
            // Multi-Timeframe Datasets
            hourlyLabels: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'],
            hourlyData: [118.50, 119.20, 120.10, 121.00, 120.80, 121.90, 122.30, 122.80],
            dailyLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            dailyData: [112.40, 114.80, 116.20, 118.00, 119.50, 121.10, 122.80],
            monthlyLabels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
            monthlyData: [98.50, 104.20, 110.00, 114.50, 118.90, 122.80],
            yearlyLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            yearlyData: [62.00, 71.50, 84.20, 88.00, 96.50, 108.00, 112.50, 115.00, 118.20, 120.00, 121.50, 122.80]
        },
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
            trendType: 'INCREASING',
            predictedGain: '+12.0% (AI Forecast)',
            riskLevel: 'Low (Beginner Safe)',
            riskScore: 2,
            dividend: '0.5%',
            aiSignal: 'BUY (STEADY GROWTH)',
            aiScore: 94,
            aiSummary: '📈 PREDICTED TO INCREASE: Apple Intelligence ecosystem rollout driving steady hourly price expansion.',
            beginnerTip: 'Safe anchor stock! Ideal for your first practice trade.',
            hourlyLabels: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'],
            hourlyData: [222.10, 222.80, 223.00, 223.50, 223.90, 224.10, 224.30, 224.50],
            dailyLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            dailyData: [218.00, 219.20, 220.50, 221.80, 222.40, 223.60, 224.50],
            monthlyLabels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
            monthlyData: [205.00, 209.50, 214.00, 218.50, 221.00, 224.50],
            yearlyLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            yearlyData: [182.00, 186.50, 191.00, 195.20, 202.00, 208.50, 212.00, 216.40, 219.00, 221.50, 223.00, 224.50]
        },
        {
            symbol: 'MSFT',
            name: 'Microsoft Corp',
            sector: 'Software & Cloud',
            price: 448.20,
            change: +3.10,
            changePercent: '+0.70%',
            high: 451.00,
            low: 446.10,
            pe: 35.8,
            marketCap: '$3.33T',
            trendType: 'INCREASING',
            predictedGain: '+15.2% (AI Forecast)',
            riskLevel: 'Low (Beginner Safe)',
            riskScore: 2,
            dividend: '0.7%',
            aiSignal: 'STRONG BUY',
            aiScore: 95,
            aiSummary: '📈 PREDICTED TO INCREASE: Cloud AI adoption accelerating across enterprise clients hourly.',
            beginnerTip: 'Very low risk. Microsoft is a rock-solid cornerstone stock.',
            hourlyLabels: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'],
            hourlyData: [445.00, 445.80, 446.20, 447.00, 447.50, 447.80, 448.00, 448.20],
            dailyLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            dailyData: [438.00, 440.50, 442.10, 444.00, 445.80, 447.00, 448.20],
            monthlyLabels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
            monthlyData: [415.00, 422.00, 430.00, 436.50, 442.00, 448.20],
            yearlyLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            yearlyData: [370.00, 385.00, 400.00, 412.00, 424.00, 432.00, 438.00, 441.00, 443.50, 445.00, 447.00, 448.20]
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
            trendType: 'STABLE / INCREASING',
            predictedGain: '+10.5% (Historical Avg)',
            riskLevel: 'Ultra Low (Safest for Beginners)',
            riskScore: 1,
            dividend: '1.2%',
            aiSignal: 'STRONG BUY (SAFEST PICK)',
            aiScore: 98,
            aiSummary: '🌟 PREDICTED TO INCREASE: Holds 500 top companies. Hourly index steady upward movement.',
            beginnerTip: 'The #1 recommended first stock purchase for all beginners!',
            hourlyLabels: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'],
            hourlyData: [549.80, 550.20, 550.80, 551.20, 551.50, 551.80, 552.00, 552.10],
            dailyLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            dailyData: [542.00, 544.50, 546.10, 548.00, 549.50, 550.80, 552.10],
            monthlyLabels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
            monthlyData: [520.00, 528.00, 534.50, 540.00, 546.00, 552.10],
            yearlyLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            yearlyData: [475.00, 488.00, 502.00, 512.00, 524.00, 532.00, 538.00, 542.00, 546.00, 548.50, 550.00, 552.10]
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
            trendType: 'DECREASING',
            predictedGain: '-4.2% Short-Term Correction',
            riskLevel: 'High (Speculative)',
            riskScore: 8,
            dividend: '0.0%',
            aiSignal: 'NEUTRAL / DECREASING WARNING',
            aiScore: 64,
            aiSummary: '📉 CURRENTLY DECREASING: Hourly selling pressure due to short-term margin compression. Wait for support before buying.',
            beginnerTip: 'Caution: Currently in an hourly downward trend. Avoid putting large funds here until price stabilizes.',
            hourlyLabels: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'],
            hourlyData: [253.50, 251.20, 249.80, 248.50, 247.90, 247.10, 246.80, 246.30],
            dailyLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            dailyData: [262.00, 258.50, 255.00, 251.80, 249.00, 247.50, 246.30],
            monthlyLabels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
            monthlyData: [285.00, 274.00, 265.00, 258.00, 251.00, 246.30],
            yearlyLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            yearlyData: [240.00, 210.00, 180.00, 172.00, 195.00, 220.00, 245.00, 260.00, 255.00, 250.00, 248.00, 246.30]
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
            trendType: 'INCREASING',
            predictedGain: '+13.8% (AI Forecast)',
            riskLevel: 'Low-Moderate',
            riskScore: 3,
            dividend: '0.0%',
            aiSignal: 'BUY',
            aiScore: 89,
            aiSummary: '📈 PREDICTED TO INCREASE: AWS growth and logistics automation driving positive hourly price candles.',
            beginnerTip: 'Great combination of retail dominance and cloud tech growth.',
            hourlyLabels: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'],
            hourlyData: [184.20, 184.80, 185.10, 185.50, 185.80, 186.10, 186.20, 186.40],
            dailyLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            dailyData: [179.50, 181.00, 182.40, 183.80, 184.90, 185.80, 186.40],
            monthlyLabels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
            monthlyData: [168.00, 172.50, 177.00, 180.50, 183.50, 186.40],
            yearlyLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            yearlyData: [145.00, 152.00, 160.00, 168.00, 174.00, 179.00, 181.50, 183.00, 184.50, 185.20, 186.00, 186.40]
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
            trendType: 'INCREASING',
            predictedGain: '+11.2% (AI Forecast)',
            riskLevel: 'Low (Beginner Safe)',
            riskScore: 2,
            dividend: '0.4%',
            aiSignal: 'STRONG BUY',
            aiScore: 93,
            aiSummary: '📈 PREDICTED TO INCREASE: Booming Telecom (Jio) and Retail sectors pushing hourly prices up.',
            beginnerTip: 'Ideal starting stock for Indian market investors.',
            hourlyLabels: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'],
            hourlyData: [2965.00, 2968.00, 2972.00, 2975.00, 2978.00, 2979.00, 2980.00, 2980.00],
            dailyLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            dailyData: [2920.00, 2935.00, 2948.00, 2960.00, 2970.00, 2975.00, 2980.00],
            monthlyLabels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
            monthlyData: [2800.00, 2840.00, 2890.00, 2925.00, 2955.00, 2980.00],
            yearlyLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            yearlyData: [2450.00, 2520.00, 2600.00, 2680.00, 2750.00, 2820.00, 2880.00, 2920.00, 2945.00, 2960.00, 2972.00, 2980.00]
        },
        {
            symbol: 'TATAMOTORS',
            name: 'Tata Motors Ltd',
            sector: 'Automotive (EV Leader)',
            price: 1012.00,
            change: -8.50,
            changePercent: '-0.83%',
            high: 1025.00,
            low: 998.00,
            pe: 18.2,
            marketCap: '₹3.72 Lakh Cr',
            trendType: 'DECREASING',
            predictedGain: '-2.1% Short-Term Dip',
            riskLevel: 'Moderate',
            riskScore: 4,
            dividend: '0.6%',
            aiSignal: 'HOLD / DIP BUY OPPORTUNITY',
            aiScore: 82,
            aiSummary: '📉 CURRENTLY DECREASING: Minor hourly pullback. Good potential dip-buying opportunity for long-term investors.',
            beginnerTip: 'Short-term hourly dip. Watch for price reversal before placing order.',
            hourlyLabels: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'],
            hourlyData: [1022.00, 1020.00, 1018.00, 1016.00, 1015.00, 1014.00, 1013.00, 1012.00],
            dailyLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            dailyData: [1038.00, 1032.00, 1026.00, 1020.00, 1016.00, 1014.00, 1012.00],
            monthlyLabels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
            monthlyData: [1080.00, 1062.00, 1045.00, 1030.00, 1020.00, 1012.00],
            yearlyLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            yearlyData: [780.00, 840.00, 910.00, 960.00, 990.00, 1020.00, 1045.00, 1035.00, 1025.00, 1020.00, 1015.00, 1012.00]
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
            name: 'Trader Account',
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
                { sender: 'ai', text: '👋 Hello! I am **StockBuddy AI**. Ask me which stocks are **increasing** or **decreasing**!' }
            ]
        };
        localStorage.setItem(LOCAL_STATE_KEY, JSON.stringify(def));
        return def;
    }

    function saveLocalState(st) {
        localStorage.setItem(LOCAL_STATE_KEY, JSON.stringify(st));
    }

    // REAL-TIME SECOND-BY-SECOND MARKET SIMULATION ENGINE
    let liveTickerInterval = null;
    function startLiveTickerEngine() {
        if (liveTickerInterval) return;
        liveTickerInterval = setInterval(() => {
            // Pick a random stock to fluctuate
            const stock = INITIAL_STOCKS[Math.floor(Math.random() * INITIAL_STOCKS.length)];
            const deltaPercent = (Math.random() - 0.48) * 0.008; // small price tick
            const oldPrice = stock.price;
            stock.price = Math.max(1.00, parseFloat((stock.price * (1 + deltaPercent)).toFixed(2)));
            stock.change = parseFloat((stock.price - (stock.hourlyData[0] || stock.price)).toFixed(2));
            const pct = ((stock.change / stock.hourlyData[0]) * 100).toFixed(2);
            stock.changePercent = `${pct >= 0 ? '+' : ''}${pct}%`;
            stock.trendType = stock.change >= 0 ? 'INCREASING' : 'DECREASING';
            stock.hourlyData[stock.hourlyData.length - 1] = stock.price;

            // Dispatch live tick event to UI
            window.dispatchEvent(new CustomEvent('stockcraft_tick', {
                detail: {
                    symbol: stock.symbol,
                    price: stock.price,
                    change: stock.change,
                    changePercent: stock.changePercent,
                    trendType: stock.trendType,
                    stock: stock
                }
            }));
        }, 2000); // 2 second live market tick interval!
    }

    // Start engine immediately
    startLiveTickerEngine();

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
        isLoggedIn: function () {
            return !!localStorage.getItem(TOKEN_KEY);
        },

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
            localStorage.setItem(TOKEN_KEY, 'demo_token_' + Date.now());
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

            if (email === 'trader@stockcraft.ai' || email.includes('@')) {
                localStorage.setItem(TOKEN_KEY, 'demo_token_' + Date.now());
                const st = getLocalState();
                return { success: true, user: st };
            }
            return { success: false, message: 'Invalid credentials' };
        },

        logout: function () {
            localStorage.removeItem(TOKEN_KEY);
            window.location.href = '/index.html';
        },

        // --- WALLET & ADD MONEY ---
        addMoney: async function (amount, paymentMethod = 'CREDIT_CARD') {
            amount = parseFloat(amount);
            if (isNaN(amount) || amount <= 0) return { success: false, message: 'Please enter a valid amount.' };

            const res = await apiCall('/api/wallet/deposit', 'POST', { amount, paymentMethod });
            if (res && res.success) {
                const st = getLocalState();
                st.cash = res.newCash;
                st.transactions.unshift(res.receipt);
                saveLocalState(st);
                return { success: true, message: res.message, newCash: res.newCash, receipt: res.receipt };
            }

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

        // --- PURCHASE STOCK ---
        buyStock: async function (symbol, shares) {
            shares = parseInt(shares);
            if (isNaN(shares) || shares <= 0) return { success: false, message: 'Please enter a valid number of shares.' };

            if (!this.isLoggedIn()) {
                return {
                    success: false,
                    message: '🔒 Authentication Required! Please Sign In or Register to execute stock purchases.'
                };
            }

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

            const stock = this.getStock(symbol);
            const total = stock.price * shares;
            const st = getLocalState();

            if (st.cash < total) {
                return {
                    success: false,
                    message: `Insufficient Funds! Total cost is ${st.currency}${total.toFixed(2)}, but available balance is ${st.currency}${st.cash.toFixed(2)}. Click "Add Money" to deposit funds.`
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
            if (isNaN(shares) || shares <= 0) return { success: false, message: 'Please enter a valid number of shares.' };

            if (!this.isLoggedIn()) {
                return {
                    success: false,
                    message: '🔒 Authentication Required! Please Sign In or Register to execute stock sales.'
                };
            }

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

            const stock = this.getStock(symbol);
            const st = getLocalState();
            const idx = st.portfolio.findIndex(p => p.symbol === stock.symbol);

            if (idx < 0 || st.portfolio[idx].shares < shares) {
                return { success: false, message: `Insufficient position. You own ${idx >= 0 ? st.portfolio[idx].shares : 0} shares of ${symbol}.` };
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

            return { success: true, message: `Successfully sold ${shares} shares of ${symbol}!`, receipt: txn };
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
                responseText = `### 🤖 StockBuddy AI Analysis: **${stock.symbol} (${stock.name})**\n\n` +
                    `- **Current Price**: ${state.currency}${stock.price.toFixed(2)} (${stock.changePercent})\n` +
                    `- **Trend**: <span class="${stock.trendType === 'INCREASING' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}">${stock.trendType}</span> (${stock.predictedGain})\n` +
                    `- **AI Recommendation**: **${stock.aiSignal}** (Score: ${stock.aiScore}/100)\n\n` +
                    `**AI Summary**: ${stock.aiSummary}\n\n` +
                    `💡 **Beginner Tip**: ${stock.beginnerTip}`;
            } else {
                responseText = `### 💡 StockBuddy AI Market Guidance\n\n` +
                    `Question: *"${userQuery}"*\n\n` +
                    `Top Recommendation: Look at stocks marked **"PREDICTED TO INCREASE"** (like **NVDA** or **AAPL**). Always maintain virtual cash reserves!`;
            }

            state.aiHistory.push({ sender: 'user', text: userQuery });
            state.aiHistory.push({ sender: 'ai', text: responseText });
            saveLocalState(state);
            return responseText;
        },

        // DYNAMIC NAVBAR: SHOWS TABS ONLY AFTER LOGIN!
        renderNavbar: function (activePage = 'home') {
            const state = getLocalState();
            const loggedIn = this.isLoggedIn();

            let middleNavItems = '';
            
            // ONLY SHOW INTERNAL NAVIGATION LINKS AFTER LOGIN!
            if (loggedIn) {
                const links = [
                    { name: 'Home', url: '/index.html', key: 'home', icon: 'home' },
                    { name: 'Beginner Academy', url: '/prernaa/solutions_page/code.html', key: 'academy', icon: 'school' },
                    { name: 'Trading Dashboard', url: '/prernaa/user_dashboard/code.html', key: 'dashboard', icon: 'dashboard' },
                    { name: 'AI Copilot', url: '/prernaa/market_intelligence/code.html', key: 'ai', icon: 'auto_awesome' },
                    { name: 'Chart Studio', url: '/prernaa/market_visualization/code.html', key: 'charts', icon: 'show_chart' },
                    { name: 'Pricing & Plans', url: '/prernaa/pricing_page/code.html', key: 'pricing', icon: 'workspace_premium' }
                ];

                middleNavItems = links.map(link => {
                    const isActive = link.key === activePage;
                    const activeClass = isActive 
                        ? 'text-emerald-400 bg-emerald-500/10 font-bold border-b-2 border-emerald-400' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50';
                    return `<a href="${link.url}" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${activeClass}">
                        <span class="material-symbols-outlined text-lg">${link.icon}</span>
                        <span>${link.name}</span>
                    </a>`;
                }).join('');
            } else {
                // BEFORE LOGIN: Clean single home indicator
                middleNavItems = `
                    <a href="/index.html" class="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 font-bold text-sm border border-emerald-500/20">
                        <span class="material-symbols-outlined text-lg">home</span>
                        <span>What is StockCraft.AI</span>
                    </a>
                `;
            }

            // TOP-RIGHT CORNER PROMINENT AUTH BUTTONS
            let topRightControls = '';
            if (loggedIn) {
                topRightControls = `
                <div class="flex items-center gap-3">
                    <button onclick="StockCraft.ui.openAddMoneyModal()" class="px-3.5 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-headline font-bold rounded-xl flex items-center gap-1.5 transition-all active:scale-95">
                        <span class="material-symbols-outlined text-base">add_circle</span>
                        <span>Add Money</span>
                    </button>

                    <a href="/prernaa/user_dashboard/code.html" class="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 rounded-xl font-headline font-extrabold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition-all">
                        <span class="material-symbols-outlined text-base">account_balance_wallet</span>
                        <span id="nav-cash-balance-display">${state.currency}${state.cash.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
                    </a>

                    <button onclick="StockCraft.logout()" class="px-3.5 py-2 bg-slate-800 hover:bg-rose-500/20 text-rose-300 text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">logout</span>
                        <span>Logout</span>
                    </button>
                </div>
                `;
            } else {
                topRightControls = `
                <div class="flex items-center gap-3">
                    <a href="/prernaa/authentication/code.html" class="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700/90 text-xs font-headline font-bold rounded-xl shadow-md hover:border-emerald-400 transition-all flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base text-slate-400">login</span>
                        <span>Sign In</span>
                    </a>
                    <a href="/prernaa/authentication/code.html?mode=register" class="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-headline font-black text-xs rounded-xl shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">person_add</span>
                        <span>Sign Up</span>
                    </a>
                </div>
                `;
            }

            return `
            <nav class="fixed top-0 left-0 w-full z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <a href="/index.html" class="flex items-center gap-2 text-xl font-extrabold tracking-tight text-white group">
                        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                            SC
                        </div>
                        <span class="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">StockCraft<span class="text-emerald-400">.AI</span></span>
                    </a>

                    <div class="hidden lg:flex items-center gap-1">
                        ${middleNavItems}
                    </div>

                    ${topRightControls}
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

        // SEAMLESS CONTINUOUS SCROLLING TICKER TAPE SHOWING ALL STOCKS ("ONE SIDE GO, NEXT SIDE IT CAME")
        renderTickerTape: function () {
            if (!this.isLoggedIn()) return '';

            const stocks = this.getStocks();
            const state = getLocalState();
            const items = stocks.map(s => {
                const isPos = s.change >= 0;
                return `
                <div class="inline-flex items-center gap-3 px-5 py-1 text-xs border-r border-slate-800/80 whitespace-nowrap">
                    <span class="font-black text-white font-headline">${s.symbol}</span>
                    <span class="text-slate-300 font-mono">${state.currency}${s.price.toFixed(2)}</span>
                    <span class="${isPos ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'} px-2 py-0.5 rounded-md font-bold flex items-center gap-0.5 text-[11px]">
                        <span class="material-symbols-outlined text-xs">${isPos ? 'trending_up' : 'trending_down'}</span>
                        ${s.changePercent}
                    </span>
                </div>
                `;
            }).join('');

            return `
            <style>
                @keyframes stockTickerMove {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .ticker-scroll-track {
                    display: flex;
                    width: max-content;
                    animation: stockTickerMove 30s linear infinite;
                }
                .ticker-scroll-track:hover {
                    animation-play-state: paused;
                }
            </style>
            <div class="w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 overflow-hidden py-1 z-40 relative">
                <div class="ticker-scroll-track">
                    ${items}${items}${items}${items}
                </div>
            </div>
            `;
        },

        ui: {
            openAddMoneyModal: function () {
                if (!window.StockCraft.isLoggedIn()) {
                    window.StockCraft.ui.showToast('Authentication Required', 'Please Sign In or Register to deposit funds into your wallet.', 'error');
                    setTimeout(() => window.location.href = '/prernaa/authentication/code.html', 1200);
                    return;
                }
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

    if (res && res.success) {
        StockCraft.ui.showToast('Money Added!', res.message, 'success');
        // AUTOMATIC INSTANT UI REFRESH WITHOUT FULL PAGE RELOAD!
        if (typeof window.refreshDashboard === 'function') {
            window.refreshDashboard();
        } else {
            const state = StockCraft.getState();
            const navDisp = document.getElementById('nav-cash-balance-display');
            if (navDisp) navDisp.innerText = `${state.currency}${state.cash.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}`;
        }
    } else {
        StockCraft.ui.showToast('Deposit Failed', res ? res.message : 'Deposit failed', 'error');
    }
}
