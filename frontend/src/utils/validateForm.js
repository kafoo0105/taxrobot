/**
 * 필수 항목이 누락된 키 목록을 반환하는 함수
 * 이후 항목별 required 설정도 가능하지만 현재는 하드코딩
 * formState는 매개변수, TermsPage.js의 formState 상태를 넘겨받을 부분
 */
export const validateForm = (formState) => {
  const requiredKeys = [
    'name',
    'birth',
    'phone',
    'address',
    'autoPaymentType',
    'bank',
    'account',
    'holder',
    'cardNumber',
    'cardExpire',
    'cardHolder',
    'email',
    'agreePayment'
  ];

  // formState에서 필수 입력값이 빠진 항목만 찾아냄
  const emptyFields = requiredKeys.filter((key) => {
    const value = formState[key];
    if (typeof value === 'boolean') return !value;
    if (typeof value === 'string') return value.trim() === '';
    return !value;
  });

  return emptyFields;
};
