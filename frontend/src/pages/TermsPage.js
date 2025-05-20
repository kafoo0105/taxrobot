// src/pages/TermsPage.js

import React, { useEffect, useReducer } from 'react';
import PDFSectionSubscriber from '../sections/PDFSectionSubscriber';
import { getInitialData } from '../data/getInitialData';
import { formReducer } from '../reducers/formReducer';

/**
 * 메인 계약서 페이지
 * - formReducer를 사용하여 상태 중앙 관리
 * - getInitialFormData()로 초기 상태 주입 (이후 fetch로 대체 가능)
 * - 섹션 컴포넌트에 상태와 dispatch 전달
 */
const TermsPage = () => {
  const [formState, dispatch] = useReducer(formReducer, {});

  useEffect(() => {
    // 나중에 fetch(`/api/user`) 로 대체 가능
    const initialData = getInitialData();
    dispatch({ type: "SET_ALL", payload: initialData });
  }, []);

  return (
    <div style={{ padding: '20px', background: '#f7f7f7' }}>
      <PDFSectionSubscriber formState={formState} dispatch={dispatch} />
    </div>
  );
};

export default TermsPage;
