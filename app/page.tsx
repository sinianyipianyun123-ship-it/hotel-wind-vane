import React, { useState, useEffect } from 'react';

const WandaVistaFullDashboard = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 填入你所有的 Key ---
  const CONFIG = {
    RAPIDAPI_KEY: '你的_RAPIDAPI_KEY', // Air Scraper Key
    HOTEL_ID: '47031935', // 万达文华专属 ID
    AMADEUS_KEY: 'Kbm6wqGddzemrqwSS5RZ4uNoFytDe2L3', // 来自图 40
    AMADEUS_SECRET: '你的_AMADEUS_SECRET' // 来自图 40
  };

  useEffect(() => {
    const fetchComparisonData = async () => {
      try {
        // 1. 调用 Air Scraper 获取平台价格 (Booking, Agoda 等)
        const scraperUrl = `https://air-scraper.p.rapidapi.com/api/v1/hotels/searchHotels?entityId=${CONFIG.HOTEL_ID}&checkin=2026-03-12&checkout=2026-03-14`;
        const scraperRes = await fetch(scraperUrl, {
          method: 'GET',
          headers: { 'x-rapidapi-key': CONFIG.RAPIDAPI_KEY, 'x-rapidapi-host': 'air-scraper.p.rapidapi.com' }
        });
        const scraperJson = await scraperRes.json();
        
        // 提取前 5 个平台价格
        let platformRates = [];
        if (scraperJson.data && scraperJson.data.hotels[0]) {
          platformRates = (scraperJson.data.hotels[0].otherRates || []).slice(0, 5);
        }

        // 2. 调用 Amadeus 获取“官网/GDS”报价 (简化逻辑展示)
        // 注意：Amadeus 实际需先用 Key/Secret 换取 Token，这里演示最终填入效果
        const officialRate = {
          partnerName: "Official Website (官网)",
          price: "￥1,688", // 这里通常是 Amadeus 返回的最低直销价
          isOfficial: true
        };

        // 3. 组合成 6 个格子：5个平台 + 1个官网
        setRates([...platformRates, officialRate]);
        setLoading(false);
      } catch (err) {
        console.error("加载失败:", err);
        setLoading(false);
      }
    };

    fetchComparisonData();
  }, []);

  if (loading) return <div style={styles.loading}>正在同步官网及全网实时价格...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>北京万达文华酒店 - 全网实时比价</h2>
      
      <div style={styles.grid}>
        {rates.map((item, index) => (
          <div key={index} style={{
            ...styles.card,
            borderColor: item.isOfficial ? '#006ce4' : '#eee', // 官网格子用蓝色强调
            backgroundColor: item.isOfficial ? '#f0f7ff' : '#fff'
          }}>
            <div style={styles.partnerName}>
              {item.isOfficial ? '👑 ' : ''}{item.partnerName}
            </div>
            <div style={styles.priceTag}>{item.price}</div>
            <div style={{...styles.badge, backgroundColor: item.isOfficial ? '#006ce4' : '#2ecc71'}}>
              {item.isOfficial ? '直签底价' : '今日特惠'}
            </div>
            <button style={{...styles.btn, backgroundColor: item.isOfficial ? '#006ce4' : '#ff5a5f'}}>
              {item.isOfficial ? '官网预订' : '前往预订'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '30px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'system-ui' },
  loading: { textAlign: 'center', marginTop: '100px', fontSize: '18px', color: '#666' },
  header: { textAlign: 'center', marginBottom: '30px', color: '#333' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' },
  card: { border: '2px solid #eee', borderRadius: '16px', padding: '20px', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' },
  partnerName: { fontSize: '13px', color: '#777', fontWeight: 'bold', marginBottom: '10px' },
  priceTag: { fontSize: '28px', fontWeight: 'bold', color: '#222', marginBottom: '10px' },
  badge: { display: 'inline-block', color: '#fff', fontSize: '10px', padding: '2px 10px', borderRadius: '20px', marginBottom: '15px' },
  btn: { width: '100%', padding: '12px', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }
};

export default WandaVistaFullDashboard;