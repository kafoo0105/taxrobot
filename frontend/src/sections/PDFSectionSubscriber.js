import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

/**
 * PDF 기반 '가입자 정보' 섹션을 현대적으로 재디자인
 * - 모바일 뷰에 맞춘 카드형 구조
 * - 입력 조건 (readonly, editable 등)은 엑셀 기준에 따라 반영
 */
const PDFSectionSubscriber = ({ formState, dispatch, invalidKeys = [], onOpenSignature }) => {
  const handleChange = (key, value) => {
    dispatch({ type: "UPDATE_FIELD", key, value });
  };

  const isInvalid = (key) => invalidKeys.includes(key);
  const [showHelp, setShowHelp] = useState(false);


  return (
    <Card>
      <Header>
        <Title>가입자 정보</Title>
        <div>
          <label>
            <input
              type="checkbox"
              checked={formState.taxInvoice}
              onChange={e => handleChange('taxInvoice', e.target.checked)}
            />
            세금계산서 발행
          </label>
          <HelpToggle onClick={() => setShowHelp(prev => !prev)}>
            ⓘ
          </HelpToggle>
          {showHelp && <HelpText>세금계산서가 필요한 사업자 고객만 체크해 주세요.</HelpText>}
        </div>
      </Header>

      <Grid>
        <FormGroup>
          <Label>가입자명</Label>
          <ReadOnly>{formState.name}</ReadOnly>
        </FormGroup>

        <FormGroup>
          <Label>생년월일</Label>
          <ReadOnly>{formState.birth}</ReadOnly>
        </FormGroup>

        <FormGroup>
          <Label>설치 장소</Label>
          <ReadOnly>{formState.address}</ReadOnly>
        </FormGroup>

        <FormGroup>
          <Label>이동전화 연락처</Label>
          <ReadOnly>{formState.phone}</ReadOnly>
        </FormGroup>

        <FormGroup>
          <Label>요금 납부 방법</Label>
          <Select
            value={formState.autoPaymentType}
            onChange={e => handleChange('autoPaymentType', e.target.value)}
            hasError={isInvalid('autoPaymentType')}
          >
            <option value="">선택</option>
            <option value="계좌">계좌이체</option>
            <option value="카드">신용카드</option>
          </Select>
          {isInvalid('autoPaymentType') && <ErrorText>필수 항목입니다.</ErrorText>}
        </FormGroup>

        {/* 자동이체 선택값에 따른 조건부 렌더링 */}
        {formState.autoPaymentType === '계좌' && (
          <>
            <FormGroup>
              <Label>은행</Label>
              <Input
                value={formState.bank}
                onChange={e => handleChange('bank', e.target.value)}
                hasError={isInvalid('bank')}
              />
              {isInvalid('bank') && <ErrorText>은행은 필수 항목입니다.</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>계좌번호</Label>
              <Input
                value={formState.account}
                onChange={e => handleChange('account', e.target.value)}
                hasError={isInvalid('account')}
              />
              {isInvalid('account') && <ErrorText>계좌번호는 필수 항목입니다.</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>예금주</Label>
              <Input
                value={formState.holder}
                onChange={e => handleChange('holder', e.target.value)}
                hasError={isInvalid('holder')}
              />
              {isInvalid('holder') && <ErrorText>예금주는 필수 항목입니다.</ErrorText>}
            </FormGroup>
          </>
        )}

        {formState.autoPaymentType === '카드' && (
          <>
            <FormGroup>
              <Label>카드번호</Label>
              <Input
                value={formState.cardNumber}
                onChange={e => handleChange('cardNumber', e.target.value)}
                hasError={isInvalid('cardNumber')}
              />
              {isInvalid('cardNumber') && <ErrorText>카드번호는 필수 항목입니다.</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>카드유효기간</Label>
              <Input
                placeholder="MM/YY"
                maxLength={5}
                value={formState.cardExpire}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, ''); // 숫자만 추출
                  let formatted = raw;

                  if (raw.length >= 3) {
                    formatted = raw.slice(0, 2) + '/' + raw.slice(2, 4);
                  }

                  dispatch({ type: "UPDATE_FIELD", key: "cardExpire", value: formatted });
                }}
                hasError={isInvalid('cardExpire')}
              />

              {isInvalid('cardExpire') && <ErrorText>유효기간은 필수 항목입니다.</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>카드주</Label>
              <Input
                value={formState.cardHolder}
                onChange={e => handleChange('cardHolder', e.target.value)}
                hasError={isInvalid('cardHolder')}
              />
            </FormGroup>
          </>
        )}

        <FormGroup>
          <Label>요금안내 이메일</Label>
          <Input
            value={formState.email}
            onChange={e => handleChange('email', e.target.value)}
            hasError={isInvalid('email')}
          />
          {isInvalid('email') && <ErrorText>필수 항목입니다.</ErrorText>}
        </FormGroup>
      </Grid>

      <Footer>
        <label>
          <input
            type="checkbox"
            checked={formState.agreePayment}
            onChange={e => handleChange('agreePayment', e.target.checked)}
          />
          예금자(카드주) 동의
          {isInvalid('agreePayment') && <ErrorText>필수 항목입니다.</ErrorText>}
        </label>
        <SignatureBox onClick={onOpenSignature}>
          {formState.signature1 ? formState.signature1 : '서명 / 인'}
        </SignatureBox>
      </Footer>
    </Card>
  );
};

export default PDFSectionSubscriber;

const Card = styled.section`
  background: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Header = styled.div`
  position: relative; /* 추가 */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  flex-direction: column; /* label과 안내문구 수직 정렬 */

  label {
    font-size: 14px;
    color: #333;
    input {
      margin-right: 8px;
    }
  }
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #222;
`;

const HelpToggle = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  color: #007bff;
  margin-left: 8px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const HelpText = styled.div`
  position: absolute;
  top: 36px; /* label 아래에 위치하도록 조정 */
  left: 0;
  font-size: 12px;
  color: #888;
  background: #f9f9f9;
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 14px;
  color: #555;
  margin-bottom: 6px;
`;

const ReadOnly = styled.div`
  background: #f5f5f5;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  color: #666;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid ${props => props.hasError ? '#ff4d4f' : '#ccc'};
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid ${props => props.hasError ? '#ff4d4f' : '#ccc'};
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
`;


const Footer = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  label {
    font-size: 14px;
    color: #333;
    input {
      margin-right: 8px;
    }
  }
`;

const SignatureBox = styled.div`
  padding: 12px 20px;
  border: 1px dashed #aaa;
  border-radius: 6px;
  color: #888;
  font-size: 14px;
  background: #fafafa;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
    border-color: #666;
  }
`;


const ErrorText = styled.div`
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 4px;
`;