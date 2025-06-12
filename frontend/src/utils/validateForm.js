export const validateForm = (formState) => {
  const { autoPaymentType } = formState;

  // 공통 필수 항목
  let requiredKeys = [
    'name',
    'birth',
    'phone',
    'address',
    'autoPaymentType',
    'email',
    'agreePayment'
  ];

  // 조건부 필수 항목
  if (autoPaymentType === '계좌') {
    requiredKeys.push('bank', 'account', 'holder');
  }

  if (autoPaymentType === '카드') {
    requiredKeys.push('cardNumber', 'cardExpire', 'cardHolder', 'cardCompany');
  }

  // 누락된 항목 필터링
  const emptyFields = requiredKeys.filter((key) => {
    const value = formState[key];
    if (typeof value === 'boolean') return !value;
    if (typeof value === 'string') return value.trim() === '';
    return !value;
  });

  return emptyFields;
};

