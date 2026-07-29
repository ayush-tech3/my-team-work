# 🚀 StockCraft.AI — AI-Powered Stock Market Copilot & Trading Simulator

> **Master the stock market with $25,000 virtual cash, real-time 2-second market ticks, interactive multi-timeframe charts, and StockBuddy AI guidance — 100% risk-free.**

---

## 🌐 Live Demo & Deployment
- 🚀 **Live Web App (Netlify)**: [https://magenta-donut-814206.netlify.app/](https://magenta-donut-814206.netlify.app/)
- 🐙 **GitHub Repository**: [https://github.com/ayush-tech3/my-team-work](https://github.com/ayush-tech3/my-team-work)

---

## ✨ Features & Highlights

### 🤖 1. StockBuddy AI Copilot & Market Intelligence
- **AI Stock Forecasts**: Identifies stocks predicted to **INCREASE** (e.g. `NVDA`, `AAPL`, `MSFT`) vs stocks currently **DECREASING** (e.g. `TSLA`, `TATAMOTORS`).
- **AI Recommendation Scores**: Instant buy/sell ratings out of 100 with beginner-friendly tips.
- **Interactive Chat Assistant**: Ask StockBuddy AI questions anytime to get tailored market guidance.

### ⏱️ 2. Real-Time 2-Second Live Market Ticks
- **Dynamic Price Simulation**: Prices fluctuate live every **2 seconds** simulating a real market environment.
- **Live Action Status Banner**: Displays real-time **Surge (Green 🟢)** vs **Drop (Red 🔴)** status directly above the stock chart.
- **Continuous Ticker Tape**: Post-login continuous infinite scrolling stock marquee ticker tape showing real-time market updates.

### 📊 3. Interactive Multi-Timeframe Chart Studio
- **Resolution Switcher**: Toggle seamlessly between:
  - **`1H Ticks`**: Hourly intraday resolution (`09:00 AM` to `04:00 PM`).
  - **`1D (Daily)`**: Daily resolution (`Mon` to `Sun`).
  - **`30D (Monthly)`**: 30-day historical trend (`Week 1` to `Week 6`).
  - **`1Y (Yearly)`**: 12-month annual performance (`Jan` to `Dec`).
- **Technical Indicators**: Toggle SMA-20 Moving Averages and AI Trend Forecast Overlays on demand.

### 💼 4. Instant Paper Trading & Virtual Wallet
- **$25,000 Virtual Cash**: Every new account starts with $25,000 in virtual paper cash.
- **Order Execution Terminal**: Practice executing **BUY** and **SELL** orders for real stock tickers (`NVDA`, `AAPL`, `MSFT`, `SPY`, `TSLA`, `AMZN`, `RELIANCE`, `TATAMOTORS`).
- **Zero-Refresh Instant UI Updates**: Executing orders or depositing money updates portfolio totals, cash balances, holdings tables, and transaction receipts **instantly without page reload**.
- **Virtual Add Money Modal**: Deposit practice funds via Credit Card, UPI, or NetBanking.
- **Itemized Receipts**: View official digital transaction receipts for all trades and deposits.

### 🔒 5. Dynamic Auth & Gated Experience
- **Introductory Landing Page**: Before login, visitors see a clean overview of *What is StockCraft.AI*, comparison against traditional brokers, interactive 3D particle canvas background, and feature highlights.
- **Gated Post-Login Features**: Signing in unlocks internal navigation (`Beginner Academy`, `Trading Dashboard`, `AI Copilot`, `Chart Studio`, `Pricing & Plans`) and the top live stock ticker.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | HTML5, JavaScript (ES6+ Vanilla), Tailwind CSS CDN, Google Fonts (Outfit & Inter), Material Symbols |
| **Charts** | Chart.js 4.x (Custom Canvas Styling, Dual Datasets, Smooth Dynamic Updates) |
| **Backend API** | Node.js, Express.js REST API (`/api/auth`, `/api/trade`, `/api/wallet`) |
| **Database** | Lowdb / JSON Database (`db.json`) with Client LocalStorage Fallback |
| **Hosting** | Netlify Continuous Deployment (`netlify.toml`) & GitHub Pages Ready |

---

## 📁 Repository Directory Structure

```
STOCKTEAM/
├── index.html                           # Landing Page & What is StockCraft.AI Showcase
├── server.js                            # Node.js Express REST API Server
├── db.json                              # Persistent Database File
├── netlify.toml                         # Netlify Deployment Configuration
├── README.md                            # Official Documentation
├── assets/                              # Generated 3D Artwork & Images
│   ├── hero_dashboard.png               # AI Trading Dashboard Mockup
│   └── feature_academy.png              # Beginner Academy 3D Artwork
└── prernaa/                             # Modular Application Modules
    ├── stock_engine.js                  # Core Engine, Ticks, State & API Client
    ├── user_dashboard/code.html         # Trading Dashboard & Purchase Terminal
    ├── market_visualization/code.html   # Multi-Timeframe Chart Studio
    ├── market_intelligence/code.html    # AI Copilot & Stock Recommendations
    ├── solutions_page/code.html         # Beginner Academy Lessons
    ├── pricing_page/code.html           # Subscriptions & Upgrade Plans
    └── authentication/code.html         # Account Sign In / Sign Up Form
```

---

## 🚦 Local Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ayush-tech3/my-team-work.git
   cd my-team-work
   ```

2. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

3. **Start the Express backend server**:
   ```bash
   node server.js
   ```

4. **Open in Browser**:
   Navigate to `http://localhost:8000` to launch the application.

---

## 📝 Demo Login Credentials

Pre-filled demo credentials are available on the Sign In page:
- **Email**: `trader@stockcraft.ai`
- **Password**: `password123`
- *(Or click **Sign Up** to create a custom account with $25,000 starting cash!)*

---

## 📜 License & Acknowledgments

Built for stock market beginners to learn paper trading and risk management with AI guidance. All financial market data is simulated for educational purposes.
