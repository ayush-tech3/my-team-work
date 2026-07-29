const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 8000;
const JWT_SECRET = 'stockcraft_super_secret_jwt_key_2026';
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Initial Stock Database
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

// Helper: Read Database
function readDB() {
    if (!fs.existsSync(DB_FILE)) {
        const defaultDB = {
            users: [
                {
                    id: 'usr_demo',
                    name: 'Alex Smith (Demo Trader)',
                    email: 'trader@stockcraft.ai',
                    passwordHash: bcrypt.hashSync('password123', 8),
                    currency: '$',
                    cash: 25000.00,
                    plan: 'Free Learner',
                    portfolio: [
                        { symbol: 'SPY', shares: 10, avgPrice: 535.00 },
                        { symbol: 'AAPL', shares: 15, avgPrice: 215.00 }
                    ],
                    transactions: [
                        {
                            id: 'TXN-INIT-1',
                            symbol: 'SPY',
                            type: 'BUY',
                            shares: 10,
                            price: 535.00,
                            total: 5350.00,
                            timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
                            status: 'EXECUTED'
                        },
                        {
                            id: 'TXN-INIT-2',
                            symbol: 'DEPOSIT',
                            type: 'DEPOSIT',
                            shares: 1,
                            price: 25000.00,
                            total: 25000.00,
                            timestamp: new Date(Date.now() - 86400000 * 6).toISOString(),
                            status: 'COMPLETED'
                        }
                    ]
                }
            ]
        };
        fs.writeFileSync(DB_FILE, JSON.stringify(defaultDB, null, 2));
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

// Helper: Write Database
function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Auth Middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access token missing' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token' });
        req.user = user;
        next();
    });
}

// --- AUTH ENDPOINTS ---

// Register New User
app.post('/api/auth/register', (req, res) => {
    const { name, email, password, currency } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ error: 'Name, Email, and Password are required.' });
    }

    const db = readDB();
    const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
        return res.status(400).json({ error: 'User with this email already exists. Please login.' });
    }

    const newUser = {
        id: 'usr_' + Date.now(),
        name,
        email: email.toLowerCase(),
        passwordHash: bcrypt.hashSync(password, 8),
        currency: currency || '$',
        cash: 25000.00, // Initial Virtual Starting Bonus
        plan: 'Free Learner',
        portfolio: [
            { symbol: 'SPY', shares: 5, avgPrice: 552.10 }
        ],
        transactions: [
            {
                id: 'TXN-' + Math.floor(100000 + Math.random() * 900000),
                symbol: 'WELCOME_BONUS',
                type: 'DEPOSIT',
                shares: 1,
                price: 25000.00,
                total: 25000.00,
                timestamp: new Date().toISOString(),
                status: 'COMPLETED'
            }
        ]
    };

    db.users.push(newUser);
    writeDB(db);

    const token = jwt.sign({ id: newUser.id, email: newUser.email, name: newUser.name }, JWT_SECRET, { expiresIn: '7d' });
    const { passwordHash, ...userClean } = newUser;
    res.json({ success: true, token, user: userClean });
});

// Login User
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    const db = readDB();
    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
        return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    const { passwordHash, ...userClean } = user;
    res.json({ success: true, token, user: userClean });
});

// Get Current Logged-In User Profile
app.get('/api/auth/me', authenticateToken, (req, res) => {
    const db = readDB();
    const user = db.users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { passwordHash, ...userClean } = user;
    res.json({ success: true, user: userClean });
});

// --- WALLET & MONEY MANAGEMENT ENDPOINTS ---

// Add Money / Deposit Funds
app.post('/api/wallet/deposit', authenticateToken, (req, res) => {
    const { amount, paymentMethod } = req.body;
    const depositAmt = parseFloat(amount);

    if (isNaN(depositAmt) || depositAmt <= 0) {
        return res.status(400).json({ error: 'Please specify a valid deposit amount.' });
    }

    const db = readDB();
    const user = db.users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.cash += depositAmt;

    const txnId = 'DEP-' + Math.floor(100000 + Math.random() * 900000);
    const txn = {
        id: txnId,
        symbol: 'WALLET_DEPOSIT',
        type: 'DEPOSIT',
        shares: 1,
        price: depositAmt,
        total: depositAmt,
        method: paymentMethod || 'CREDIT_CARD',
        timestamp: new Date().toISOString(),
        status: 'COMPLETED'
    };

    user.transactions.unshift(txn);
    writeDB(db);

    res.json({
        success: true,
        message: `🎉 Successfully deposited ${user.currency}${depositAmt.toFixed(2)} into your trading account wallet!`,
        newCash: user.cash,
        receipt: txn
    });
});

// --- STOCK & TRADING ENDPOINTS ---

// Get All Stocks
app.get('/api/stocks', (req, res) => {
    res.json({ success: true, stocks: INITIAL_STOCKS });
});

// Get Single Stock Detail
app.get('/api/stocks/:symbol', (req, res) => {
    const symbol = req.params.symbol.toUpperCase();
    const stock = INITIAL_STOCKS.find(s => s.symbol === symbol) || INITIAL_STOCKS[0];
    res.json({ success: true, stock });
});

// Execute Stock Buy Order
app.post('/api/trade/buy', authenticateToken, (req, res) => {
    const { symbol, shares } = req.body;
    const numShares = parseInt(shares);

    if (isNaN(numShares) || numShares <= 0) {
        return res.status(400).json({ error: 'Invalid number of shares.' });
    }

    const stock = INITIAL_STOCKS.find(s => s.symbol.toUpperCase() === symbol.toUpperCase());
    if (!stock) return res.status(400).json({ error: 'Stock symbol not found.' });

    const totalCost = stock.price * numShares;
    const db = readDB();
    const user = db.users.find(u => u.id === req.user.id);

    if (user.cash < totalCost) {
        return res.status(400).json({
            error: `Insufficient Funds! Total cost is ${user.currency}${totalCost.toFixed(2)}, but available balance is ${user.currency}${user.cash.toFixed(2)}. Use the "Add Money" option to deposit more funds.`
        });
    }

    user.cash -= totalCost;

    const posIndex = user.portfolio.findIndex(p => p.symbol === stock.symbol);
    if (posIndex >= 0) {
        const existing = user.portfolio[posIndex];
        const totalShares = existing.shares + numShares;
        const newAvg = ((existing.shares * existing.avgPrice) + totalCost) / totalShares;
        user.portfolio[posIndex].shares = totalShares;
        user.portfolio[posIndex].avgPrice = newAvg;
    } else {
        user.portfolio.push({
            symbol: stock.symbol,
            shares: numShares,
            avgPrice: stock.price
        });
    }

    const txnId = 'TXN-' + Math.floor(100000 + Math.random() * 900000);
    const txn = {
        id: txnId,
        symbol: stock.symbol,
        type: 'BUY',
        shares: numShares,
        price: stock.price,
        total: totalCost,
        timestamp: new Date().toISOString(),
        status: 'EXECUTED'
    };

    user.transactions.unshift(txn);
    writeDB(db);

    res.json({
        success: true,
        message: `Successfully purchased ${numShares} shares of ${stock.symbol} for ${user.currency}${totalCost.toFixed(2)}!`,
        receipt: txn,
        userCash: user.cash,
        portfolio: user.portfolio
    });
});

// Execute Stock Sell Order
app.post('/api/trade/sell', authenticateToken, (req, res) => {
    const { symbol, shares } = req.body;
    const numShares = parseInt(shares);

    if (isNaN(numShares) || numShares <= 0) {
        return res.status(400).json({ error: 'Invalid number of shares.' });
    }

    const stock = INITIAL_STOCKS.find(s => s.symbol.toUpperCase() === symbol.toUpperCase());
    if (!stock) return res.status(400).json({ error: 'Stock symbol not found.' });

    const db = readDB();
    const user = db.users.find(u => u.id === req.user.id);
    const posIndex = user.portfolio.findIndex(p => p.symbol === stock.symbol);

    if (posIndex < 0 || user.portfolio[posIndex].shares < numShares) {
        const avail = posIndex >= 0 ? user.portfolio[posIndex].shares : 0;
        return res.status(400).json({ error: `Insufficient position. You own ${avail} shares of ${symbol}.` });
    }

    const totalPayout = stock.price * numShares;
    user.cash += totalPayout;

    user.portfolio[posIndex].shares -= numShares;
    if (user.portfolio[posIndex].shares === 0) {
        user.portfolio.splice(posIndex, 1);
    }

    const txnId = 'TXN-' + Math.floor(100000 + Math.random() * 900000);
    const txn = {
        id: txnId,
        symbol: stock.symbol,
        type: 'SELL',
        shares: numShares,
        price: stock.price,
        total: totalPayout,
        timestamp: new Date().toISOString(),
        status: 'EXECUTED'
    };

    user.transactions.unshift(txn);
    writeDB(db);

    res.json({
        success: true,
        message: `Successfully sold ${numShares} shares of ${stock.symbol} for ${user.currency}${totalPayout.toFixed(2)}!`,
        receipt: txn,
        userCash: user.cash,
        portfolio: user.portfolio
    });
});

// --- AI ASSISTANT ENDPOINT ---
app.post('/api/ai/ask', (req, res) => {
    const { query, symbol } = req.body;
    let reply = "";

    if (symbol) {
        const stock = INITIAL_STOCKS.find(s => s.symbol.toUpperCase() === symbol.toUpperCase()) || INITIAL_STOCKS[0];
        reply = `### 🤖 StockBuddy AI Breakdown for **${stock.symbol} (${stock.name})**\n\n` +
            `- **Current Price**: $${stock.price.toFixed(2)} (${stock.changePercent})\n` +
            `- **AI Signal**: **${stock.aiSignal}** (Score: ${stock.aiScore}/100)\n` +
            `- **Risk Profile**: ${stock.riskLevel}\n\n` +
            `**AI Summary**: ${stock.aiSummary}\n\n` +
            `💡 **Beginner Tip**: ${stock.beginnerTip}`;
    } else {
        reply = `### 💡 StockBuddy AI Market Guidance\n\n` +
            `Thank you for asking *"${query}"*!\n\n` +
            `Key Beginner Rule: Start by holding steady blue-chip companies or index funds like **SPY (S&P 500 ETF)**. Use your virtual wallet balance to practice buying before using real money!`;
    }

    res.json({ success: true, answer: reply });
});

// --- SUBSCRIPTION ENDPOINT ---
app.post('/api/subscription/upgrade', authenticateToken, (req, res) => {
    const { planName, price } = req.body;
    const db = readDB();
    const user = db.users.find(u => u.id === req.user.id);

    user.plan = planName;
    const txnId = 'SUB-' + Math.floor(100000 + Math.random() * 900000);
    user.transactions.unshift({
        id: txnId,
        symbol: 'SUBSCRIPTION',
        type: 'PURCHASE',
        shares: 1,
        price: parseFloat(price),
        total: parseFloat(price),
        timestamp: new Date().toISOString(),
        status: 'ACTIVE'
    });

    writeDB(db);
    res.json({ success: true, message: `🎉 Successfully upgraded to ${planName}!`, plan: planName });
});

// Start Express Backend Server
app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`🚀 StockCraft AI Server running on http://localhost:${PORT}`);
    console.log(`📁 Database active: ${DB_FILE}`);
    console.log(`=================================================`);
});
