/**
 * 서버에서 불러올 사용자 초기 데이터 (현재는 mock 형식)
 * type이 'auto' 또는 'autoEditable'인 필드에 기본값으로 사용됨
 * 이후 서버 API fetch로 교체 예정
 */
export const getInitialData = () => ({
    name: "홍길동",                    // 가입자명 (자동입력, 수정불가)
    birth: "1988-06-15",              // 생년월일 (자동입력, 수정불가)
    phone: "010-1234-5678",           // 연락처 (자동입력, 수정불가)
    address: "서울시 강남구 테헤란로 123",      // 설치 장소 (자동입력)
    taxInvoice: false,                // 세금계산서 발행 여부 (기본 체크)
    autoPaymentType: "",             // 자동이체 선택: 카드/계좌
    bank: "국민은행",                 // 은행명 (자동입력+수정가능)
    account: "123456-78-901234",     // 계좌번호
    holder: "홍길동",                 // 예금주
    cardNumber: "1234-5678-9012-3456", // 카드번호
    cardExpire: "",                  // 유효기간
    cardHolder: "홍길동",             // 카드주
    email: "kafoo0105@gmail.com",    // 이메일
    agreePayment: false              // 예금주 동의 체크
  });
  