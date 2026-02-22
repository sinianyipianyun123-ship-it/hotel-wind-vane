"use client";

import { useState } from "react";

export default function AdventureTeam() {
  const [hotelName, setHotelName] = useState("");
  const [accent, setAccent] = useState("标准普通话"); 
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const accentOptions = [
    { label: "标准普通话", value: "标准普通话" },
    { label: "京片子", value: "地道北京话，语气爷们儿且损，多带儿化音" },
    { label: "东北话", value: "东北方言，语速快，语气犀利直接" },
    { label: "粤语/港式", value: "中英文夹杂的港式腔调，略显毒舌和浮夸" },
    { label: "伦敦腔", value: "British London Accent, 绅士外表下的极度冷幽默" }
  ];

  const generateReport = async () => {
    if (!hotelName) return alert("请输入调研目标酒店！");
    
    // 1. 获取 API Key
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
    if (!apiKey) {
      setResult("错误：未检测到 API Key。请在 Verc + 环境变量中配置 NEXT_PUBLIC_GEMINI_API_KEY");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      // 2. 直接使用原生 Fetch 访问 Gemini 1.5 Pro 的 v1 接口
      // 注意：URL 中明确指定了 v1 和 gemini-1.5-pro
      const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${apiKey}`;
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `你现在是 Adventure Team 首席暗访员。
              调研目标：${hotelName}。
              口音偏好：${accent}。
              任务：写一份极其犀利、毒舌且专业的酒店暗访报告。
              要求：开头必须包含 [Adventure Team Confidential]，全程保持选定口音风格。`
            }]
          }]
        })
      });

      const data = await response.json();

      // 3. 处理报错信息
      if (data.error) {
        setResult(`Google 报错：${data.error.message} (${data.error.status})`);
        return;
      }

      // 4. 解析结果
      if (data.candidates && data.candidates[0].content) {
        setResult(data.candidates[0].content.parts[0].text);
      } else {
        setResult("未能调取到有效档案，请稍后再试。");
      }
    } catch (error: any) {
      console.error(error);
      setResult(`网络连接异常：${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white min-h-screen text-black font-sans">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-black italic text-red-600 underline decoration-black underline-offset-8">
          ADVENTURE TEAM
        </h1>
        <p className="mt-4 text-gray-500 uppercase tracking-widest text-[10px] font-black">
          Hotel Intelligence Division / 2026
        </p>
      </header>

      <div className="flex flex-col gap-6 bg-gray-50 p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div>
          <label className="block text-[10px] font-black uppercase mb-2 text-red-600">Target / 目标酒店</label>
          <input
            className="w-full border-4 border-black p-4 rounded-xl outline-none font-bold text-lg text-black focus:bg-yellow-50"
            placeholder="锁定吐槽对象..."
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase mb-2 text-red-600">Agent Voice / 探员口音</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {accentOptions.map((opt) => (
              <button
                key={opt.label}
                onClick={() => setAccent(opt.value)}
                className={`p-2 border-2 rounded-lg font-bold text-xs transition-all ${
                  accent === opt.value 
                    ? "bg-black text-white border-black" 
                    : "bg-white border-gray-300 hover:border-black"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generateReport}
          disabled={loading}
          className="bg-red-600 text-white p-5 rounded-xl font-black text-xl hover:bg-black transition-colors disabled:bg-gray-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none"
        >
          {loading ? "正在解析机密数据..." : "生成毒舌报告"}
        </button>
      </div>

      {result && (
        <div className="mt-10 p-8 border-4 border-black rounded-3xl bg-white shadow-[12px_12px_0px_0px_rgba(255,0,0,0.1)]">
          <div className="flex justify-between items-center mb-4 border-b-2 border-black pb-2 text-[10px] font-black uppercase">
            <span className="text-red-600 font-black">Classification: Top Secret</span>
            <span>Style: {accent.split('，')[0]}</span>
          </div>
          <div className="whitespace-pre-wrap leading-relaxed font-bold text-gray-800 italic">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
