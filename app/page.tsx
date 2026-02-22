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
    { label: "京片子", value: "地道北京话，语气爷们儿且损，多带儿化音" },
    { label: "东北话", value: "东北方言，语速快，语气犀利直接" },
    { label: "粤语/港式", value: "中英文夹杂的港式腔调，略显毒舌和浮夸" },
    { label: "伦敦腔", value: "British London Accent, 绅士外表下的极度冷幽默" }
  ];

  const generateReport = async () => {
    if (!hotelName) return alert("请输入调研目标酒店！");
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
    if (!apiKey) {
      setResult("错误：未检测到 API Key。请在 Vercel 环境变量中配置。");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      
      /**
       * 【核心关键】强制锁定 v1 路径
       * 通过 as any 绕过 SDK 的旧版语法检查，强行修改 API 版本
       */
      const model = (genAI as any).getGenerativeModel(
        { model: "gemini-1.5-flash" },
        { apiVersion: "v1" } 
      );

      const prompt = `[Adventure Team Confidential] 你现在是首席暗访员。目标：${hotelName}。口音：${accent}。任务：写一份极其毒舌、犀利的暗访报告。`;

      const chat = await model.generateContent(prompt);
      const response = await chat.response;
      setResult(response.text());
    } catch (error: any) {
      console.error(error);
      setResult(`调研中断：${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white min-h-screen text-black">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-black italic text-red-600 underline decoration-black underline-offset-8">
          ADVENTURE TEAM
        </h1>
        <p className="mt-4 text-gray-500 uppercase tracking-widest text-xs font-bold underline">
          Hotel Intelligence Division / 2026
        </p>
      </header>

      <div className="flex flex-col gap-6 bg-gray-50 p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div>
          <label className="block text-[10px] font-black uppercase mb-2">Target Hotel / 目标</label>
          <input
            className="w-full border-4 border-black p-4 rounded-xl outline-none font-bold text-lg text-black focus:bg-yellow-50"
            placeholder="输入酒店名称..."
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase mb-2">Voice Accent / 探员口音</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {accentOptions.map((opt) => (
              <button
                key={opt.label}
                onClick={() => setAccent(opt.value)}
                className={`p-2 border-2 rounded-lg font-bold text-xs transition-all ${
                  accent === opt.value ? "bg-black text-white" : "bg-white border-gray-300 hover:border-black"
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
          className="bg-red-600 text-white p-5 rounded-xl font-black text-xl hover:bg-black transition-colors disabled:bg-gray-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          {loading ? "正在同步档案..." : "生成机密报告"}
        </button>
      </div>

      {result && (
        <div className="mt-10 p-8 border-4 border-black rounded-3xl bg-white shadow-[12px_12px_0px_0px_rgba(255,0,0,0.1)]">
          <div className="flex justify-between items-center mb-4 border-b-2 border-black pb-2 text-[10px] font-black uppercase">
            <span className="text-red-600 font-black">Status: Top Secret</span>
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
