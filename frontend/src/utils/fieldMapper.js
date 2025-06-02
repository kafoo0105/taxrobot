export const generateFieldList = (formState, type) => {
    switch (type) {
      case '서비스이용계약서':
        return [
          { name: '가입자명', value: formState.name },
          { name: '생년월일', value: formState.birth },
          { name: '이동전화연락처', value: formState.phone },
          { name: '설치장소', value: formState.address },
          { name: '예금주', value: formState.holder },
          { name: '세금계산서', value: formState.taxInvoice ? 'Y' : 'N' }
        ];
      case '개인정보활용동의서':
      case '전환신청서':
        return [];
      default:
        return [];
    }
  };