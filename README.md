# PancakeSwap Pool Analyzer

A full-stack application that analyzes PancakeSwap liquidity pools using AI-powered risk assessment. Built with Express.js backend and React frontend, this tool provides comprehensive liquidity health analysis for any token on the Binance Smart Chain.

## 🚀 Features

### Core Functionality
- **Token Analysis**: Input any token contract address to analyze its PancakeSwap pools
- **Real-time Data**: Fetches live pool data from DexScreener API
- **AI-Powered Analysis**: Uses Groq AI to assess liquidity health and risks
- **Interactive UI**: Beautiful dark-themed interface with pool cards and detailed modals
- **Risk Assessment**: Provides risk levels (Low/Moderate/High) with detailed explanations

### Technical Features
- **Multiple Pool Support**: Analyzes all PancakeSwap pools for a given token
- **Comprehensive Metrics**: Liquidity, volume, price stability, market cap analysis
- **Error Handling**: Graceful handling of API failures and rate limits
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Live data fetching with loading states

## 🛠️ Tech Stack

### Backend
- **Express.js**: RESTful API server
- **Groq AI**: AI analysis using Llama 3.1 8B model
- **DexScreener API**: PancakeSwap pool data integration
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Frontend
- **React**: Modern UI framework
- **CSS3**: Custom dark theme with glassmorphism effects
- **Responsive Design**: Mobile-first approach
- **Modern JavaScript**: ES6+ features

### APIs & Services
- **DexScreener**: Real-time DEX data aggregation
- **Groq AI**: Fast AI inference for analysis
- **PancakeSwap**: DEX protocol integration

## 📊 AI Analysis Model

**Model**: Llama 3.1 8B Instant (via Groq)
- **Provider**: Groq AI API
- **Speed**: Ultra-fast inference
- **Analysis Focus**:
  - Liquidity USD & base/quote ratio
  - 24h trading volume vs liquidity
  - Buy/sell transaction ratios
  - Price stability assessment
  - Market cap and FDV relations
  - Risk pattern detection

## 🏗️ Project Structure

```
victor/
├── backend/
│   ├── server.js          # Express server with AI integration
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   ├── App.css       # Dark theme styling
│   │   └── index.js      # React entry point
│   ├── package.json      # Frontend dependencies
│   └── public/           # Static assets
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Groq API key

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```
   
4. **Add your Groq API key to .env:**
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   PORT=7000
   ```

5. **Start the server:**
   ```bash
   npm start
   ```
   
   Server runs on http://localhost:7000

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   
   App runs on http://localhost:3000

## 📖 Usage

1. **Enter Token Address**: Input any BSC token contract address
   - Example: `0xaf44a1e76f56ee12adbb7ba8acd3cbd474888122`

2. **Analyze Pools**: Click "Analyze Pool" to fetch and analyze data

3. **View Results**: Browse pool cards with key metrics

4. **Detailed Analysis**: Click any pool card to see AI-powered analysis

## 🔌 API Endpoints

### GET /fetch-pool
Fetches and analyzes PancakeSwap pools for a given token.

**Parameters:**
- `address` (query): Token contract address

**Response:**
```json
[
  {
    "pool": {
      "pairAddress": "0x...",
      "baseToken": { "symbol": "DUSD" },
      "quoteToken": { "symbol": "USDT" },
      "liquidity": { "usd": 291697305.62 },
      "volume": { "h24": 190040385.14 },
      "priceUsd": "0.9995"
    },
    "analysis": "Risk Level: Moderate\nSummary: ..."
  }
]
```

## 🎨 UI Features

- **Pool Cards**: Interactive cards showing key metrics
- **Modal Analysis**: Detailed AI analysis in expandable modals
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Responsive**: Optimized for all screen sizes

## 🔒 Security

- Environment variables for API keys
- CORS protection
- Input validation
- Error sanitization

## 🚀 Deployment

This application can be deployed to various platforms. The frontend is optimized for Vercel deployment, while the backend can be deployed to platforms like Railway, Render, or Heroku.

## 📈 Performance

- **Fast AI Analysis**: Groq's ultra-fast inference
- **Efficient Data Fetching**: Optimized API calls
- **Responsive UI**: Smooth animations and transitions
- **Error Recovery**: Graceful handling of API failures
