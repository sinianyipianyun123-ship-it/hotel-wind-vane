"use client";
import React, { useState, useEffect } from 'react';

export default function WandaVistaFinalV10() {
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
        // 1. 抓取官网价格 (Amadeus)
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

        // 2. 抓取渠道价格 (RapidAPI)
        const scraperRes = await fetch(`https://air-scraper.p.rapidapi.com/api/v1/hotels/searchHotels?entityId=47031935&checkin=2026-03-12&checkout=2026-03-14&currency=CNY`, {
          headers: { 'x-rapidapi-key': KEYS.RAPID_API, 'x-rapidapi-host': 'air-scraper.p.rapidapi.com' }
        });
        const scraperJson = await scraperRes.json();
        
        const finalRates = [];
        if (officialPrice) {
          finalRates.push({ name: "官网渠道", price: `￥${Math.round(officialPrice * 7.8)}`, isOfficial: true });
        }
        
        const apiRates = scraperJson.data?.hotels?.[0]?.otherRates || [];
        apiRates.forEach((r, i) => {
          finalRates.push({ name: r.partnerName || `优选渠道 ${i+1}`, price: `￥${Math.round(r.price)}` });
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
    <div style={{ padding: '25px', maxWidth: '850px', margin: '0 auto', fontFamily: 'sans-serif', backgroundColor: colors.bg, color: colors.text, minHeight: '100vh' }}>
      
      <div style={{ color: colors.red, fontSize: '13px', fontWeight: 'bold', marginBottom: '20px' }}>
        ● 实时比价状态: {loading ? "正在同步全网底价..." : (data.rates.length > 0 ? "已对齐所有渠道价格" : `异常提示: ${data.debug || "当前日期无报价"}`)}
      </div>

      {/* 6格比价网格 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '40px' }}>
        {[...data.rates, ...Array(6)].slice(0, 6).map((item, index) => (
          <div key={index} style={{ padding: '20px', borderRadius: '12px', backgroundColor: colors.card, border: item?.isOfficial ? `2px solid ${colors.gold}` : '1px solid #666', textAlign: 'center', minHeight: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '12px', color: colors.subText, marginBottom: '8px' }}>{item?.name || (loading ? "读取中..." : "核验结束")}</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: item?.isOfficial ? colors.gold : '#fff' }}>{item?.price || "---"}</div>
          </div>
        ))}
      </div>

      {/* 深度测评 */}
      <div style={{ backgroundColor: colors.card, padding: '30px', borderRadius: '15px', marginBottom: '25px', border: '1px solid #666' }}>
        <div style={{ color: colors.gold, fontWeight: 'bold', marginBottom: '15px', fontSize: '20px' }}>📍 核心地缘解析</div>
        <p style={{ fontSize: '15px', lineHeight: '1.9', color: colors.subText }}>
          地标位居 CBD 黄金腹地，与顶级购物地标 SKP 保持着极其完美的社交尺度。地下的隐私通行系统设计，为高净值人群提供了无缝的落客体验。在繁华的长安街中，酒店凭借高规格降噪技术，成功切割出了一片属于精英的静谧高地。
        </p>
      </div>

      <div style={{ backgroundColor: colors.card, padding: '30px', borderRadius: '15px', marginBottom: '25px', border: '1px solid #666' }}>
        <div style={{ color: colors.gold, fontWeight: 'bold', marginBottom: '20px', fontSize: '20px' }}>🏨 空间资产与服务效能</div>
        <div style={{ marginBottom: '25px', borderBottom: '1px solid #666', paddingBottom: '20px' }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: colors.gold, marginBottom: '10px' }}>物理空间质感</div>
          <div style={{ fontSize: '15px', lineHeight: '1.8', color: colors.subText }}>客房拥有 CBD 罕见的超高挑空。内饰选用了高克重的天然石材与手工实木，传达出一种沉稳且具压舱石感的审美逻辑。</div>
        </div>
        <div>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: colors.gold, marginBottom: '10px' }}>管家响应体系</div>
          <div style={{ fontSize: '15px', lineHeight: '1.8', color: colors.subText }}>整体服务呈现出极高的中式礼仪水准。从礼宾的预判性动作到高效的核验流程，即便在高压时段，依然能维持极佳的情绪反馈。</div>
        </div>
      </div>

      {/* 总结建议（已加回） */}
      <div style={{ backgroundColor: colors.card, padding: '30px', borderRadius: '15px', marginBottom: '25px', border: `2px solid ${colors.gold}` }}>
        <div style={{ color: colors.gold, fontWeight: 'bold', marginBottom: '12px', fontSize: '20px' }}>📝 战略评估建议</div>
        <p style={{ fontSize: '15px', color: '#fff', lineHeight: '1.9', margin: 0 }}>
          综上所述，万达文华不仅是一处住宿坐标，更是商务精英在 CBD 核心区不可多得的“全能堡垒”。凭借其扎实的硬件和极高的睡眠安全标准，它在综合对比中具备极高的胜率和确定性。
        </p>
      </div>

      {/* 冒险团队逻辑（已去除切换按钮） */}
      <div style={{ backgroundColor: '#1a1a1a', padding: '35px', borderRadius: '15px', borderLeft: `6px solid ${colors.gold}` }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: colors.gold, letterSpacing: '2px', marginBottom: '15px' }}>🧗 ADVENTURE TEAM 战略总结</div>
        <p style={{ fontSize: '16px', lineHeight: '2', color: colors.gold, fontStyle: 'italic', margin: 0 }}>
          “目标坐标已锁定在 CBD 核心纵深。该据点防御等级极高，已完全隔绝外部干扰。后勤保障（服务）异常丝滑，视野覆盖全境。如果你需要一个在城市丛林中最坚不可摧的堡垒，这里就是唯一的终点。”
        </p>
      </div>

    </div>
  );
}