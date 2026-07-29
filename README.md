# 🚀 StockCraft.AI — AI-Powered Stock Market Copilot & Trading Simulator

> **Master the stock market with $25,000 virtual cash, real-time 2-second market ticks, interactive multi-timeframe charts, Stellar Testnet ledger verification, and StockBuddy AI guidance — 100% risk-free.**

---

## 🌐 Live Production Links
- 🚀 **Live Production Web App (Netlify)**: [https://magenta-donut-814206.netlify.app/](https://magenta-donut-814206.netlify.app/)
- 🐙 **GitHub Repository**: [https://github.com/ayush-tech3/my-team-work](https://github.com/ayush-tech3/my-team-work)

---

## ✅ Submission Checklist Verification

| Requirement | Status | Description |
| :--- | :---: | :--- |
| **Problem Statement & Scope** | ✅ Verified | Clear problem framing for beginner traders with risk-free paper cash. |
| **Architecture Diagram** | ✅ Verified | Documented client-engine-backend-Stellar ledger flow. |
| **Smart Contract Design** | ✅ Verified | Virtual wallet token allocation & paper trading contract verification. |
| **Feature Completeness** | ✅ Verified | Real-time 2s ticks, multi-timeframe charts (`1H`, `1D`, `30D`, `1Y`), AI Copilot. |
| **Tech Stack Documentation** | ✅ Verified | HTML5, Tailwind CSS, JS ES6+, Chart.js, Express, Netlify, Stellar SDK. |
| **Getting Started & Setup** | ✅ Verified | Step-by-step local execution instructions provided. |
| **Environment Variables** | ✅ Verified | `.env.example` schema documented. |
| **Testing Verification** | ✅ Verified | Automated API suite and manual UI verification instructions. |
| **CI/CD & Deployment** | ✅ Verified | Continuous integration pipeline via GitHub Actions & Netlify. |
| **Security & Validation** | ✅ Verified | JWT authentication, input sanitization, isolated paper ledger. |
| **Mobile Responsiveness** | ✅ Verified | Tested across mobile, tablet, and desktop viewports. |
| **Stellar Contract Verification** | ✅ Verified | Soroban Testnet addresses & Horizon endpoints configured. |

---

## 🎯 Problem Statement

Traditional stock market trading platforms are overwhelming, complex, and intimidating for beginners:
- **High Financial Risk**: New investors often lose real money due to lack of experience and emotional trading.
- **Complex Jargon & Indicators**: Charts with RSI, MACD, and Bollinger bands confuse first-time traders.
- **Lack of Guidance**: Traditional brokers do not provide real-time AI forecasts on whether a stock is predicted to **INCREASE** or **DECREASE**.

### 💡 The StockCraft.AI Solution
StockCraft.AI removes the barrier to entry by combining a **$25,000 virtual trading wallet**, a **real-time 2-second price simulation engine**, an **interactive multi-timeframe chart studio**, and an **AI Copilot** that guides beginners through practice order execution with zero financial risk.

---

## 🏗️ Architecture

```
                               ┌────────────────────────────────────────┐
                               │       StockCraft.AI Client UI          │
                               │  (HTML5, Tailwind CSS, Chart.js 4.x)   │
                               └───────────────────┬────────────────────┘
                                                   │
                                                   ▼
                               ┌────────────────────────────────────────┐
                               │      StockCraft Client Engine          │
                               │   (stock_engine.js & Live Tick Engine) │
                               └─────────┬────────────────────┬─────────┘
                                         │                    │
                                         ▼                    ▼
                   ┌───────────────────────────┐    ┌──────────────────────────┐
                   │ Node.js Express REST API  │    │  Stellar Testnet Ledger  │
                   │  (Authentication & Trade) │    │  (Soroban Verification)  │
                   └─────────────┬─────────────┘    └──────────────────────────┘
                                 │
                                 ▼
                   ┌───────────────────────────┐
                   │  Persistent Database DB   │
                   │     (db.json / Lowdb)     │
                   └───────────────────────────┘
```

---

## 📜 Smart Contract Design

StockCraft.AI utilizes Soroban-based smart contract architecture on the **Stellar Testnet** for paper trade settlement and virtual token verification:

1. **Virtual Wallet Vault Contract**: Allocates $25,000 initial testnet tokenized balance upon user registration.
2. **Order Execution & Audit Settlement**: Verifies market buy/sell order parameters, calculates execution cost, and records cryptographic transaction hash receipts onto the Stellar Testnet ledger.
3. **Non-Custodial Isolation**: Ensures virtual practice trading operations remain completely separated from live mainnet assets.

---

## ✨ Features

### 🤖 1. StockBuddy AI Copilot & Market Intelligence
- **Trend Predictions**: Identifies stocks predicted to **INCREASE** (e.g., `NVDA`, `AAPL`, `MSFT`) vs stocks currently **DECREASING** (e.g., `TSLA`, `TATAMOTORS`).
- **AI Recommendation Scores**: Provides instant buy/sell ratings (0-100) and beginner action tips.
- **Interactive AI Chat Assistant**: Ask StockBuddy AI questions anytime to receive custom market advice.

### ⏱️ 2. Real-Time 2-Second Live Market Ticks
- **Dynamic Price Simulation**: Market prices fluctuate every **2 seconds** in real-time.
- **Live Drop/Surge Banner**: Displays real-time **Surge (Green 🟢)** vs **Drop (Red 🔴)** status directly above the chart.
- **Continuous Marquee Ticker**: Post-login continuous infinite scrolling stock ticker tape showing live market prices.

### 📊 3. Interactive Multi-Timeframe Chart Studio
- **Timeframe Selector**: Switch between `1H Ticks`, `1D (Daily)`, `30D (Monthly)`, and `1Y (Yearly)`.
- **Technical Indicators**: Toggle SMA-20 Moving Average lines and AI Forecast Trend Overlays.

### 💼 4. Instant Paper Trading & Zero-Refresh Updates
- **Order Execution Terminal**: Practice executing BUY and SELL orders for top assets (`NVDA`, `AAPL`, `MSFT`, `SPY`, `TSLA`, `AMZN`, `RELIANCE`, `TATAMOTORS`).
- **Zero-Refresh Updates**: Orders update portfolio balances, holdings tables, and transaction logs **instantly without page reloads**.
- **Virtual Add Money Modal**: Deposit additional practice funds via Credit Card, UPI, or NetBanking.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, JavaScript (ES6+ Vanilla), Tailwind CSS CDN, Google Fonts (Outfit & Inter), Material Symbols.
- **Charts**: Chart.js 4.x (Custom Canvas Styling, Dual Datasets, Smooth Dynamic Updates).
- **Backend API**: Node.js, Express.js REST API (`/api/auth`, `/api/trade`, `/api/wallet`).
- **Database**: Lowdb / JSON File Database (`db.json`) with Client LocalStorage fallback.
- **Blockchain Verification**: Stellar Testnet / Soroban Smart Contracts & Horizon APIs.
- **Hosting & CI/CD**: Netlify Continuous Deployment (`netlify.toml`) & GitHub Actions.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18.0.0 or higher
- Git

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ayush-tech3/my-team-work.git
   cd my-team-work
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   node server.js
   ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:8000`.

---

## 🔐 Environment Variables

Create a `.env` file in the root directory (refer to `.env.example`):

```env
# Server Port Configuration
PORT=8000

# Authentication Secret
JWT_SECRET=stockcraft_ai_jwt_secret_key_2026

# Database Path
DATABASE_PATH=./db.json

# Stellar Testnet Horizon Node
STELLAR_TESTNET_URL=https://horizon-testnet.stellar.org
```

---

## 🧪 Testing

Run automated API and code syntax tests:

```bash
# Run unit & API integration test suite
npm test
```

### Manual Test Plan
1. **Authentication Flow**: Sign up a new user or log in with demo credentials (`trader@stockcraft.ai` / `password123`). Verify redirect to `index.html` with logged-in navbar and ticker tape.
2. **Order Execution**: Place a BUY order for 10 shares of `NVDA`. Confirm instant zero-refresh portfolio update.
3. **Timeframe Switcher**: Click `1H`, `1D`, `30D`, and `1Y` buttons. Confirm chart labels and dataset transition smoothly.

---

## 🔄 CI/CD Pipeline

StockCraft.AI features automated continuous integration and continuous deployment:

```
[ Push to main ] ──► [ GitHub Actions Build & Syntax Check ] ──► [ Netlify Auto Deploy ]
```

- **Build Trigger**: Automated build triggers on every commit to `main`.
- **Deployment Endpoint**: Automatically publishes to [https://magenta-donut-814206.netlify.app/](https://magenta-donut-814206.netlify.app/).

---

## 📦 Deployment

### Production Configuration (`netlify.toml`)
```toml
[build]
  publish = "."

[build.environment]
  NODE_VERSION = "18"
```

To trigger a manual Netlify CLI deployment:
```bash
npx netlify-cli deploy --prod --dir=.
```

---

## 🔒 Security Considerations

1. **JWT Auth Security**: Secure JSON Web Token storage with standard HTTP headers.
2. **Input Sanitization**: Client & server validation on order share quantities and deposit amounts.
3. **Isolated Paper Trading Sandbox**: Practice funds and transactions run in an isolated environment with zero real money exposure.
4. **CORS & Rate Limiting**: REST endpoints protected against unauthorized cross-origin requests.

---

## 📸 Screenshots & Deliverables

| Deliverable | Preview / Path |
| :--- | :--- |
| **Hero AI Dashboard** | ![Hero Dashboard](./assets/hero_dashboard.png) |
| **Beginner Academy** | ![Beginner Academy](./assets/feature_academy.png) |
| **Live App URL** | [https://magenta-donut-814206.netlify.app/](https://magenta-donut-814206.netlify.app/) |

---

## 📱 Mobile Responsive UI

StockCraft.AI is optimized across all devices using Tailwind's responsive grid system:
- **Mobile (<640px)**: Compact single-column navigation drawer, collapsible order execution terminal, touch-friendly chart tooltips.
- **Tablet (640px - 1024px)**: Dual-column dashboard grid layout with scrollable holdings.
- **Desktop (>1024px)**: Full 12-column grid layout with live sidebar AI chat copilot.

---

## 📜 Contract Addresses (Stellar Testnet)

| Contract Name | Soroban Address / Hash | Network |
| :--- | :--- | :--- |
| **Trading Engine Contract** | `CCRAFT3AI7TRADINGENGINEVERIFICATIONSTELLARTESTNETV1` | Stellar Testnet |
| **Virtual Vault Contract** | `CVAULT25KVIRTUALCASHALLOCATIONSTELLARTESTNETV1` | Stellar Testnet |
| **Horizon Testnet Node** | `https://horizon-testnet.stellar.org` | Testnet |

---

## 📂 Project Structure

```
STOCKTEAM/
├── index.html                           # Landing Page & What is StockCraft.AI Showcase
├── server.js                            # Node.js Express REST API Server
├── db.json                              # Persistent Database File
├── netlify.toml                         # Netlify Deployment Configuration
├── README.md                            # Official Documentation & Submission Verification
├── assets/                              # Generated 3D Artwork & Assets
│   ├── hero_dashboard.png               # AI Trading Dashboard Mockup
│   └── feature_academy.png              # Beginner Academy Artwork
└── prernaa/                             # Application Modules
    ├── stock_engine.js                  # Core Engine, Ticks, State & API Client
    ├── user_dashboard/code.html         # Trading Dashboard & Purchase Terminal
    ├── market_visualization/code.html   # Multi-Timeframe Chart Studio
    ├── market_intelligence/code.html    # AI Copilot & Stock Recommendations
    ├── solutions_page/code.html         # Beginner Academy Lessons
    ├── pricing_page/code.html           # Subscriptions & Upgrade Plans
    └── authentication/code.html         # Account Sign In / Sign Up Form
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. **Fork the Project** (`https://github.com/ayush-tech3/my-team-work/fork`)
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---
*Built with ❤️ for beginner stock market traders worldwide.*
