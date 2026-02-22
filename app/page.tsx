"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function AdventureTeam() {
  const [hotelName, setHotelName] = useState("");
  const [accent, setAccent] = useState("标准普通话"); 
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // 口音逻辑：label 是显示的文字，value 是传给 AI 的指令
  const accentOptions = [
    { label: "标准普通话", value: "标准普通话" },
    { label: "京片子", value: "地道北京话，语气爷们儿且损" },
    { label: "东北话", value: "东北方言，语调嘎嘎犀利" },
    { label: "粤语/港式", value: "中英文夹杂的港式腔调" },
    { label: "伦敦腔", value: "British London Accent, 带着英式幽默" }
  ];

  const generateReport = async () => {
    if (!hotelName) return alert("请输入酒店名称！");
    
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      setResult("错误：未检测到 API Key。请在 Vercel 后台配置 NEXT_PUBLIC_GEMINI_API_KEY");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      // 1. 初始化，严格使用 v1 版本，绕开 v1beta 的 404 陷阱
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        apiVersion: "v1" 
      });

      // 2. 注入 Adventure Team 专属逻辑和口音偏好
      const prompt = `你现在是 Adventure Team 的首席暗访员。
      调研目标：${hotelName}。
      口音偏好：使用“${accent}”风格。
      任务：写一份极其犀利、毒舌且专业的酒店调研报告。
      开头必须包含 [Adventure Team Confidential] 标识。`;

      const chat = await model.generateContent(prompt);
      const response = await chat.response;
      setResult(response.text());
    } catch (error: any) {
      console.error("API Error Detail:", error);
      // 如果依然报错，我们会在这里看到最真实的错误信息
      setResult(`调研中断：${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto font-sans text-black min-h-screen bg-white">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-black italic mb-2 text-red-600 underline">ADVENTURE TEAM</h1>
        <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Hotel Intelligence Division</p>
      </header>
      
      <div className="flex flex-col gap-6 bg-gray-50 p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <input
          className="w-full border-4 border-black p-4 rounded-xl focus:bg-yellow-50 outline-none text-lg font-bold"
          placeholder="输入调研目标酒店..."
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
        />
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {accentOptions.map((opt) => (
            <button
              key={opt.label}
              onClick={() => setAccent(opt.value)}
              className={`p-3 border-2 rounded-xl text-sm font-black transition-all ${
                accent === opt.value ? "bg-black text-white border-black" : "bg-white text-black border-gray-300 hover:border-black"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <button
          onClick={generateReport}
          disabled={loading}
          className="mt-4 bg-red-600 text-white p-5 rounded-xl font-black text-xl hover:bg-black transition-colors disabled:bg-gray-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          {loading ? "正在调取机密档案..." : "生成报告"}
        </button>
      </div>

      {result && (
        <div className="mt-10 p-8 border-4 border-black rounded-3xl bg-white shadow-[12px_12px_0px_0px_rgba(255,0,0,0.1)]">
          <div className="flex justify-between items-center mb-4 border-b-4 border-black pb-2 text-xs font-black">
            <span className="text-red-600">SECURITY LEVEL: TOP SECRET</span>
            <span className="text-black">AGENT STYLE: {accent.split('，')[0]}</span>
          </div>
          <div className="whitespace-pre-wrap leading-relaxed font-bold text-gray-800">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}