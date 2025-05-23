import React, { useEffect, useReducer, useState } from 'react';
import PDFSectionSubscriber from '../sections/PDFSectionSubscriber';
import AgreeSection from '../components/AgreeSection';
import { getInitialData } from '../data/getInitialData';
import { formReducer } from '../reducers/formReducer';
import { validateForm } from '../utils/validateForm';
import SignatureModal from '../components/SignatureModal';

/**
 * 메인 계약서 페이지
 * - formReducer를 사용하여 상태 중앙 관리
 * - getInitialData()로 초기 상태 주입 (이후 fetch로 대체 가능)
 * - 섹션 컴포넌트에 상태와 dispatch 전달
 */


const TermsPage = () => {

  const [formState, dispatch] = useReducer(formReducer, {});
  const [invalidKeys, setInvalidKeys] = useState([]);
  const [showSignatureModal, setShowSignatureModal] = useState(false);

  // 이 과정을 통해 getInitialData()의 값이 formState의 초기 상태로 들어감
  useEffect(() => {
    // 나중에 fetch(`/api/user`) 등으로 대체할 예정
    const initialData = getInitialData(); // -> mock 사용자 데이터
    dispatch({ type: "SET_ALL", payload: initialData }); // formState에 넣기
  }, []);

  // 서명 입력 완료 시 처리
  const handleSignatureComplete = (signature) => {
    setShowSignatureModal(false); // 모달 닫기
    if (signature) {
      const keys = ['signature1', 'signature2']; // 적용할 서명 필드들
      keys.forEach(key => {
        dispatch({ type: "UPDATE_FIELD", key, value: signature });
      });
    }
  };

  const handleSubmit = () => {
    const errors = validateForm(formState);
    if (errors.length > 0) {
      alert("입력되지 않은 필수 항목이 있습니다.");
      setInvalidKeys(errors);
      return;
    }

    console.log("제출 데이터:", formState);
  };


  return (
    <div style={{ padding: '20px', background: '#f7f7f7' }}>
      {/* 가입자 정보 섹션 */}
      <PDFSectionSubscriber
        formState={formState}
        dispatch={dispatch}
        invalidKeys={invalidKeys}
        onOpenSignature={() => setShowSignatureModal(true)}
      />

      {/* 하단 버튼 섹션 */}
      <AgreeSection
        dispatch={dispatch}
        formState={formState}
        onOpenSignature={() => setShowSignatureModal(true)} // ← 모달 열기 함수 연결
      />

      {/* 서명 모달 표시 */}
      {showSignatureModal && (
        <SignatureModal onClose={handleSignatureComplete} />
      )}

      {/* 제출 버튼 */}
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <button
          onClick={handleSubmit}
          style={{
            padding: '14px 32px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          제출하기
        </button>
      </div>
    </div>
  );
};

export default TermsPage;
