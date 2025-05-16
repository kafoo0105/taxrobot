import React from "react";
import FormItem from "./FormItem";

// SectionBox는 대분류 박스를 렌더링하는 컴포넌트입니다.
// props:
// - category: 대분류 제목
// - items: 해당 대분류에 속한 항목 배열
// - formData: 현재 항목별 값들을 담은 객체
// - onChange: 항목별 값 변경을 위한 함수
const SectionBox = ({ category, items, formData, onChange, errors = [] }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "1rem",
        padding: "1rem",
        backgroundColor: "#f9f9f9"
      }}
    >
      {/* 대분류 제목 */}
      <h3 style={{ marginBottom: "1rem", color: "#333" }}>{category}</h3>

      {/* 해당 대분류에 포함된 항목들을 렌더링 */}
      {items.map((item) => (
        <FormItem
          key={item.key}
          item={item}
          value={formData[item.key]}
          onChange={onChange}
          hasError={errors.some(err => err.includes(item.label))}
        />
      ))}
    </div>
  );
};

export default SectionBox;
