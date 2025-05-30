// src/pages/TermsPage.js

import React, { useEffect, useReducer, useState } from 'react';
import PDFSectionSubscriber from '../sections/PDFSectionSubscriber';
import AgreeSection from '../components/AgreeSection';
import { getInitialData } from '../data/getInitialData';
import { formReducer } from '../reducers/formReducer';
import { validateForm } from '../utils/validateForm';
import AgreementRow from '../components/AgreementRow';


/**
 * 계약서 페이지: 입력된 formState를 이싸인온 필드에 매핑하여 전자서명 생성
 */
const TermsPage = () => {
  const [formState, dispatch] = useReducer(formReducer, {});
  const [invalidKeys, setInvalidKeys] = useState([]);

  // 초기 데이터 로드
  useEffect(() => {
    const initialData = getInitialData(); // mock 데이터
    dispatch({ type: "SET_ALL", payload: initialData });
  }, []);

  // 이싸인온 필드 이름에 맞춰 formState 값을 매핑
  const generateFieldList = (formState) => {
    return [
      { name: '가입자명', value: formState.name },
      { name: '생년월일', value: formState.birth },
      { name: '세금계산서', value: formState.taxInvoice ? 'Y' : 'N' },
      { name: '설치장소', value: formState.address },
      { name: '이동전화연락처', value: formState.phone },
      { name: '예금주', value: formState.holder }
    ];
  };

  // 제출하기 클릭 시: 유효성 검사 + 이싸인온 API 호출
  const handleSubmit = async () => {
    const errors = validateForm(formState);
    if (errors.length > 0) {
      alert("입력되지 않은 필수 항목이 있습니다.");
      setInvalidKeys(errors);
      return;
    }

    const fieldList = generateFieldList(formState);

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'esignon q9R2jlRRiR12/ODR9w14xlk6sFjPm6oRr7W5IZSwPmgdJyPiP+suE4h5FnPPvqdAJgFCpZI16TOiz+BlBYDlx6PsadAO+PhwVq+eKC7HzcBp/L5z2grRi3vKjoOc8Nw9'
      },
      body: JSON.stringify({
        language: 'ko',
        is_preview: false,
        workflow_name: 'SKT',
        template_id: 488,
        recipient_list: [
          {
            order: 1,
            email: formState.email,
            name: formState.name
          }
        ],
        field_list: fieldList
      })
    };

    try {
      const res = await fetch('https://docs.esignon.net/api/v3/workflows/start?offset=%2B09%3A00', options);
      const data = await res.json();

      if (data.token) {
        const signUrl = `https://docs.esignon.net/mail/sign?token=${data.token}`;
        window.open(signUrl, '_blank'); // ✅ 새 창으로 열기
      } else {
        alert(data.header?.result_msg || '서명 URL 생성 실패');
      }
    } catch (err) {
      console.error('서명 요청 실패:', err);
      alert('서명 요청 중 오류 발생');
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
        title="서비스 이용계약서"
        pdfUrl="/pdfs/service.pdf"
        value={formState.serviceAgreement}
        onChange={(val) =>
          dispatch({ type: 'UPDATE_FIELD', key: 'serviceAgreement', value: val })
        }
      />

      <AgreementRow
        title="인터넷 서비스 및 유료방송결합상품 전환 신청서"
        pdfUrl="/pdfs/switch.pdf"
        value={formState.switchAgreement}
        onChange={(val) =>
          dispatch({ type: 'UPDATE_FIELD', key: 'switchAgreement', value: val })
        }
      />

      <AgreementRow
        title="개인정보활용동의서"
        pdfUrl="/pdfs/privacy.pdf"
        value={formState.personalAgreement}
        onChange={(val) =>
          dispatch({ type: 'UPDATE_FIELD', key: 'personalAgreement', value: val })
        }
      />

      <AgreeSection
        dispatch={dispatch}
        formState={formState}
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
