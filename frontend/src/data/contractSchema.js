export const contractSchema = [
    {
      category: "가입자 정보",
      items: [
        { label: "이름", key: "name", type: "auto", editable: false },
        { label: "생년월일", key: "birth", type: "auto", editable: false },
        { label: "연락처", key: "phone", type: "auto", editable: true },
        { label: "이메일", key: "email", type: "input" },
      ]
    },
    {
      category: "요금납부정보",
      items: [
        { label: "요금납부 방법", key: "paymentMethod", type: "select", options: ["은행", "카드"] },
        { label: "은행명", key: "bankName", type: "input" },
        { label: "계좌번호", key: "accountNumber", type: "input" },
      ]
    },
    {
      category: "단말기 정보",
      items: [
        { label: "단말 모델명", key: "deviceModel", type: "select", options: ["Apple TV 4K", "B tv air"] },
        { label: "약정 개월 수", key: "contractMonths", type: "input" },
      ]
    },
    {
      category: "이용 동의",
      items: [
        { label: "개인정보 수집 이용 동의", key: "agreePrivacy", type: "checkbox" },
        { label: "고유식별정보 수집 동의", key: "agreeUniqueId", type: "checkbox" },
        { label: "신용정보 조회 동의", key: "agreeCredit", type: "checkbox" },
      ]
    }
  ];