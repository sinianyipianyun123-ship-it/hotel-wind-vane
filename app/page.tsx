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
    { label: "粤语/港式", value: "中英文夹杂的港式腔调" },
    { label: "伦敦腔", value: "British London Accent, 带着英式幽默" }
  ];

  const generateReport = async () => {
    if (!hotelName) return alert("请输入酒店名称！");
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
    if (!apiKey) {
      setResult("错误：未检测到 API Key。请在 Vercel 后台配置环境变量。");
      return;
    }
    setLoading(true);
    setResult("");
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      // 显式指定 v1，强制绕开 v1beta 路径
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        apiVersion: "v1" 
      });
      const prompt = `你是一个极其毒舌的酒店调研员。目标：${hotelName}。要求使用“${accent}”风格。`;
      const chat = await model.generateContent(prompt);
      const response = await chat.response;
      setResult(response.text());
    } catch (error: any) {
      setResult(`调研失败：${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white min-h-screen text-black">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-black italic text-red-600 underline">ADVENTURE TEAM</h1>
        <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Intelligence Division</p>
      </header>
      <div className="flex flex-col gap-6 bg-gray-50 p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <input
          className="w-full border-4 border-black p-4 rounded-xl outline-none font-bold text-lg"
          placeholder="锁定调研目标..."
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {accentOptions.map((opt) => (
            <button
              key={opt.label}
              onClick={() => setAccent(opt.value)}
              className={`p-2 border-2 rounded-lg font-bold transition-all ${accent === opt.value ? "bg-black text-white" : "bg-white border-gray-300"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <button
          onClick={generateReport}
          disabled={loading}
          className="bg-red-600 text-white p-4 rounded-xl font-black text-xl hover:bg-black disabled:bg-gray-400"
        >
          {loading ? "正在调取档案..." : "生成报告"}
        </button>
      </div>
      {result && (
        <div className="mt-10 p-8 border-4 border-black rounded-3xl bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
          <div className="whitespace-pre-wrap leading-relaxed font-bold text-gray-800">{result}</div>
        </div>
      )}
    </div>
  );
}
