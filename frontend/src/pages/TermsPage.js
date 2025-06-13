import React, { useEffect, useReducer, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PDFSectionSubscriber from '../sections/PDFSectionSubscriber';
import { getInitialData } from '../data/getInitialData';
import { formReducer } from '../reducers/formReducer';
import { validateForm } from '../utils/validateForm';
import AgreementRow from '../components/AgreementRow';
import { submitAllDocuments } from '../workflows/submitAll';

/**
 * 계약서 페이지: 입력된 formState를 이싸인온 필드에 매핑하여 전자서명 생성
 */
const TermsPage = () => {
  const location = useLocation();
  const adminConfig = location.state;
  const carrier = adminConfig?.carrier || 'SKT';

  const [formState, dispatch] = useReducer(formReducer, {});
  const [invalidKeys, setInvalidKeys] = useState([]);

  useEffect(() => {
    const initialData = getInitialData(adminConfig); // 현재는 mock 데이터
    dispatch({ type: "SET_ALL", payload: initialData });
  }, []);

  const handleSubmit = async () => {
    const errors = validateForm(formState);
    if (errors.length > 0) {
      alert("입력되지 않은 필수 항목이 있습니다.");
      setInvalidKeys(errors);
      return;
    }

    if (!formState.caseNumber) {
      alert("Case 번호를 선택해주세요.");
      return;
    }

    try {
      const urls = await submitAllDocuments(formState);

      if (urls.length > 0) {
        urls.forEach((url, idx) => {
          window.open(url, `_blank${idx}`);
        });
      } else {
        alert("서명 링크 생성 실패");
      }
    } catch (err) {
      alert('요청 중 오류 발생');
      console.error(err);
    }
  };


  return (
    <div style={{ padding: '20px', background: '#f7f7f7' }}>
      <PDFSectionSubscriber
        formState={formState}
        dispatch={dispatch}
        invalidKeys={invalidKeys}
      />

      <AgreementRow
        title={`${carrier} 신청서`}
        pdfUrl={`/pdfs/${carrier}.pdf`}
        value={formState.serviceAgreement}
        onChange={(val) =>
          dispatch({ type: 'UPDATE_FIELD', key: 'serviceAgreement', value: val })
        }
      />

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
