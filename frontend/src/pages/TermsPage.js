import React, { useEffect, useState } from "react";
import { contractSchema } from "../data/contractSchema"; // 항목 구조 정의 JSON
import { mockUserData } from "../data/mockDB";           // 자동입력용 임시 사용자 정보
import SectionBox from "../components/SectionBox";
import { validateForm } from "../utils/validateForm";
import ErrorToast from "../components/ErrorToast"; // 아래에서 만들 컴포넌트

const TermsPage = () => {
    // 사용자 입력/선택 상태를 저장할 객체
    const [formData, setFormData] = useState({});

    // 스크롤이 페이지 맨 아래까지 도달했는지 여부
    const [scrollEnd, setScrollEnd] = useState(false);

    const [errors, setErrors] = useState([]); // 에러 메시지 상태 추가

    // 컴포넌트가 처음 렌더링될 때 초기 상태값 설정
    useEffect(() => {
        const initialState = {};

        // contractSchema를 순회하며 항목에 따라 초기값을 설정
        contractSchema.forEach(section => {
            section.items.forEach(item => {
                if (item.type === "auto") {
                    // 자동입력 항목은 mockDB에서 값을 불러옴
                    initialState[item.key] = mockUserData[item.key] || "";
                } else if (item.type === "today") {
                    // 오늘 날짜를 자동 입력
                    initialState[item.key] = new Date().toISOString().split("T")[0];
                } else {
                    // 체크박스는 false, 그 외 입력은 빈 문자열로 초기화
                    initialState[item.key] = item.type === "checkbox" ? false : "";
                }
            });
        });

        // 상태 업데이트
        setFormData(initialState);
    }, []);

    // 제출 버튼
    const handleSubmit = () => {
        const result = validateForm(contractSchema, formData);
        if (result === true) {
            alert("제출 완료! 서버로 전송합니다.");
            // 실제 서버 전송 로직 삽입 예정
        } else {
            setErrors(result);
            setTimeout(() => setErrors([]), 4000); // 에러 메시지 4초 후 자동 제거
        }
    };

    // 스크롤이 끝까지 내려갔는지 확인하는 함수
    const handleScroll = (e) => {
        const bottom =
            e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) setScrollEnd(true);
    };

    // '모두 동의하기' 클릭 시 체크박스 항목만 모두 true로 변경
    const handleAgreeAll = () => {
        const updated = { ...formData };
        contractSchema.forEach(section => {
            section.items.forEach(item => {
                if (item.type === "checkbox") {
                    updated[item.key] = true;
                }
            });
        });
        setFormData(updated);
    };

    // 항목별 변경을 처리하는 함수 (Input, Checkbox 등 공통 처리)
    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    return (
        // 전체 스크롤 영역
        <div onScroll={handleScroll} style={{ height: "100vh", overflowY: "scroll", padding: "1rem" }}>

            {/* 대분류(구분) 영역 */}

            {contractSchema.map(section => (
                <SectionBox
                    key={section.category}
                    category={section.category}
                    items={section.items}
                    formData={formData}
                    onChange={handleChange}
                    errors={errors}
                />
            ))}

            {/* 모두 동의하기 버튼 */}
            <div style={{ textAlign: "center", margin: "2rem 0" }}>
                <button
                    onClick={handleAgreeAll}
                    disabled={!scrollEnd} // 스크롤 끝까지 안 내리면 비활성화
                    style={{
                        padding: "1rem 2rem",
                        fontSize: "1.2rem",
                        backgroundColor: scrollEnd ? "#007bff" : "#ccc",
                        color: "white",
                        border: "none",
                        cursor: scrollEnd ? "pointer" : "not-allowed"
                    }}
                >
                    모두 동의하기
                </button>
            </div>

            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <button
                    onClick={handleSubmit}
                    style={{
                        padding: "1rem 2rem",
                        fontSize: "1.2rem",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    제출하기
                </button>
            </div>

            <ErrorToast messages={errors} />


        </div>
    );
};

export default TermsPage;
