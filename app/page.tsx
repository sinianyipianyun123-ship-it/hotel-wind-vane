
"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function AdventureTeam() {
  const [hotelName, setHotelName] = useState("");
  const [accent, setAccent] = useState("标准普通话"); // 默认口音
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. 口音选项定义：这里决定了 AI 说话的“味儿”
  const accentOptions = [
    { label: "标准普通话", value: "标准普通话" },
    { label: "京片子", value: "地道北京话，多用‘您呐’、‘合着’，语气爷们儿且损" },
    { label: "东北话", value: "东北方言，多用‘必须滴’、‘整挺好’，语调高昂犀利" },
    { label: "粤语/港式中文", value: "中英文夹杂的港式腔调，多用‘Literal’、‘系咁先’" },
    { label: "伦敦腔", value: "British London Accent, 带着英式冷幽默和绅士般的尖酸刻薄" }
  ];

  const generateReport = async () => {
    if (!hotelName) return alert("老板，还没输入酒店名字呢！");
    setLoading(true);
    setResult("");

    try {
      // 读取你在 Vercel 后台配好的 API Key
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

      // 2. 【核心修复】：配合 npm install @google/generative-ai@latest 后的最简写法
      // 不再手动写 apiVersion，让最新插件自动处理路径，彻底告别 404
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // 3. 缝合逻辑：将 accent 变量注入提示词
      const prompt = `你是一个极其毒舌、犀利的酒店调研员，来自秘密组织 Adventure Team。
      现在的调研目标是：${hotelName}。
      
      ⚠️ 任务指令：
      1. 你必须全程使用“${accent}”的口音和用词风格来撰写。
      2. 评价要真实且刻薄，挖掘不为人知的槽点，拒绝公关辞令。
      3. 报告开头必须带有 [Adventure Team Confidential] 字样。
      4. 包含：整体初印象、客房细节毒舌点评、最终避雷建议。`;

      const chat = await model.generateContent(prompt);
      const response = await chat.response;
      setResult(response.text());
    } catch (error: any) {
      console.error(error);
      setResult(`调研失败：${error.message || "请检查 API Key 或插件版本"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto font-sans text-black min-h-screen">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-black italic tracking-tighter mb-2">ADVENTURE TEAM</h1>
        <p className="text-gray-500 uppercase tracking-widest text-xs">Hotel Intelligence Division</p>
      </header>
      
      <div className="flex flex-col gap-6 bg-gray-50 p-8 rounded-3xl shadow-inner border border-gray-200">
        <div>
          <label className="block text-sm font-bold mb-2 ml-1 text-gray-700">锁定调研目标</label>
          <input
            className="w-full border-2 border-gray-300 p-4 rounded-2xl focus:border-black outline-none transition-all text-lg shadow-sm"
            placeholder="例如：北京万达文华酒店"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold mb-2 ml-1 text-gray-700">设定调研员口音</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {accentOptions.map((opt) => (
              <button
                key={opt.label}
                onClick={() => setAccent(opt.value)}
                className={`p-3 border-2 rounded-xl text-sm font-bold transition-all ${
                  accent === opt.value 
                  ? "bg-black text-white border-black scale-105