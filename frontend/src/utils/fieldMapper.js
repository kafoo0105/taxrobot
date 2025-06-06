export const generateFieldList = (formState, type) => {
  switch (type) {
    case '서비스이용계약서':
      return [
        { name: '가입자명', value: formState.name },
        { name: '생년월일', value: formState.birth },
        { name: '세금계산서', value: formState.taxInvoice ? 'Y' : 'N' },
        { name: '설치장소', value: formState.address },
        { name: '이동전화연락처', value: formState.phone },
        { name: '예금주', value: formState.holder },
        { name: '카드번호', value: formState.account },
        { name: '이메일', value: formState.email },
        { name: 'name_1', value: formState.name },
        { name: 'name_2', value: formState.name },
        { name: 'name_3', value: formState.name },
        { name: '번호이동가입정보', value: formState.phone },
        { name: '가액', value: formState.price },
      ];
    case '개인정보활용동의서':
    case '전환신청서':
      return [{ name: '가입자명', value: formState.name }];
    default:
      return [];
  }
};