// 필드별 형식 검사 함수 정의
const regexValidators = {
    email: (value) => /^\S+@\S+\.\S+$/.test(value),
    phone: (value) => /^01[0-9]-\d{3,4}-\d{4}$/.test(value),
    birth: (value) => /^\d{4}-\d{2}-\d{2}$/.test(value),
  };
  
  // 유효성 검사 함수
  // @param schema: contractSchema 전체
  // @param formData: 현재 상태 값
  // @returns: true (성공) or 에러 메시지 배열
  export const validateForm = (schema, formData) => {
    const errors = [];
  
    schema.forEach((section) => {
      section.items.forEach((item) => {
        const value = formData[item.key];
  
        // 1. 비어 있으면 에러
        if (
          (item.type === "input" || item.type === "auto" || item.type === "today") &&
          (!value || value.trim() === "")
        ) {
          errors.push(`"${item.label}" 항목을 입력해 주세요.`);
        }
  
        // 2. checkbox가 false일 경우도 불통과
        if (item.type === "checkbox" && !value) {
          errors.push(`"${item.label}" 항목에 동의해 주세요.`);
        }
  
        // 3. 이메일/전화번호/생년월일 등에 대한 형식 검사
        if (item.key === "email" && value && !regexValidators.email(value)) {
          errors.push(`"${item.label}" 형식이 잘못되었습니다.`);
        }
        if (item.key === "phone" && value && !regexValidators.phone(value)) {
          errors.push(`"${item.label}" 형식이 잘못되었습니다. (예: 010-1234-5678)`);
        }
        if (item.key === "birth" && value && !regexValidators.birth(value)) {
          errors.push(`"${item.label}" 형식이 잘못되었습니다. (예: 1990-01-01)`);
        }
      });
    });
  
    return errors.length === 0 ? true : errors;
  };
  