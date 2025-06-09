export const getTemplateInfo = (caseNumber) => {
    if (!caseNumber || caseNumber < 1 || caseNumber > 12) {
      throw new Error('올바르지 않은 Case 번호입니다.');
    }
    return {
      workflowName: `서비스이용계약서_${caseNumber}`,
      templateId: 34 + caseNumber,
    };
  };  