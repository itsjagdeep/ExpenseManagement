const initialState = {
    expenses: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_EXPENSE':
        return { ...state, expenses: [...state.expenses, action.payload] };
      case 'EDIT_EXPENSE':
        return {
          ...state,
          expenses: state.expenses.map((expense, index) =>
            index === action.index ? { ...expense, ...action.payload } : expense
          ),
        };
      case 'DELETE_EXPENSE':
        return {
          ...state,
          expenses: state.expenses.filter((_, index) => index !== action.index),
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;