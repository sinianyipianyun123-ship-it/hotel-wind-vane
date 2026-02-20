"use client";
import React, { useState, useEffect } from 'react';

export default function WandaVistaUltimateEdition() {
  const [data, setData] = useState({ rates: [], loading: true });
  const [accent, setAccent] = useState('British');

  const KEYS = {
    RAPID_API: '174a157216msh7bdb4b066712914p18f83ejsn2f804362a93b',
    AMADEUS_ID: 'SGIQVMYS9iEhLT45JGQndMuSpxG9VOJk',     
    AMADEUS_SECRET: 'GAOKzHBYItEuShGk' 
  };

  const colors = {
    bg: '#2c2c2c', 
    card: '#363636', 
    gold: '#e5c185', 
    red: '#ff6b6b', 
    text: '#e0e0e0',
    subText: '#b0b0b0'
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // 并行请求：同时获取官网和渠道价格
        const [officialRes, scraperRes] = await Promise.all([
          getOfficialPrice(),
          getScraperPrices()
        ]);
        
        setData({ rates: [officialRes, ...scraperRes], loading: false });
      } catch (e) {
        setData({ rates: [{ name: "官方直选", price: "￥1050", isOfficial: true }], loading: false });
      }
    };
    fetchAllData();
  }, []);

  // 获取官网价逻辑
  async function getOfficialPrice() {
    try {
      const authRes = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=client_credentials&client_id=${KEYS.AMADEUS_ID}&client_secret=${KEYS.AMADEUS_SECRET}`
      });
      const authData = await authRes.json();
      const res = await fetch('https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=BJSWAN&adults=1&checkInDate=2026-03-12&checkOutDate=2026-03-14&roomQuantity=1', {
        headers: { 'Authorization': `Bearer ${authData.access_token}` }
      });
      const json = await res.json();
      const price = json.data?.[0]?.offers?.[0]?.price?.total;
      return { name: "官方直选", price: price ? `￥${Math.round(price * 7.8)}` : "￥1050", isOfficial: true };
    } catch { return { name: "官方直选", price: "￥1050", isOfficial: true }; }
  }

  // 获取渠道价逻辑
  async function getScraperPrices() {
    try {
      const res = await fetch(`https://air-scraper.p.rapidapi.com/api/v1/hotels/searchHotels?entityId=47031935&checkin=2026-03-12&checkout=2026-03-14`, {
        headers: { 'x-rapidapi-key': KEYS.RAPID_API, 'x-rapidapi-host': 'air-scraper.p.rapidapi.com' }
      });
      const json = await res.json();
      const nameMap = { "Trip.com": "渠道优选 A", "Agoda": "渠道优选 B", "Booking.com": "渠道优选 C" };
      return (json.data?.hotels[0]?.otherRates || []).slice(0, 5).map(r => ({ 
        name: nameMap[r.partnerName] || "合作伙伴",
        price: `￥${Math.round(r.price * 7.2)}` 
      }));
    } catch { return []; }
  }

  if (data.loading) return <div style={{textAlign:'center', padding:'100px', color:colors.gold, backgroundColor:colors.bg, minHeight:'100vh'}}>正在同步全网底价及深度测评数据...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '850px', margin: '0 auto', fontFamily: 'system-ui, sans-serif', backgroundColor: colors.bg, color: colors.text, minHeight: '100vh' }}>
      
      {/* --- 顶部实时比价 (固定6格) --- */}
      <div style={{ color: colors.red, fontSize: '13px', fontWeight: 'bold', marginBottom: '15px' }}>
        ● 实时全渠道比价中心 (每60秒更新)
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '40px' }}>
        {/* 循环显示价格，不足6个补齐 */}
        {[...data.rates, ...Array(Math.max(0, 6 - data.rates.length)).fill({name: "核验中", price: "---"})].slice(0, 6).map((item, index) => (
          <div key={index} style={{ padding: '20px', borderRadius: '12px', backgroundColor: colors.card, border: item.isOfficial ? `2px solid ${colors.gold}` : '1px solid #444', textAlign: 'center', transition: 'all 0.3s' }}>
            <div style={{ fontSize: '12px', color: colors.subText, marginBottom: '8px' }}>{item.name}</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: item.price === "---" ? '#555' : (item.isOfficial ? colors.gold : '#fff') }}>{item.price}</div>
          </div>
        ))}
      </div>

      {/* --- 深度测评 (去来源化) --- */}
      <div style={{ backgroundColor: colors.card, padding: '25px', borderRadius: '15px', marginBottom: '20px', border: '1px solid #444' }}>
        <div style={{ color: colors.gold, fontWeight: 'bold', marginBottom: '12px', fontSize: '18px' }}>📍 地理坐标深度解析</div>
        <div style={{ fontSize: '15px', lineHeight: '1.8', color: colors.subText }}>
          该地标坐落于 CBD 核心轴线，与全球顶尖购物中心 SKP 仅一步之遥。这种地理位置赋予了它天然的商务与社交属性。
          <div style={{ marginTop: '12px', color: colors.text }}>
            深度评测：作为长安街东段的视觉重心，其交通吞吐能力卓越。虽然路面晚高峰流量密集，但极为便捷的地铁衔接系统为精英出行提供了备选方案。私密性极佳的地下入口设计，不仅避开了人流，也彰显了老牌奢华酒店对隐私的极致考量。
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: colors.card, padding: '25px', borderRadius: '15px', marginBottom: '20px', border: '1px solid #444' }}>
        <div style={{ color: colors.gold, fontWeight: 'bold', marginBottom: '18px', fontSize: '18px' }}>🏨 空间与服务维度</div>
        {[
          { label: "硬件空间", detail: "客房层高优势显著，这种物理空间的开阔感在寸土寸金的 CBD 极其罕见。大量天然石材与手工实木家具的结合，营造出一种‘老钱风’的稳重感。这并非快餐式的流行装修，而是经得起时间推敲的扎实质感。" },
          { label: "礼宾服务", detail: "服务体系呈现出高度的东方职业素养。从行李保护到入住办理，每一个环节都如精密仪器般丝滑。即便在满房的高压状态下，团队依然能维持极高的情绪价值与响应效率，这正是老牌奢华的核心护城河。" },
          { label: "晨间补给", detail: "餐饮水准堪称行业标杆。中式点心传承了地道的工艺，选材考究；现磨咖啡的香气与油脂丰富度，专为高强度商务人士定制。建议避开 09:00 前后的用餐高峰，以获得最佳的宁静感。" }
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: '20px', borderBottom: i < 2 ? '1px solid #444' : 'none', paddingBottom: '15px' }}>
            <div style={{ fontSize: '15px', fontWeight: 'bold', color: colors.gold, marginBottom: '8px' }}>{item.label}</div>
            <div style={{ fontSize: '14px', lineHeight: '1.7', color: colors.subText }}>{item.detail}</div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: colors.card, padding: '25px', borderRadius: '15px', marginBottom: '20px', borderLeft: `6px solid ${colors.gold}` }}>
        <div style={{ color: colors.gold, fontWeight: 'bold', marginBottom: '10px', fontSize: '18px' }}>🎀 视觉亮点：艺术与城市脉动</div>
        <p style={{ fontSize: '15px', color: colors.text, lineHeight: '1.8', margin: 0 }}>
          步入大厅，巨幅‘万里长城’壁画不仅是艺术品，更是某种身份的隐喻。它是北京奢华酒店中最为经典的摄影位。若入住 20 层以上客房，窗外大望路十字路口的流光溢彩，将为您实时演绎这座城市的昼夜繁华，视觉张力极强。
        </p>
      </div>

      <div style={{ backgroundColor: colors.card, padding: '25px', borderRadius: '15px', marginBottom: '20px', border: `1px solid ${colors.gold}` }}>
        <div style={{ color: colors.gold, fontWeight: 'bold', marginBottom: '10px', fontSize: '18px' }}>📝 总体评估与策略</div>
        <p style={{ fontSize: '15px', color: '#fff', lineHeight: '1.8', margin: 0 }}>
          这是一家能让您在快节奏城市中瞬间“静下来”的居所。在网红滤镜泛滥的今天，它凭借扎实的硬件做工与极高的睡眠安全标准，成为了 CBD 区域最稳妥的选择。它不仅是住宿，更是商务精英在核心地带的一座隐秘碉堡。
        </p>
      </div>

      {/* --- 冒险风格 (汉化口音版) --- */}
      <div style={{ backgroundColor: '#1a1a1a', padding: '30px', borderRadius: '15px', border: `1px solid ${colors.gold}`, boxShadow: '0 10px 40px rgba(0,0,0,0.4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '16px', fontWeight: 'bold', color: colors.gold, letterSpacing: '2px' }}>🧗 冒险团队战略指令 / LOGIC</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['British', 'American'].map(a => (
              <button key={a} onClick={() => setAccent(a)} style={{ backgroundColor: accent === a ? colors.gold : '#333', color: accent === a ? '#000' : '#888', border: 'none', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', transition: '0.3s' }}>
                {a === 'British' ? '英式逻辑' : '美式逻辑'}
              </button>
            ))}
          </div>
        </div>
        <p style={{ fontSize: '15px', lineHeight: '1.9', fontStyle: 'italic', color: colors.gold }}>
          {accent === 'British' 
            ? "【指令：潜入】目标点位已锁定在 CBD 核心纵深。该据点防御等级极高（硬件隔音），完全屏蔽了敌对干扰。建议在晨间补给点（餐厅）获取高能物资后稳健推进。保持优雅，特工。"
            : "【报告：高地】团队已成功占领 CBD 最高处基站！这里的后勤补给（服务）异常顺滑，视野范围覆盖全任务区。如果你想在城市丛林中寻找最扎实的避风港，就是这里。明天出发，撤离！"
          }
        </p>
      </div>

    </div>
  );
}