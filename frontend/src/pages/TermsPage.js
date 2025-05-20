import React, { useEffect, useReducer, useState } from 'react';
import PDFSectionSubscriber from '../sections/PDFSectionSubscriber';
import { getInitialData } from '../data/getInitialData';
import { formReducer } from '../reducers/formReducer';
import { validateForm } from '../utils/validateForm';

/**
 * 메인 계약서 페이지
 * - formReducer를 사용하여 상태 중앙 관리
 * - getInitialData()로 초기 상태 주입 (이후 fetch로 대체 가능)
 * - 섹션 컴포넌트에 상태와 dispatch 전달
 */
const TermsPage = () => {

    const [formState, dispatch] = useReducer(formReducer, {});
    const [invalidKeys, setInvalidKeys] = useState([]);

    // 이 과정을 통해 getInitialData()의 값이 formState의 초기 상태로 들어감
    useEffect(() => {
        // 나중에 fetch(`/api/user`) 등으로 대체할 예정
        const initialData = getInitialData(); // -> mock 사용자 데이터
        dispatch({ type: "SET_ALL", payload: initialData }); // formState에 넣기
    }, []);


    const handleSubmit = () => {
        const errors = validateForm(formState);
        if (errors.length > 0) {
            alert("입력되지 않은 필수 항목이 있습니다.");
            setInvalidKeys(errors);
            return;
        }

        console.log("✅ 제출 데이터:", formState);
    };


    return (
        <div style={{ padding: '20px', background: '#f7f7f7' }}>
      <PDFSectionSubscriber
        formState={formState}
        dispatch={dispatch}
        invalidKeys={invalidKeys}
      />

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
