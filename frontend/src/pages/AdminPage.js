import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();

  const [caseNumber, setCaseNumber] = useState('');
  const [carrier, setCarrier] = useState('');
  const [isCorporate, setIsCorporate] = useState(false);

  const handleNext = () => {
    if (!caseNumber || !carrier) {
      alert('Case 번호와 통신사를 모두 선택해 주세요.');
      return;
    }

    navigate('/terms', {
      state: {
        caseNumber: Number(caseNumber),
        carrier,
        isCorporate
      }
    });
  };

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>관리자 설정</h2>

      <div style={{ marginBottom: '20px' }}>
        <label>Case 번호 선택:</label>
        <select value={caseNumber} onChange={(e) => setCaseNumber(e.target.value)}>
          <option value="">선택</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Case {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>통신사 선택:</label>
        <select value={carrier} onChange={(e) => setCarrier(e.target.value)}>
          <option value="">선택</option>
          <option value="SKT">SKT</option>
          <option value="KT">KT</option>
          <option value="LG">LG</option>
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>
          <input
            type="checkbox"
            checked={isCorporate}
            onChange={(e) => setIsCorporate(e.target.checked)}
          />
          사업자 (법인) 여부
        </label>
      </div>

      <button onClick={handleNext} style={{ padding: '10px 20px' }}>
        다음
      </button>
    </div>
  );
};

export default AdminPage;
