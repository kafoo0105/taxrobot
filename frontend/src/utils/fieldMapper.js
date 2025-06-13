const formatToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}년 ${month}월 ${day}일`;
};

export const generateFieldList = (formState, type) => {
  const formattedDate = formatToday();

  const baseFields = [
    { name: '가입자명', value: formState.name },
    { name: '생년월일', value: formState.birth },
    { name: '생년월일2', value: formState.birth },
    { name: '관계', value: formState.relation },
    { name: '세금계산서', value: formState.taxInvoice ? 'Y' : 'N' },
    { name: '설치장소', value: formState.address },
    { name: '이동전화연락처', value: formState.phone },
    { name: '핸드폰', value: formState.phone },
    { name: '예금주', value: formState.holder },
    { name: '이메일', value: formState.email },
    { name: 'name_1', value: formState.name },
    { name: 'name_2', value: formState.name },
    { name: 'name_3', value: formState.name },
    { name: 'name_4', value: formState.name },
    { name: 'name_5', value: formState.name },
    { name: 'name_6', value: formState.name },
    { name: 'name_7', value: formState.name },
    { name: 'name_8', value: formState.name },
    { name: 'name_9', value: formState.name },
    { name: 'name_10', value: formState.name },
    { name: 'name_11', value: formState.name },
    { name: 'name_12', value: formState.name },
    { name: 'name_13', value: formState.name },
    { name: 'name_14', value: formState.name },
    { name: 'name_15', value: formState.name },
    { name: 'name_16', value: formState.name },
    { name: 'name_17', value: formState.name },
    { name: 'name_18', value: formState.name },
    { name: 'name_19', value: formState.name },
    { name: 'name_20', value: formState.name },
    { name: 'name_21', value: formState.name },
    { name: '이동전화명의자성명', value: formState.name },
    { name: '신청일_1', value: formattedDate },
    { name: '신청일_2', value: formattedDate },
    { name: '신청일_3', value: formattedDate },
    { name: '신청일_4', value: formattedDate },
    { name: '신청일_5', value: formattedDate },
    {
      name: '고객정보_남',
      value: formState.gender === '남' ? 'Y' : 'N'
    },
    {
      name: '고객정보_여',
      value: formState.gender === '여' ? 'Y' : 'N'
    },
  ];

  // 자동이체 방식
  let paymentFields = [];
  if (formState.autoPaymentType === '계좌') {
    paymentFields = [
      { name: '이체', value: 'Y' },
      { name: '카드번호', value: formState.account },
      { name: '은행', value: formState.cardCompany }
    ];
  } else if (formState.autoPaymentType === '카드') {
    paymentFields = [
      { name: '신용카드', value: 'Y' },
      { name: '카드번호', value: formState.cardNumber },
      { name: '카드유효기간', value: formState.cardExpire },
      { name: '은행', value: formState.cardCompany }
    ];
  }

  switch (type) {
    case '서비스이용계약서':
      return [...baseFields, ...paymentFields];
    default:
      return [];
  }
};
