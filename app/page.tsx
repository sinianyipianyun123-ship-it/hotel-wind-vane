"use client";
import React, { useState, useEffect } from 'react';

// 组件名再次更新，确保强制构建
export default function WandaVistaFinalV12Success() {
  const [data, setData] = useState({ rates: [], debug: "" });
  const [loading, setLoading] = useState(true);

  const KEYS = {
    RAPID_API: '174a157216msh7bdb4b066712914p18f83ejsn2f804362a93b',
    AMADEUS_ID: 'SGIQVMYS9iEhLT45JGQndMuSpxG9VOJk',     
    AMADEUS_SECRET: 'GAOKzHBYItEuShGk' 
  };

  const colors = {
    bg: '#454545', card: '#505050', gold: '#f3e5ab', red: '#ff7a7a', text: '#ffffff', subText: '#e2e2e2'
  };

  useEffect(() => {
    async function runSync() {
      setLoading(true);
      try {
        const authRes = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
          method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `grant_type=client_credentials&client_id=${KEYS.AMADEUS_ID}&client_secret=${KEYS.AMADEUS_SECRET}`
        });
        const auth = await authRes.json();
        const amRes = await fetch('https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=BJSWAN&adults=1&checkInDate=2026-03-12&checkOutDate=2026-03-14&roomQuantity=1', {
          headers: { 'Authorization': `Bearer ${auth.access_token}` }
        });
        const amJson = await amRes.json();
        const officialPrice = amJson.data?.[0]?.offers?.[0]?.price?.total;

        const scraperRes = await fetch(`https://air-scraper.p.rapidapi.com/api/v1/hotels/searchHotels?entityId=47031935&checkin=2026-03-12&checkout=2026-03-14&currency=CNY`, {
          headers: { 'x-rapidapi-key': KEYS.RAPID_API, 'x-rapidapi-host': 'air-scraper.p.rapidapi.com' }
        });
        const scraperJson = await scraperRes.json();
        
        const finalRates = [];
        if (officialPrice) {
          finalRates.push({ name: "官方渠道", price: `￥${Math.round(officialPrice * 7.8)}`, isOfficial: true });
        }
        
        const apiRates = scraperJson.data?.hotels?.[0]?.otherRates || [];
        apiRates.forEach((r, i) => {
          finalRates.push({ name: r.partnerName || `渠道 ${i+1}`, price: `￥${Math.round(r.price)}` });
        });

        setData({ rates: finalRates, debug: scraperJson.message || "" });
      } catch (e) {
        setData(prev => ({ ...prev, debug: e.message }));
      } finally {
        setLoading(false);
      }
    }
    runSync();
  }, []);

  return (
    <div style={{ padding: '25px', maxWidth: '850px', margin: '0 auto', backgroundColor: colors.bg, color: colors.text, minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* 状态条 */}
      <div style={{ color: colors.red, fontSize: '13px', fontWeight: 'bold', marginBottom: '20px' }}>
        ● 状态: {loading ? "正在同步..." : (data.rates.length > 0 ? "对齐成功" : `提示: ${data.debug || "无实时数据"}`)}
      </div>

      {/* 比价格 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '40px' }}>
        {[...data.rates, ...Array(6)].slice(0, 6).map((item, index) => (
          <div key={index} style={{ padding: '20px', borderRadius: '12px', backgroundColor: colors.card, border: item?.isOfficial ? `2px solid ${colors.gold}` : '1px solid #666', textAlign: 'center', minHeight: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '12px', color: colors.subText }}>{item?.name || "同步中..."}</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: item?.isOfficial ? colors.gold : '#fff' }}>{item?.price || "---"}</div>
          </div>
        ))}
      </div>

      {/* 深度测评板块 */}
      <div style={{ backgroundColor: colors.card, padding: '25px', borderRadius: '15px', marginBottom: '20px', border: '1px solid #666' }}>
        <div style={{ color: colors.gold, fontWeight: 'bold', marginBottom: '10px' }}>📍 地缘与空间解析</div>
        <p style={{ fontSize: '14px', lineHeight: '1.8', color: colors.subText }}>位居 CBD 黄金腹地，酒店凭借高规格降噪技术与天然石材内饰，为精英人群在繁华都市中心切割出一片属于高净值的静谧高地。</p>
      </div>

      {/* 战略建议 - 确认包含在此代码中 */}  
      <div style={{ backgroundColor: colors.card, padding: '25px', borderRadius: '15px', marginBottom: '20px', border: `2px solid ${colors.gold}` }}>
        <div style={{ color: colors.gold, fontWeight: 'bold', marginBottom: '10px' }}>📝 战略评估建议</div>
        <p style={{ fontSize: '14px', lineHeight: '1.8', margin: 0 }}>万达文华不仅是住宿坐标，更是商务精英不可多得的“全能堡垒”。凭借其扎实的硬件和睡眠安全标准，在综合对比中具备极高的确定性。</p>
      </div>

      {/* 团队指令 - 纯中文，无英美逻辑按钮 */}
      <div style={{ backgroundColor: '#1a1a1a', padding: '30px', borderRadius: '15px', borderLeft: `6px solid ${colors.gold}` }}>
        <div style={{ fontSize: '16px', fontWeight: 'bold', color: colors.gold, marginBottom: '10px' }}>🧗 ADVENTURE TEAM 战略总结</div>
        <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.gold, fontStyle: 'italic', margin: 0 }}>“目标坐标已锁定。防御等级极高，已完全隔绝外部干扰。后勤保障异常丝滑。这里是你城市丛林中最坚不可摧的终点。”</p>
      </div>
    </div>
  );
}