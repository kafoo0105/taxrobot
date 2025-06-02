import React, { useEffect, useReducer, useState } from 'react';
import PDFSectionSubscriber from '../sections/PDFSectionSubscriber';
import AgreeSection from '../components/AgreeSection';
import { getInitialData } from '../data/getInitialData';
import { formReducer } from '../reducers/formReducer';
import { validateForm } from '../utils/validateForm';
import AgreementRow from '../components/AgreementRow';
import { generateFieldList } from '../utils/fieldMapper';
import { startEsignonWorkflow } from '../api/esignon';


/**
 * 계약서 페이지: 입력된 formState를 이싸인온 필드에 매핑하여 전자서명 생성
 */
const TermsPage = () => {
  const [formState, dispatch] = useReducer(formReducer, {});
  const [invalidKeys, setInvalidKeys] = useState([]);

  useEffect(() => {
    const initialData = getInitialData(); // 현재는 mock 데이터
    dispatch({ type: "SET_ALL", payload: initialData });
  }, []);

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

  const handleSubmit = async () => {
    const errors = validateForm(formState);
    if (errors.length > 0) {
      alert("입력되지 않은 필수 항목이 있습니다.");
      setInvalidKeys(errors);
      return;
    }

    const fieldList = generateFieldList(formState, '서비스이용계약서');

    const response = await startEsignonWorkflow({
      workflowName: "서비스이용계약서_미림미디어랩_2025-05-31 - 복사본",
      templateId: 492,
      recipient: {
        order: 1,
        email: formState.email,
        name: formState.name
      },
      fieldList
    });

    if (response.token) {
      const signUrl = `https://docs.esignon.net/mail/sign?token=${response.token}`;
      console.error('응답 본문:', response);
      window.open(signUrl, '_blank');
    } else {
      console.error('응답 본문:', response);
      alert(response.header?.result_msg || '서명 URL 생성 실패');
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
