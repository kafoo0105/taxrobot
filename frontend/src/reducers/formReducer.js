/**
 * form 상태를 관리
 * UPDATE_FIELD: 특정 필드 하나 업데이트
 * SET_ALL: 전체 상태를 일괄 설정
 */
export const formReducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_FIELD":
        return {
          ...state,
          [action.key]: action.value
        };
      case "SET_ALL":
        return action.payload;
      default:
        return state;
    }
  };
  