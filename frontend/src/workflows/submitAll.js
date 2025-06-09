import { startEsignonWorkflow } from '../api/esignon';
import { getTemplateInfo } from '../utils/templateMapper';
import { generateFieldList } from '../utils/fieldMapper';

export const submitAllDocuments = async (formState) => {
  const { name, email, caseNumber } = formState;
  const results = [];

  const { workflowName, templateId } = getTemplateInfo(caseNumber);
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

  if (res.sign_url) results.push(res.sign_url);
  return results;
};
