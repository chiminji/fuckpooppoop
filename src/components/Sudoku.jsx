import React, { useEffect } from 'react';

export default function Sudoku() {
  useEffect(() => {
    const timer = setTimeout(() => {
      alert("⏰ 你已經玩太久了，該離開馬桶囉！");
    }, 10 * 60 * 1000); // 10 分鐘

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>🧩 數獨遊戲（廁所娛樂區）</h2>
      <iframe
        src="https://sudoku.com"
        width="100%"
        height="600px"
        title="Sudoku Game"
        style={{ border: 'none' }}
      ></iframe>
    </div>
  );
}
