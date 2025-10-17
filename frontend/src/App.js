import React, { useState } from 'react';
import './App.css';

function App() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [pools, setPools] = useState([]);
  const [selectedPool, setSelectedPool] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tokenAddress.trim()) {
      alert('Please enter a token contract address');
      return;
    }

    setLoading(true);
    try {
      // Use environment variable for API URL, fallback to localhost
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:7000';
      const response = await fetch(`${apiUrl}fetch-pool?address=${tokenAddress}`);
      const data = await response.json();
      
      console.log('Pool data received:', data);
      console.log('First pool structure:', data[0]);
      setPools(data);
    } catch (error) {
      console.error('Error fetching pool data:', error);
      alert('Error fetching pool data. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (pool) => {
    setSelectedPool(pool);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPool(null);
  };

  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(2);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">PancakeSwap Pool Analyzer</h1>
        <p className="subtitle">Analyze liquidity health and risks for any token</p>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <label htmlFor="tokenAddress" className="label">
              Token Contract Address
            </label>
            <input
              type="text"
              id="tokenAddress"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              placeholder="0xaf44a1e76f56ee12adbb7ba8acd3cbd474888122"
              className="input"
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="button"
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Analyze Pool'}
          </button>
        </form>

        {pools.length > 0 && (
          <div className="pools-container">
            <h3 className="pools-title">Found {pools.length} Pool{pools.length > 1 ? 's' : ''}</h3>
            <div className="pools-grid">
              {pools.map((item, index) => {
                // Extract pool data from the nested structure
                const pool = item.pool;
                const analysis = item.analysis;
                
                // Defensive coding - check if required properties exist
                if (!pool || !pool.baseToken || !pool.quoteToken) {
                  console.warn('Invalid pool data at index', index, item);
                  return null;
                }
                
                return (
                  <div key={index} className="pool-card" onClick={() => openModal({...pool, analysis})}>
                    <div className="pool-header">
                      <div className="token-pair">
                        <span className="base-token">{pool.baseToken?.symbol || 'Unknown'}</span>
                        <span className="separator">/</span>
                        <span className="quote-token">{pool.quoteToken?.symbol || 'Unknown'}</span>
                      </div>
                      <div className="dex-badge">{pool.dexId || 'Unknown'}</div>
                    </div>
                    
                    <div className="pool-stats">
                      <div className="stat">
                        <span className="stat-label">Liquidity</span>
                        <span className="stat-value">
                          ${pool.liquidity?.usd ? formatNumber(pool.liquidity.usd) : 'N/A'}
                        </span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">24h Volume</span>
                        <span className="stat-value">
                          ${pool.volume?.h24 ? formatNumber(pool.volume.h24) : 'N/A'}
                        </span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Price</span>
                        <span className="stat-value">
                          ${pool.priceUsd ? parseFloat(pool.priceUsd).toFixed(4) : 'N/A'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="pool-footer">
                      <span className="click-hint">Click for detailed analysis</span>
                    </div>
                  </div>
                );
              }).filter(Boolean)}
            </div>
          </div>
        )}
      </div>

      {showModal && selectedPool && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Pool Analysis</h2>
              <button className="close-button" onClick={closeModal}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="analysis-section">
                <h3>AI Analysis</h3>
                <div className="analysis-text">
                  {selectedPool.analysis || 'No analysis available for this pool.'}
                </div>
              </div>
              
              <div className="pool-details">
                <h3>Pool Details</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Token Pair:</span>
                    <span className="detail-value">
                      {selectedPool.baseToken?.symbol || 'Unknown'}/{selectedPool.quoteToken?.symbol || 'Unknown'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Liquidity (USD):</span>
                    <span className="detail-value">
                      ${selectedPool.liquidity?.usd ? formatNumber(selectedPool.liquidity.usd) : 'N/A'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">24h Volume:</span>
                    <span className="detail-value">
                      ${selectedPool.volume?.h24 ? formatNumber(selectedPool.volume.h24) : 'N/A'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Market Cap:</span>
                    <span className="detail-value">
                      ${selectedPool.marketCap ? formatNumber(selectedPool.marketCap) : 'N/A'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Price (USD):</span>
                    <span className="detail-value">
                      ${selectedPool.priceUsd ? parseFloat(selectedPool.priceUsd).toFixed(6) : 'N/A'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Pair Address:</span>
                    <span className="detail-value">{selectedPool.pairAddress || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
