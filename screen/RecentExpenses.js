import { View, Text } from "react-native";
import React, { useContext } from "react";
import ExpensesOutput from "../components/molecule/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { ExpensesContext } from "../store/expenses_context";

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expenses) => {
    const date = new Date();

    const date7Days = getDateMinusDays(date, 7);

    return expenses.date > date7Days;
  });

  return (
    <View style={{ flex: 1 }}>
      <ExpensesOutput expenses={recentExpenses} periodName={"Last 7 Days"} />
    </View>
  );
};

export default RecentExpenses;
