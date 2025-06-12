import { startEsignonWorkflow } from '../api/esignon';
import { getTemplateInfo } from '../utils/templateMapper';
import { generateFieldList } from '../utils/fieldMapper';

export const submitAllDocuments = async (formState) => {
  const { name, email, caseNumber } = formState;
  const results = [];

  const { workflowName, templateId } = getTemplateInfo(formState.caseNumber, formState.carrier);
  const fieldList = generateFieldList(formState, '서비스이용계약서');

  const recipient = {
    order: 1,
    email,
    name
  };

  const res = await startEsignonWorkflow({
    workflowName,
    templateId,
    recipient,
    fieldList
  });

  // 템플릿 ID가 아직 정해지지 않은 경우
  if (!templateId) {
    alert('해당 통신사의 템플릿 ID가 아직 설정되지 않았습니다.');
    return [];
  }

  if (res.sign_url) results.push(res.sign_url);
  return results;
};
