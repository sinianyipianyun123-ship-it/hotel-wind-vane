
"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function AdventureTeam() {
  const [hotelName, setHotelName] = useState("");
  const [accent, setAccent] = useState("标准普通话"); 
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const accentOptions = [
    { label: "标准普通话", value: "标准普通话" },
    { label: "京片子", value: "地道北京话，语气爷们儿且损" },
    { label: "东北话", value: "东北方言，语调嘎嘎犀利" },
    { label: "粤语/港式中文", value: "中英文夹杂的港式腔调" },
    { label: "伦敦腔", value: "British London Accent, 带着英式冷幽默" }
  ];

  const generateReport = async () => {
    if (!hotelName) return alert("请输入酒店名称！");
    setLoading(true);
    setResult("");
    try {
      // 初始化：直接读取环境变量
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

      // 【核心修复】这里只传模型名，不加 apiVersion，不加 latest。
      // 配合你 package.json 里的 0.21.0 版本，这是唯一的正确写法。
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `你是一个极其毒舌、犀利的酒店调研员，来自 Adventure Team。
      调研目标：${hotelName}。要求：全程使用“${accent}”风格，开头带上 [Adventure Team Confidential] 字样。`;

      const chat = await model.generateContent(prompt);
      const response = await chat.response;
      setResult(response.text());
    } catch (error: any) {
      console.error(error);
      setResult(`调研失败：${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto font-sans text-black min-h-screen bg-white">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-black italic mb-2 text-red-600">ADVENTURE TEAM</h1>
        <p className="text-gray-500 uppercase tracking-widest text-xs">Hotel Intelligence Division</p>
      </header>
      
      <div className="flex flex-col gap-6 bg-gray-50 p-8 rounded-3xl border border-gray-200">
        <input
          className="w-full border-2 border-gray-300 p-4 rounded-2xl focus:border-black outline-none text-lg shadow-sm"
          placeholder="锁定调研目标酒店..."
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
        />
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {accentOptions.map((opt) => (
            <button
              key={opt.label}
              onClick={() => setAccent(opt.value)}
              className={`p-3 border-2 rounded-xl text-sm font-bold transition-all ${
                accent === opt.value ? "bg-black text-white border-black" : "bg-white text-gray-500 border-gray-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <button
          onClick={generateReport}
          disabled={loading}
          className="mt-4 bg-red-600 text-white p-5 rounded-2xl font-black text-xl hover:bg-red-700 disabled:bg-gray-400 shadow-lg"
        >
          {loading ? "调研员正在潜入现场..." : "生成机密调研报告"}
        </button>
      </div>

      {result && (
        <div className="mt-10 p-8 border-2 border-black rounded-3xl bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-center mb-4 border-b-2 border-gray-100 pb-2 text-xs font-bold">
            <span className="text-red-600">STATUS: CONFIDENTIAL</span>
            <span className="text-gray-400">AGENT: {accent}</span>
          </div>
          <div className="whitespace-pre-wrap leading-relaxed font-medium text-gray-900">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}