"use client";
import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔑 你的 Key 已经填入
const GOOGLE_KEY = "AIzaSyBfbvl6kvWWRAvY__2698hbXDaJp1QXq10";

export default function HotelAdventureFinal() {
  const [stage, setStage] = useState('search');
  const [inputText, setInputText] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [accent, setAccent] = useState('Professional'); // 默认口音

  // 口音选项定义
  const accents = [
    { id: 'Professional', label: '专业内参', prompt: '语气干练、客观，像高端金融分析师。' },
    { id: 'Humorous', label: '毒舌点评', prompt: '语气幽默、犀利，带点吐槽和毒舌。' },
    { id: 'Enthusiastic', label: '热心探店', prompt: '语气亲切、热情，充满细节描述。' }
  ];

  const handleSearch = async () => {
    if (!inputText) return;
    setStage('loading');

    try {
      const genAI = new GoogleGenerativeAI(GOOGLE_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const currentAccent = accents.find(a => a.id === accent)?.prompt;
      
      const prompt = `
        你是一个资深的酒店调研员。
        用户搜索了：'${inputText}'。
        要求：
        1. 点评要求：${currentAccent}
        2. 字数：120字以内。
        3. 特殊逻辑：如果是"北京万达文华酒店"，必须强调其中式奢华风格和官网¥998的性价比。
        4. 身份：你是 Adventure Team 的首席分析师。
      `;

      const result = await model.generateContent(prompt);
      setAiAnalysis(result.response.text());
      setStage('report');
    } catch (err) {
      setAiAnalysis("分析暂时不可用，可能是 API 连接受限。请检查 Vercel 部署环境或稍后再试。");
      setStage('report');
    }
  };

  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh', color: '#e0e0e0', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* 1. 搜索页面 */}
      {stage === 'search' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: '0 20px' }}>
          <div style={{ color: '#d4af37', fontWeight: 'bold', letterSpacing: '5px', marginBottom: '20px' }}>ADVENTURE TEAM</div>
          <h1 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '40px', textAlign: 'center', color: '#fff' }}>Hotel Intel</h1>
          
          {/* 口音选择逻辑 */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
            {accents.map(a => (
              <button 
                key={a.id}
                onClick={() => setAccent(a.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: accent === a.id ? '1px solid #d4af37' : '1px solid #333',
                  backgroundColor: accent === a.id ? 'rgba(212,175,55,0.1)' : 'transparent',
                  color: accent === a.id ? '#d4af37' : '#888',
                  cursor: 'pointer',
                  transition: '0.3s'
                }}
              >
                {a.label}
              </button>
            ))}
          </div>

          <div style={{ backgroundColor: '#1e1e1e', borderRadius: '50px', padding: '15px 35px', display: 'flex', width: '100%', maxWidth: '600px', border: '1px solid #333' }}>
            <input 
              autoFocus 
              value={inputText} 
              onChange={(e) => setInputText(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="输入酒店名称..." 
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: '18px', backgroundColor: 'transparent', color: '#fff' }} 
            />
            <span onClick={handleSearch} style={{ cursor: 'pointer', fontSize: '28px', color: '#d4af37' }}>➔</span>
          </div>
        </div>
      )}

      {/* 2. 调研报告页面 */}
      {stage === 'report' && (
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '60px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '50px' }}>
            <span style={{ fontWeight: 'bold', color: '#d4af37' }}>ADVENTURE TEAM / INTERNAL REPORT</span>
            <span style={{ opacity: 0.5 }}>STATUS: FINALIZED</span>
          </div>

          <h1 style={{ fontSize: '42px', fontWeight: '900', textAlign: 'center', marginBottom: '50px', color: '#fff' }}>{inputText}</h1>

          {/* 价格对比模块 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '60px' }}>
            {[
              {n:'官方/Direct', p:'998', b:true},
              {n:'Ctrip', p:'1029'},
              {n:'Agoda', p:'1023'},
              {n:'Booking', p:'1050'}
            ].map((item, i) => (
              <div key={i} style={{ 
                backgroundColor: item.b ? '#d4af37' : '#1e1e1e', 
                color: item.b ? '#000' : '#fff', 
                padding: '25px 10px', 
                textAlign: 'center', 
                borderRadius: '4px'
              }}>
                <div style={{ fontSize: '11px', opacity: 0.7, marginBottom: '10px' }}>{item.n}</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>¥{item.p}</div>
              </div>
            ))}
          </div>

          {/* AI 分析摘要 */}
          <div style={{ backgroundColor: '#1e1e1e', padding: '40px', borderRadius: '8px', borderLeft: '4px solid #d4af37' }}>
            <h3 style={{ fontSize: '14px', color: '#d4af37', marginBottom: '20px', letterSpacing: '2px' }}>AI ANALYSIS ({accent})</h3>
            <div style={{ fontSize: '17px', lineHeight: '1.8', color: '#ccc' }}>
              {aiAnalysis}
            </div>
          </div>

          <p onClick={() => setStage('search')} style={{ textAlign: 'center', marginTop: '50px', cursor: 'pointer', color: '#888', textDecoration: 'underline' }}>← 返回重新搜索</p>
        </div>
      )}

      {/* 3. 加载状态 */}
      {stage === 'loading' && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '20px', fontWeight: 'bold', color: '#d4af37' }}>
          正在调取 Adventure Team 远程数据库...
        </div>
      )}
    </div>
  );
}