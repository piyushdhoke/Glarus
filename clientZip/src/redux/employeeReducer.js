
import { GET_EMPLOYEES, ADD_EMPLOYEE, EMPLOYEE_ERROR } from "./employeeAction";

const initialState = {
  employees: [],
  error: null,
  loading: true,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
        loading: false,
      };
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    case EMPLOYEE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default employeeReducer;
