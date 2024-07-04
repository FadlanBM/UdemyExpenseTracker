import { View, Text, FlatList } from "react-native";
import React from "react";
import ExpensesItem from "../atom/ExpensesItem";

function renderItem(item) {
  return <ExpensesItem {...item.item} />;
}

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;
