import React from 'react';
import styled from 'styled-components';

/**
 * '모두 동의' 및 '모두 사인하기' 버튼 섹션
 */
const AgreeSection = ({ dispatch, formState, onOpenSignature }) => {
  // 모두 동의 버튼 클릭 시 실행
  const handleAgreeAll = () => {
    const keysToCheck = ['agreePayment'];
    keysToCheck.forEach(key => {
      dispatch({ type: 'UPDATE_FIELD', key, value: true });
    });
  };

  return (
    <Wrapper>
      <Button onClick={handleAgreeAll}>모두 동의</Button>
      <Button onClick={onOpenSignature} color="secondary">모두 사인하기</Button>
    </Wrapper>
  );
};

export default AgreeSection;

const Wrapper = styled.div`
  margin-top: 40px;
  padding: 16px;
  background: #f9f9f9;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Button = styled.button`
  background: ${props => props.color === 'secondary' ? '#555' : '#4CAF50'};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
