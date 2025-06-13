export const getTemplateInfo = (caseNumber, carrier) => {
  if (!carrier) {
    throw new Error('통신사를 선택하지 않았습니다.');
  }

  switch (carrier) {
    case 'SKT':
      if (!caseNumber || caseNumber < 1 || caseNumber > 12) {
        throw new Error('올바르지 않은 Case 번호입니다.');
      }
      return {
        workflowName: `서비스이용계약서_${caseNumber}`,
        templateId: 34 + caseNumber // 35 ~ 46
      };

    case 'KT':
      if (!caseNumber || caseNumber < 1 || caseNumber > 12) {
        throw new Error('올바르지 않은 Case 번호입니다.');
      }
      return {
        workflowName: `KT신청서_${caseNumber}`,
        templateId: 60 + caseNumber // 61 ~ 72
      };

    case 'LG':
      if (!caseNumber || caseNumber < 1 || caseNumber > 12) {
        throw new Error('올바르지 않은 Case 번호입니다.');
      }
      return {
        workflowName: `U+신청서_${caseNumber}`,
        templateId: 48 + caseNumber // 49 ~ 60
      };

    default:
      throw new Error(`지원되지 않는 통신사입니다: ${carrier}`);
  }
};
