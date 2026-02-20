"use client";
import React, { useState, useEffect } from 'react';

export default function AdventureTeamAI_V52() {
  const [stage, setStage] = useState('search'); // 'search' or 'report'
  const [inputText, setInputText] = useState('');
  const [data, setData] = useState({ rates: [], loading: true });

  // 模拟搜索触发
  const handleSearch = () => {
    if (inputText.includes("万达文华")) {
      setStage('loading');
      setTimeout(() => setStage('report'), 1500); // 模拟情报搜集过程
    } else {
      alert("请输入关键词，例如：北京万达文华酒店");
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#f0f0f0', // 你要求的稍微深一点的浅灰
      minHeight: '100vh', 
      fontFamily: '"Microsoft YaHei", sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: stage === 'search' ? 'center' : 'flex-start',
      padding: '40px 20px',
      transition: 'all 0.5s ease'
    }}>
      
      {/* --- 搜索阶段：AI 对话界面 --- */}
      {stage === 'search' && (
        <div style={{ width: '100%', maxWidth: '700px', textAlign: 'left' }}>
          <h2 style={{ fontSize: '32px', color: '#1a1a1a', marginBottom: '20px' }}>✨ Hi Cui</h2>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '40px' }}>你想从哪里开始？</h1>
          
          <div style={{ 
            backgroundColor: '#fff', 
            borderRadius: '30px', 
            padding: '15px 25px', 
            display: 'flex', 
            alignItems: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="询问 Adventure Team 3..."
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: '18px', padding: '10px' }}
            />
            <div style={{ display: 'flex', gap: '15px', color: '#666' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => alert("语音识别启动中...")}>🎙️</span>
              <span style={{ cursor: 'pointer', fontWeight: 'bold', color: '#d4af37' }} onClick={handleSearch}>➔</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
            {['生成图像', '市场分析', '撰写报告'].map(tag => (
              <div key={tag} style={{ padding: '8px 15px', backgroundColor: '#fff', borderRadius: '20px', fontSize: '12px', color: '#666', border: '1px solid #ddd' }}>{tag}</div>
            ))}
          </div>
        </div>
      )}

      {/* --- 加载阶段 --- */}
      {stage === 'loading' && <div style={{ fontSize: '20px', color: '#d4af37' }}>正在为您调取实时情报...</div>}

      {/* --- 报告阶段：展示比价和评价 --- */}
      {stage === 'report' && (
        <div style={{ width: '100%', maxWidth: '900px', animation: 'fadeIn 1s' }}>
          {/* 这里放入你之前的标题、比价矩阵和评价卡片 */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>北京万达文华酒店</h1>
            <p style={{ color: '#d4af37', letterSpacing: '4px' }}>价格对比与现场调研报告</p>
          </div>
          
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
              <strong>AI 总结：</strong> 该酒店目前官网价格 ¥998 最具优势。现场调研显示其客房品质极佳，适合高端商务出行...
            </p>
          </div>
          
          <button 
            onClick={() => setStage('search')}
            style={{ marginTop: '30px', padding: '10px 20px', borderRadius: '20px', border: 'none', backgroundColor: '#1a1a1a', color: '#fff', cursor: 'pointer' }}
          >
            返回搜索
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}