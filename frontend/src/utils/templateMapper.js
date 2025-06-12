export const getTemplateInfo = (caseNumber, carrier) => {
  if (!caseNumber || caseNumber < 1 || caseNumber > 12) {
    throw new Error('올바르지 않은 Case 번호입니다.');
  }

  // 기본값은 SKT (기존 로직 유지)
  if (!carrier || carrier === 'SKT') {
    return {
      workflowName: `서비스이용계약서_${caseNumber}`,
      templateId: 34 + caseNumber // 35~46
    };
  }

  // KT, LG는 이름만 설정 (템플릿 ID는 향후 정의)
  if (carrier === 'KT') {
    return {
      workflowName: `KT신청서_${caseNumber}`,
      templateId: null // 추후 매핑 필요
    };
  }

  if (carrier === 'LG') {
    return {
      workflowName: `U+신청서_${caseNumber}`,
      templateId: null // 추후 매핑 필요
    };
  }

  // 예외 처리
  throw new Error(`지원되지 않는 통신사입니다: ${carrier}`);
};
