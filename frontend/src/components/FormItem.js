import React from "react";

// FormItem 컴포넌트는 하나의 항목(소분류)을 렌더링합니다.
// props:
// - item: 항목 정보 (label, type, key, editable, options 등 포함)
// - value: 현재 입력값 또는 체크 상태
// - onChange: 상위 상태를 변경할 수 있는 콜백 함수
const FormItem = ({ item, value, onChange, hasError }) => {
    // 일반 텍스트 입력 또는 자동입력 항목의 텍스트 변경 핸들러
    const handleInputChange = (e) => {
        onChange(item.key, e.target.value);
    };

    // 체크박스 항목 변경 핸들러
    const handleCheckboxChange = (e) => {
        onChange(item.key, e.target.checked);
    };

    // 선택 항목 (라디오 버튼) 변경 핸들러
    const handleRadioChange = (option) => {
        onChange(item.key, option);
    };

    return (
        <div style={{ margin: "0.75rem 0" }}>
            {/* 항목명 라벨 */}
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.25rem" }}>
                {item.label}
            </label>

            {/* type: "auto" 또는 "today" - 자동입력 (읽기전용 또는 편집 가능) */}
            {(item.type === "auto" || item.type === "today") && (
                <input
                    type="text"
                    value={value || ""}
                    readOnly={!item.editable} // editable이 false면 읽기전용
                    onChange={handleInputChange}
                    style={{
                        width: "80%",
                        padding: "0.5rem",
                        border: hasError ? "1px solid red" : "1px solid #ccc",
                        borderRadius: "4px"
                    }}
                />
            )}

            {/* type: "input" - 일반 텍스트 입력 필드 */}
            {item.type === "input" && (
                <input
                    type="text"
                    value={value || ""}
                    onChange={handleInputChange}
                    style={{
                        width: "80%",
                        padding: "0.5rem",
                        border: hasError ? "1px solid red" : "1px solid #ccc",
                        borderRadius: "4px"
                    }}
                />
            )}

            {/* type: "select" - 라디오버튼 항목 (ex. 카드 vs 계좌 선택 등) */}
            {item.type === "select" && (
                <div>
                    {item.options.map((opt) => (
                        <label key={opt} style={{ marginRight: "1rem" }}>
                            <input
                                type="radio"
                                name={item.key}        // 동일 name이면 하나만 선택됨
                                value={opt}
                                checked={value === opt}
                                onChange={() => handleRadioChange(opt)}
                            />{" "}
                            {opt}
                        </label>
                    ))}
                </div>
            )}

            {/* type: "checkbox" - 동의 항목 (약관 보기 링크 포함 가능) */}
            {item.type === "checkbox" && (
                <div>
                    <input
                        type="checkbox"
                        checked={!!value} // undefined 방지
                        onChange={handleCheckboxChange}
                    />{" "}
                    {/* 링크가 있으면 오른쪽에 약관 보기 버튼 표시 */}
                    {item.link && (
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ marginLeft: "0.5rem", color: "#007bff" }}
                        >
                            [약관 보기]
                        </a>
                    )}
                </div>
            )}
        </div>
    );
};

export default FormItem;
