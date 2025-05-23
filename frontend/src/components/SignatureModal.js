// src/components/SignatureModal.js
import React, { useState } from 'react';
import styled from 'styled-components';

/**
 * 서명을 입력받는 중앙 모달창
 * - 팝업창 대신, 페이지 내에 띄우는 방식
 * - 사용자가 입력한 서명을 부모로 전달
 */
const SignatureModal = ({ onClose }) => {
  const [signature, setSignature] = useState('');

  const handleSubmit = () => {
    if (signature.trim()) {
      onClose(signature); // 부모에 서명 전달
    }
  };

  return (
    <Overlay>
      <ModalBox>
        <Title>서명을 입력해 주세요</Title>
        <Input
          value={signature}
          onChange={e => setSignature(e.target.value)}
          placeholder="예: 홍길동"
        />
        <ButtonRow>
          <Button onClick={() => onClose(null)}>취소</Button>
          <Button onClick={handleSubmit}>서명 완료</Button>
        </ButtonRow>
      </ModalBox>
    </Overlay>
  );
};

export default SignatureModal;

// ---------------- Styled Components ----------------

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 300px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  text-align: center;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 90%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 20px;
  text-align: center;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px 0;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;

  &:first-child {
    background: #aaa;
  }

  &:hover {
    opacity: 0.9;
  }
`;
