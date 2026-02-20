import React, { useState, useEffect } from 'react';

const HotelExpertDashboard = () => {
  const [data, setData] = useState({ rates: [], loading: true });
  const [accent, setAccent] = useState('British'); // 默认口音偏好

  const CONFIG = {
    RAPIDAPI_KEY: '你的_RAPIDAPI_KEY', // 填入你的 RapidAPI Key
    HOTEL_ID: '47031935', 
    AMADEUS_KEY: 'Kbm6wqGddzemrqwSS5RZ4uNoFytDe2L3'
  };

  useEffect(() => {
    const fetchAll = async () => {
      const url = `https://air-scraper.p.rapidapi.com/api/v1/hotels/searchHotels?entityId=${CONFIG.HOTEL_ID}&checkin=2026-03-12&checkout=2026-03-14`;
      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: { 'x-rapidapi-key': CONFIG.RAPIDAPI_KEY, 'x-rapidapi-host': 'air-scraper.p.rapidapi.com' }
        });
        const json = await res.json();
        if (json.data && json.data.hotels[0]) {
          const rawRates = json.data.hotels[0].otherRates || [];
          // 整合实名渠道数据
          const processed = [
            { name: "酒店官网", price: "￥1050", isOfficial: true },
            ...rawRates.slice(0, 5).map(r => ({ name: r.partnerName, price: r.price }))
          ];
          setData({ rates: processed, loading: false });
        }
      } catch (e) { setData({ rates: [], loading: false }); }
    };
    fetchAll();
  }, []);

  if (data.loading) return <div style={{textAlign:'center', padding:'100px'}}>加载实名报价与口碑总结...</div>;

  return (
    <div style={styles.container}>
      {/* --- 顶部：实名比价区 (直接显示渠道名字) --- */}
      <div style={styles.priceHeader}>全渠道实名价格监控 / LIVE RATES</div>
      <div style={styles.grid}>
        {data.rates.map((item, index) => (
          <div key={index} style={{...styles.priceCard, border: item.isOfficial ? '2px solid #b8974d' : '1px solid #eee'}}>
            <div style={styles.partnerLabel}>{item.name}</div>
            <div style={{...styles.priceText, color: item.isOfficial ? '#b8974d' : '#333'}}>{item.price}</div>
          </div>
        ))}
      </div>

      {/* --- 中部：评价 - 极简风格 (Minimalist) --- */}
      <div style={styles.sectionHeaderRed}>📍 位置评价 (极简版)</div>
      <div style={styles.minimalBox}>
        核心 CBD / 紧邻 SKP / 长安街视线无阻 / 交通枢纽级便利
      </div>

      {/* --- 底部：评价 - 叙事风格 + 口音选择 (Narrative Style) --- */}
      <div style={styles.sectionHeaderGold}>
        ⌨️ 硬件体验 (叙事版) 
        <select onChange={(e) => setAccent(e.target.value)} style={styles.selector}>
          <option value="British">🇬🇧 英国口音 (Posh)</option>
          <option value="American">🇺🇸 美国口音 (Casual)</option>
        </select>
      </div>
      <div style={styles.narrativeBox}>
        {accent === 'British' ? 
          "Quite a splendid establishment, I must say. The structural integrity is rather commendable, maintaining absolute silence even when the gales howl across the Beijing skyline." :
          "The place is a total powerhouse. Solid as a rock and super quiet, even when the wind is kicking up outside. You get that old-school luxury vibe that actually works."
        }
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'Arial' },
  priceHeader: { fontSize: '12px', fontWeight: 'bold', color: '#c00', marginBottom: '15px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', marginBottom: '40px' },
  priceCard: { padding: '15px', borderRadius: '10px', textAlign: 'center', backgroundColor: '#fff' },
  partnerLabel: { fontSize: '11px', color: '#777', fontWeight: 'bold', marginBottom: '8px' },
  priceText: { fontSize: '20px', fontWeight: 'bold' },
  sectionHeaderRed: { color: '#c00', fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', borderLeft: '4px solid #c00', paddingLeft: '10px' },
  sectionHeaderGold: { color: '#b8974d', fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', marginTop: '30px', borderLeft: '4px solid #b8974d', paddingLeft: '10px', display: 'flex', justifyContent: 'space-between' },
  minimalBox: { backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', border: '1px solid #eee', fontSize: '14px', letterSpacing: '1px' },
  narrativeBox: { backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e0e0e0', lineHeight: '1.8', fontStyle: 'italic', color: '#555' },
  selector: { fontSize: '12px', padding: '2px 5px', borderRadius: '4px', border: '1px solid #ddd' }
};

export default HotelExpertDashboard;