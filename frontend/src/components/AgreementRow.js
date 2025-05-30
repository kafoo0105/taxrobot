import React, { useState } from 'react';
import styled from 'styled-components';

/**
 * 약관 항목 한 줄 - 전문보기 클릭 시에만 동의 가능
 */
const AgreementRow = ({ title, pdfUrl, value, onChange }) => {
    const [hasViewed, setHasViewed] = useState(false);

    const handleViewClick = () => {
        window.open(pdfUrl, '_blank');
        setHasViewed(true);
    };

    return (
        <Container>
            <Title>{title}</Title>
            <ViewButton type="button" onClick={handleViewClick} viewed={hasViewed}>
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
                        disabled={!hasViewed} // 전문보기 전에는 비활성화
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

// =================== styled-components ===================

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
  border: none;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.2s ease, color 0.2s ease;
  cursor: pointer;
  margin-bottom: 12px;

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
