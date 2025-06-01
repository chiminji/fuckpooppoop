import React, { useState, useContext } from 'react';
import { AuthContext } from './components/AuthProvider';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

const options = {
  shape: {
    label: '形狀（布里斯托分類）',
    choices: {
      1: '硬塊狀，像堅果',
      2: '香腸狀，表面凹凸不平',
      3: '香腸狀，表面有裂紋',
      4: '光滑柔軟的香腸或蛇狀',
      5: '柔軟塊狀，邊緣光滑',
      6: '糊狀，邊緣不規則',
      7: '水狀，完全無固體',
    },
  },
  color: {
    label: '顏色',
    choices: {
      brown: '棕色 / 黃褐色（正常）',
      green: '綠色',
      black: '黑色',
      red: '紅色',
      white: '白色 / 灰色',
    },
  },
  hardness: {
    label: '硬度',
    choices: {
      1: '乾硬塊狀（便秘）',
      2: '小塊稍乾',
      3: '表面有小凹痕',
      4: '香蕉狀（正常）',
      5: '斷裂柔軟塊狀',
      6: '鬆軟或糊狀',
      7: '全水狀',
    },
  },
  smell: {
    label: '氣味',
    choices: {
      normal: '正常氣味',
      bad: '惡臭',
      sour: '酸味',
      burnt: '燒焦味',
      fishy: '腥味黑便',
    },
  },
  float: {
    label: '浮沉性',
    choices: {
      sink: '沉底（正常）',
      float: '漂浮（脂肪吸收不良）',
    },
  },
};

const descriptions = {
  shape: {
    1: '第1型：糞便乾硬成塊，可能表示嚴重便秘與水分不足。',
    2: '第2型：表面不平的香腸狀，代表輕微便秘。',
    3: '第3型：有裂紋香腸狀，屬於健康狀態。',
    4: '第4型：光滑柔軟香腸狀，是最理想的形狀。',
    5: '第5型：柔軟塊狀，代表水分較多但可接受。',
    6: '第6型：糊狀邊緣不清，可能為輕微腹瀉。',
    7: '第7型：完全水狀，表示嚴重腹瀉或腸胃道問題。',
  },
  color: {
    brown: '棕褐色是正常糞便顏色，來自膽紅素代謝。',
    green: '綠色可能與飲食或腸道過快蠕動有關。',
    black: '黑色可能表示上消化道出血，需警惕。',
    red: '紅色可能與飲食或出血相關，請觀察來源。',
    white: '白/灰色可能膽汁不足，應檢查肝膽功能。',
  },
  hardness: {
    1: '乾硬塊狀通常表示便秘，可能缺水與纖維不足。',
    2: '小塊稍乾，可能是輕度便秘。',
    3: '表面有小凹痕，屬於正常範圍。',
    4: '香蕉狀是排便最佳形態，柔軟且順暢。',
    5: '斷裂柔軟塊狀也可接受，可能水分略多。',
    6: '鬆軟糊狀是腹瀉前兆，可能腸道敏感。',
    7: '全水狀需注意腸道感染或食物中毒。',
  },
  smell: {
    normal: '正常便便略帶腸氣味，代表菌群正常。',
    bad: '惡臭可能來自高蛋白飲食或菌群失衡。',
    sour: '酸味可能腸道消化不良，建議補充益生菌。',
    burnt: '燒焦味代表小腸吸收功能可能較弱。',
    fishy: '腥味黑便可能有內部出血，應儘速就醫。',
  },
  float: {
    sink: '沉底代表糞便密度正常，消化吸收良好。',
    float: '漂浮可能脂肪吸收不良或有氣體過多。',
  },
};

export default function App() {
  const { user, loading } = useContext(AuthContext);
  const [input, setInput] = useState({
    shape: '',
    color: '',
    hardness: '',
    smell: '',
    float: '',
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setShowResult(false);
  };

  const isComplete = Object.values(input).every((v) => v !== '');

  const generateAdvice = () => {
    const summary = [
      descriptions.shape[input.shape],
      descriptions.color[input.color],
      descriptions.hardness[input.hardness],
      descriptions.smell[input.smell],
      descriptions.float[input.float],
    ];
    return summary.join('\n');
  };

  const handleRegister = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const saveRecord = async () => {
    await addDoc(collection(db, 'poopDiary'), {
      uid: user.uid,
      created: Timestamp.now(),
      input,
    });
    alert('✅ 已儲存紀錄');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>💩 腸道健康小幫手</h1>
      {loading ? (
        <p>載入中...</p>
      ) : user ? (
        <div>
          👋 歡迎 {user.email}
          <button onClick={handleLogout}>登出</button>
        </div>
      ) : (
        <div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="密碼" />
          <button onClick={handleLogin}>登入</button>
          <button onClick={handleRegister}>註冊</button>
        </div>
      )}

      {user && (
        <>
          {Object.entries(options).map(([key, opt]) => (
            <div key={key} style={{ marginTop: '10px' }}>
              <label>{opt.label}：</label>
              <select name={key} value={input[key]} onChange={handleChange}>
                <option value="">-- 請選擇 --</option>
                {Object.entries(opt.choices).map(([val, label]) => (
                  <option key={val} value={val}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {isComplete && (
            <>
              <button onClick={() => setShowResult(true)} style={{ marginTop: '15px' }}>🔍 產生分析</button>
              <button onClick={saveRecord} style={{ marginLeft: '10px' }}>💾 儲存紀錄</button>
            </>
          )}

          {showResult && (
            <div style={{ whiteSpace: 'pre-wrap', marginTop: '20px', background: '#eef', padding: '10px' }}>
              {generateAdvice()}
            </div>
          )}
        </>
      )}
    </div>
  );
}
