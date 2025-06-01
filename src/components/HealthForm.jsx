import React, { useState } from 'react';

export default function HealthForm() {
  const [shape, setShape] = useState('');
  const [color, setColor] = useState('');
  const [hardness, setHardness] = useState('');
  const [smell, setSmell] = useState('');
  const [floaty, setFloaty] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    const advice = {
      shape: shape === '1' ? '便秘，建議多喝水、多吃纖維。' : '形狀良好。',
      color: color === 'black' ? '可能腸胃出血，請就醫。' : '顏色正常。',
      hardness: hardness === '1' ? '便秘可能，飲食需調整。' : '硬度正常。',
      smell: smell === 'fishy' ? '腸胃異常，請注意飲食。' : '氣味正常。',
      floaty: floaty === 'float' ? '可能有氣體或油脂過多。' : '正常沉底。'
    };
    setResult(advice);
  };

  const resetForm = () => {
    setShape('');
    setColor('');
    setHardness('');
    setSmell('');
    setFloaty('');
    setResult(null);
  };

  const allSelected = shape && color && hardness && smell && floaty;

  return (
    <div>
      <h2>請輸入你的便便狀況：</h2>
      <select value={shape} onChange={(e) => { setShape(e.target.value); setResult(null); }}>
        <option value="">形狀</option>
        <option value="1">硬塊狀</option>
        <option value="2">香腸狀有凹凸</option>
        <option value="3">正常香腸狀</option>
        <option value="4">柔軟蛇狀</option>
        <option value="5">柔塊狀</option>
        <option value="6">糊狀</option>
        <option value="7">水狀</option>
      </select>
      <select value={color} onChange={(e) => { setColor(e.target.value); setResult(null); }}>
        <option value="">顏色</option>
        <option value="brown">棕色</option>
        <option value="green">綠色</option>
        <option value="black">黑色</option>
        <option value="red">紅色</option>
        <option value="yellow">黃色</option>
        <option value="white">白色</option>
      </select>
      <select value={hardness} onChange={(e) => { setHardness(e.target.value); setResult(null); }}>
        <option value="">硬度</option>
        <option value="1">乾硬</option>
        <option value="2">中等</option>
        <option value="3">柔軟</option>
        <option value="4">糊狀</option>
        <option value="5">水狀</option>
      </select>
      <select value={smell} onChange={(e) => { setSmell(e.target.value); setResult(null); }}>
        <option value="">氣味</option>
        <option value="normal">正常</option>
        <option value="stinky">惡臭</option>
        <option value="sour">酸味</option>
        <option value="burnt">燒焦</option>
        <option value="fishy">腥味</option>
      </select>
      <select value={floaty} onChange={(e) => { setFloaty(e.target.value); setResult(null); }}>
        <option value="">漂浮狀態</option>
        <option value="float">漂浮</option>
        <option value="sink">沉底</option>
      </select>
      {allSelected && (
        <div>
          <button onClick={handleSubmit}>分析健康狀況</button>
          <button onClick={resetForm}>重設</button>
        </div>
      )}
      {result && (
        <div>
          <h3>健康分析結果：</h3>
          <ul>
            <li>形狀：{result.shape}</li>
            <li>顏色：{result.color}</li>
            <li>硬度：{result.hardness}</li>
            <li>氣味：{result.smell}</li>
            <li>漂浮：{result.floaty}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
