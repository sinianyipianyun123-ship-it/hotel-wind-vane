"use client";

import React from 'react';
import { Star, CreditCard, CheckCircle, MapPin, HardDrive, Bell, Coffee, Sparkles, ClipboardCheck } from 'lucide-react';

export default function HotelPage() {
  const data = {
    name: "北京万达文华酒店",
    englishName: "Wanda Vista Beijing",
    stars: 5,
    prices: [
      { platform: "酒店官方", price: "1050" },
      { platform: "优选渠道 A", price: "980" },
      { platform: "优选渠道 B", price: "956" },
      { platform: "国际代理 I", price: "1020" },
      { platform: "国际代理 II", price: "998" },
      { platform: "国际代理 III", price: "1015" }
    ],
    audit: [
      { 
        label: '位置 / LOCATION', 
        icon: <MapPin size={18}/>, 
        color: '#e63946', 
        content: "物业坐落于北京 CBD 核心区大望路板块，地理位置极具战略性。不仅紧邻 SKP 等顶级商业地标，其高层建筑更提供了长安街一线无遮挡的天际线视野。步行可达核心轨道交通，尽管高峰期周边路段存在不可避免的拥堵，但对于追求城心便捷度与城景视野的住客而言，这依然是该区域的黄金坐标。" 
      },
      { 
        label: '硬件 / HARDWARE', 
        icon: <HardDrive size={18}/>, 
        color: '#d4af37', 
        content: "整体呈现经典的老牌奢华质感，建筑结构表现出卓越的稳定性，超高层房型在大风天气下的静音与避震效果极佳。客房空间尺度在同级产品中位居前列，实木与石材的大量应用保障了感官深度。需要注意的是数字化交互设施略显代差，如床头电力配置未更新至主流标准，电视系统也带有明显的时代痕迹。" 
      },
      { 
        label: '服务 / SERVICE', 
        icon: <Bell size={18}/>, 
        color: '#d4af37', 
        content: "展现了极高的本土化服务成熟度与运营韧性。前台团队对高级别会员的权益保障意识清晰，升房响应及待遇落实非常厚道。礼宾系统在处理外卖无感交付、高频快递中转及差旅咨询方面流程极其成熟。虽然整体服务风格偏向稳重老成，但响应速度与执行效率始终维持在五星级旗舰的水准。" 
      },
      { 
        label: '早餐 / BREAKFAST', 
        icon: <Coffee size={18}/>, 
        color: '#e63946', 
        content: "餐饮基因强大，早餐品质被公认为北京奢华酒店的第一梯队。核心亮点在于高水准的中式档口出品，口味地道且种类丰富，特别是现做的淮扬特色点心极具水准。西式面点与咖啡系统品质稳定。即便在高流量时段，餐厅的补菜逻辑与秩序维护也表现得游刃有余。" 
      },
      { 
        label: '亮点 / HIGHLIGHTS', 
        icon: <Sparkles size={18}/>, 
        color: '#d4af37', 
        content: "该物业在美学价值与隐藏功能上具备显著优势。大理石旋转楼梯与 35 层以上的落日景观餐厅构成了极佳的社交视觉名片。此外，其室内恒温泳池的维护标准远超同价位竞品，水质与静谧度极佳。中式浮雕背景墙与复古奢华的装修风格在低饱和度光线下极具高级感，是非常成熟的视觉打卡地。" 
      },
      { 
        label: '总结建议 / VERDICT', 
        icon: <ClipboardCheck size={18}/>, 
        color: '#e63946', 
        content: "综合评估其区位价值、硬件尺度及服务颗粒度，北京万达文华是 1000 元价位段内表现最稳健的奢华选品。它不仅平衡了商务差旅的效率需求，也满足了对经典奢华氛围的追求。对于能够接纳老牌设施细节的住客，该物业提供的综合回馈远超其市场定价，是 CBD 区域的性价比平衡之王。" 
      }
    ]
  };

  // 调整为浅灰色背景渐变
  const bgGradient = 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)'; 
  const cardBg = 'rgba(255, 255, 255, 0.8)'; // 白色半透明卡片，更清爽

  return (
    <div style={{ background: bgGradient, color: '#1f2937', minHeight: '100vh', padding: '40px 5% 80px 5%', fontFamily: 'system-ui, sans-serif' }}>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* 标题区：删除了审计报告字样 */}
        <div style={{ borderBottom: '3px solid #e63946', paddingBottom: '30px', marginBottom: '40px' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', margin: '0 0 10px 0', color: '#111827', fontWeight: '800' }}>{data.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ display: 'flex', gap: '3px' }}>
              {[...Array(data.stars)].map((_, i) => <Star key={i} size={18} fill="#d4af37" color="#d4af37" />)}
            </div>
            <span style={{ color: '#4b5563', fontSize: '15px', fontWeight: '500', letterSpacing: '1px' }}>{data.englishName}</span>
          </div>
        </div>

        {/* 1. 价格区：金色字与清爽卡片 */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e63946', fontSize: '15px', fontWeight: '700' }}>
              <CreditCard size={18} /> <span>全渠道价格实时指数 / PRICE INDEX</span>
            </div>
            <div style={{ color: '#6b7280', fontSize: '13px', fontWeight: '500' }}>● 价格已含全部税费</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '15px' }}>
            {data.prices.map((p, i) => (
              <div key={i} style={{ 
                background: cardBg, padding: '20px 10px', borderRadius: '12px', 
                border: p.platform === '酒店官方' ? '2px solid #d4af37' : '1px solid #cbd5e1', 
                textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ color: p.platform === '酒店官方' ? '#b48a21' : '#6b7280', fontSize: '12px', marginBottom: '8px', fontWeight: '700' }}>{p.platform}</div>
                <div style={{ fontSize: '24px', color: p.platform === '酒店官方' ? '#d4af37' : '#111827', fontWeight: '800' }}>¥{p.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. 六大维度垂直报告 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {data.audit.map((item, i) => (
            <div key={i} style={{ 
              background: cardBg, 
              borderRadius: '16px', 
              padding: '35px', 
              border: '1px solid #cbd5e1',
              borderLeft: `8px solid ${item.color}`,
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                <span style={{ color: item.color }}>{item.icon}</span>
                <span style={{ color: item.color === '#d4af37' ? '#b48a21' : item.color, fontWeight: '800', fontSize: '18px', letterSpacing: '1px' }}>{item.label}</span>
              </div>
              <div style={{ color: '#374151', fontSize: '16px', lineHeight: '2', textAlign: 'justify', fontWeight: '450' }}>
                {item.content}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '60px', fontSize: '12px', color: '#9ca3af', letterSpacing: '4px', fontWeight: '600' }}>
          PROPRIETARY EVALUATION FRAMEWORK | 2026
        </div>
      </div>
    </div>
  );
}