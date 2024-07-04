import { View, Text } from "react-native";
import React, { useContext } from "react";
import ExpensesOutput from "../components/molecule/ExpensesOutput";
import { ExpensesContext } from "../store/expenses_context";

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <View style={{ flex: 1 }}>
      <ExpensesOutput expenses={expensesCtx.expenses} periodName={"Total"} />
    </View>
  );
};

export default AllExpenses;
