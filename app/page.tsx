import React, { useState, useEffect } from 'react';

const WandaVistaFinal = () => {
  const [data, setData] = useState({ rates: [], loading: true });
  const [accent, setAccent] = useState('British'); // 全局口音偏好

  const CONFIG = {
    RAPIDAPI_KEY: '你的_RAPIDAPI_KEY', 
    HOTEL_ID: '47031935', 
    AMADEUS_KEY: 'Kbm6wqGddzemrqwSS5RZ4uNoFytDe2L3'
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://air-scraper.p.rapidapi.com/api/v1/hotels/searchHotels?entityId=${CONFIG.HOTEL_ID}&checkin=2026-03-12&checkout=2026-03-14`;
      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: { 'x-rapidapi-key': CONFIG.RAPIDAPI_KEY, 'x-rapidapi-host': 'air-scraper.p.rapidapi.com' }
        });
        const json = await res.json();
        
        if (json.data && json.data.hotels[0]) {
          const apiRates = json.data.hotels[0].otherRates || []; // 对应图 39
          
          // 这里的关键：直接把 API 返回的 partnerName 赋给 name
          const finalRates = [
            { name: "酒店官网", price: "￥1050", isOfficial: true },
            ...apiRates.slice(0, 5).map(r => ({
              name: r.partnerName, // 这里会显示 Trip.com, Expedia 等真实名字
              price: r.price
            }))
          ];
          setData({ rates: finalRates, loading: false }); 
        }
      } catch (e) { setData({ rates: [], loading: false }); }
    };
    fetchData();
  }, []);

  if (data.loading) return <div style={{textAlign:'center', padding:'100px'}}>正在加载实名渠道数据...</div>;

  return (
    <div style={styles.container}>
      {/* 1. 顶部：实名比价格子 */}
      <div style={styles.headerTitle}>● 全渠道价格实时指数 / PRICE INDEX</div>
      <div style={styles.priceGrid}>
        {data.rates.map((item, index) => (
          <div key={index} style={{
            ...styles.priceCard,
            border: item.isOfficial ? '2px solid #b8974d' : '1px solid #eee'
          }}>
            <div style={styles.partnerName}>{item.name}</div> {/* 渲染真实名字 */}
            <div style={{...styles.priceText, color: item.isOfficial ? '#b8974d' : '#333'}}>{item.price}</div>
          </div>
        ))}
      </div>

      {/* 2. 位置：极简风格 (Minimalist) */}
      <div style={styles.sectionHeaderRed}>📍 位置 / LOCATION (极简版)</div>
      <div style={styles.minimalBox}>
        CBD 核心 / 大望路板块 / 紧邻 SKP / 长安街一线视野 / 核心轨交直达
      </div>

      {/* 3. 硬件：叙事风格 + 口音选择 (Adventure Team 风格) */}
      <div style={styles.sectionHeaderGold}>
        <span>⌨️ 硬件 / HARDWARE (风格版)</span>
        <select value={accent} onChange={(e) => setAccent(e.target.value)} style={styles.select}>
          <option value="British">🇬🇧 英国口音 (Posh)</option>
          <option value="American">🇺🇸 美国口音 (Casual)</option>
        </select>
      </div>
      <div style={styles.narrativeBox}>
        {accent === 'British' ? 
          "The architecture is quite formidable, I daresay. Even when the gales are howling through the CBD, the rooms remain as quiet as a library. Sturdy as a fortress." :
          "This place is built like a tank. Super solid, great soundproofing even in high winds, and that classic luxury vibe that just feels right. It's the real deal."
        }
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'system-ui' },
  headerTitle: { fontSize: '13px', fontWeight: 'bold', color: '#c00', marginBottom: '15px' },
  priceGrid: { display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', marginBottom: '35px' },
  priceCard: { backgroundColor: '#fff', padding: '15px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
  partnerName: { fontSize: '11px', color: '#888', fontWeight: 'bold', marginBottom: '8px' },
  priceText: { fontSize: '20px', fontWeight: 'bold' },
  sectionHeaderRed: { color: '#c00', fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', borderLeft: '4px solid #c00', paddingLeft: '10px' },
  sectionHeaderGold: { color: '#b8974d', fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', marginTop: '30px', borderLeft: '4px solid #b8974d', paddingLeft: '10px', display: 'flex', justifyContent: 'space-between' },
  minimalBox: { backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px', border: '1px solid #eee', fontSize: '14px', letterSpacing: '1px' },
  narrativeBox: { backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e0e0e0', lineHeight: '1.8', color: '#444', fontStyle: 'italic' },
  select: { fontSize: '12px', padding: '2px 8px', borderRadius: '5px' }
};

export default WandaVistaFinal;