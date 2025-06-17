import React, { useState } from 'react';
import styled from 'styled-components';

/**
 * 전문보기 클릭 시에만 동의 가능
 */
const AgreementRow = ({ title, pdfUrl, value, onChange, viewed, onViewed, highlight = false }) => {
  const [hasViewed, setHasViewed] = useState(false);

  const handleViewClick = () => {
    window.open(pdfUrl, '_blank');
    onViewed();
  };

  return (
    <Container>
      <Title>{title}</Title>
      <ViewButton
        type="button"
        onClick={handleViewClick}
        viewed={hasViewed}
        highlight={highlight && !viewed}// 강조는 viewed 전까지만
      >
        전문보기
      </ViewButton>
      <RadioBlock>
        <RadioItem>
          <input
            type="radio"
            id={`${title}-agree`}
            name={title}
            value="Y"
            checked={value === 'Y'}
            onChange={() => onChange('Y')}
            disabled={!viewed}
          />
          <label htmlFor={`${title}-agree`}>동의합니다</label>
        </RadioItem>
        <RadioItem>
          <input
            type="radio"
            id={`${title}-disagree`}
            name={title}
            value="N"
            checked={value === 'N'}
            onChange={() => onChange('N')}
          />
          <label htmlFor={`${title}-disagree`}>동의하지 않습니다</label>
        </RadioItem>
      </RadioBlock>
    </Container>
  );
};

export default AgreementRow;


const Container = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
  margin-bottom: 8px;
`;

const ViewButton = styled.button`
  font-size: 13px;
  padding: 6px 12px;
  background-color: ${({ viewed }) => (viewed ? '#007BFF' : '#f0f0f0')}; // 파란색 or 연회색
  color: ${({ viewed }) => (viewed ? '#fff' : '#333')};
  border: ${({ highlight }) => (highlight ? '2px solid #ff4d4f' : 'none')};
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.2s ease, color 0.2s ease;
  cursor: pointer;
  margin-bottom: 12px;
  animation: ${({ highlight }) => (highlight ? 'blink 1s infinite' : 'none')};

  @keyframes blink {
    0% { box-shadow: 0 0 0px #ff4d4f; }
    50% { box-shadow: 0 0 10px #ff4d4f; }
    100% { box-shadow: 0 0 0px #ff4d4f; }
  }

  &:hover {
    background-color: ${({ viewed }) => (viewed ? '#0056b3' : '#e0e0e0')}; // 짙은 파랑 or 회색
  }
`;

const RadioBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RadioItem = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #444;

  input {
    margin-right: 8px;
  }
`;
