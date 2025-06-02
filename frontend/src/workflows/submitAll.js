import { startWorkflow } from '../api/esignon';
import {
  SERVICE_TEMPLATE_ID,
  PRIVACY_TEMPLATE_ID,
  SWITCH_TEMPLATE_ID
} from '../data/templateInfo';

/**
 * 세 가지 PDF 문서를 이싸인온 API를 통해 각각 전송하는 함수
 * - 서비스 이용계약서: 사용자 입력 필드 포함
 * - 개인정보 활용 동의서: 이름만 포함
 * - 전환 신청서: 이름만 포함
 *
 * @param {Object} formState - 사용자 입력 상태 객체
 * @returns {Promise<Array<string>>} - 생성된 각 문서의 서명 토큰 리스트
 */
export const submitAllDocuments = async (formState) => {
  const { name, email } = formState;

  // 서비스 이용계약서
  const serviceFields = [
    { name: '가입자명', value: name },
    { name: '생년월일', value: formState.birth },
    { name: '설치장소', value: formState.address },
    { name: '이동전화연락처', value: formState.phone },
    { name: '이메일', value: formState.email },
    { name: '예금주', value: formState.holder }
  ];

  // 이름만 전달
  const basicFields = [
    { name: '가입자명', value: name }
  ];

  // 토큰 리스트 초기화
  const tokens = [];

  // 각 문서를 개별 워크플로우로 시작하고 token 저장
  tokens.push(
    await startWorkflow({
      name,
      email,
      fieldList: serviceFields,
      templateId: SERVICE_TEMPLATE_ID
    })
  );

  tokens.push(
    await startWorkflow({
      name,
      email,
      fieldList: basicFields,
      templateId: PRIVACY_TEMPLATE_ID
    })
  );

  tokens.push(
    await startWorkflow({
      name,
      email,
      fieldList: basicFields,
      templateId: SWITCH_TEMPLATE_ID
    })
  );

  return tokens;
};
