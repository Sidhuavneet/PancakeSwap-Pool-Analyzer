const express = require('express');
const axios = require('axios');
const OpenAI = require('openai');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

app.get('/fetch-pool', async (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.status(400).json({ error: 'Token address is required' });
  }
  try {
    const url = `https://api.dexscreener.com/token-pairs/v1/bsc/${address}`;
    const response = await axios.get(url);

    const pancakePools = response.data.filter(p => p.dexId === 'pancakeswap');
    const analyses = await analyzePools(pancakePools);
    res.json(analyses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
});
async function analyzePools(pools) {
  const analyses = await Promise.all(
    pools.map(async (pool) => {
      const poolSummary = {
        pairAddress: pool.pairAddress,
        dex: pool.dexId,
        baseToken: pool.baseToken.symbol,
        quoteToken: pool.quoteToken.symbol,
        priceUsd: pool.priceUsd,
        priceNative: pool.priceNative,
        liquidity: pool.liquidity,
        volume: pool.volume,
        txns: pool.txns,
        priceChange: pool.priceChange,
        fdv: pool.fdv,
        marketCap: pool.marketCap,
        pairCreatedAt: pool.pairCreatedAt,
        url: pool.url,
      };

      const prompt = `
You are a DeFi data analyst. Analyze the following PancakeSwap pool for liquidity health and risk.

Focus on:
- Liquidity USD & ratio of base/quote liquidity
- 24h trading volume vs liquidity
- Buy/sell ratio in txns
- Price stability from priceChange
- FDV and MarketCap relation
- Any suspicious or risky patterns

Return your analysis in this format:
Risk Level: [Low / Moderate / High]
Summary: [1–2 lines explaining liquidity condition and trading activity]
Recommendation: [Optional, short actionable insight]

Pool Data:
${JSON.stringify(poolSummary, null, 2)}
`;

      const client = new OpenAI({
        apiKey: process.env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1",
      });
      try {
        const resp = await client.responses.create({
          model: "openai/gpt-oss-20b",
          input: prompt,
        });

        return {
          pool: pool,
          analysis: resp.output_text?.trim() || "No analysis generated.",
        };
      } catch (err) {
        console.error("AI analysis error:", err.message);
        return {
          pairAddress: pool.pairAddress,
          analysis: "Error analyzing this pool.",
        };
      }
    })
  );

  return analyses;
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});