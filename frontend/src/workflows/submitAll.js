import { startEsignonWorkflow } from '../api/esignon';
import {
  SERVICE_TEMPLATE_ID,
  PRIVACY_TEMPLATE_ID,
  SWITCH_TEMPLATE_ID
} from '../data/templateInfo';
import { generateFieldList } from '../utils/fieldMapper';

export const submitAllDocuments = async (formState) => {
  const { name, email } = formState;
  const results = [];

  const fieldList = generateFieldList(formState, '서비스이용계약서');

  const recipient = {
    order: 1,
    email,
    name
  };

  const res = await startEsignonWorkflow({
    workflowName: '서비스이용계약서',
    templateId: SERVICE_TEMPLATE_ID,
    recipient,
    fieldList
  });

  if (res.sign_url) results.push(res.sign_url);
  return results;
};