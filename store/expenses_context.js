import { createContext, useReducer } from "react";
import { DUMMY_EXPENSES } from "../api/DummyData";

export const ExpensesContext = createContext({
  expenses: [],
  addExpenses: ({ description, amount, date }) => {},
  deleteExpenses: (id) => {},
  updateExpenses: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (updatableExpenseIndex !== -1) {
        const updatableExpense = state[updatableExpenseIndex];
        const updatedItem = {
          ...updatableExpense,
          ...action.payload.expensesData,
        };
        const updatedExpenses = [...state];
        updatedExpenses[updatableExpenseIndex] = updatedItem;
        return updatedExpenses;
      } else {
        console.error(`Expense with id ${action.payload.id} not found.`);
        return state; // or handle it accordingly
      }
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpenses(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpenses(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpenses(id, expensesData) {
    dispatch({ type: "UPDATE", payload: { id, expensesData } });
  }

  const value = {
    expenses: expensesState,
    addExpenses: addExpenses,
    updateExpenses: updateExpenses,
    deleteExpenses: deleteExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
