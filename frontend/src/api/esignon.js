export const createEsignonLink = async () => {
  try {
    const res = await fetch('https://docs.esignon.net/api/v3/link/start?offset=%2B09%3A00', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `esignon ${process.env.REACT_APP_ESIGNON_TOKEN}`
      },
      body: JSON.stringify({
        language: 'ko',
        link_max_count: 1,
        enable_cert_mobile: false,
        enable_duplicate_sign: false,
        link_manage_name: "서비스이용계약서", // 관리용 이름
        template_id: 492,
        expiry_date: "2027-01-01 00:00:00"
      })
    });

    return await res.json();
  } catch (err) {
    console.error('이싸인온 링크 생성 실패:', err);
    throw err;
  }
};
