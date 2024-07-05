import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useLayoutEffect } from "react";
import IconButton from "../components/atom/IconButton";
import { GlobalStyles } from "../constants/style";
import Button from "../components/atom/Button";
import { ExpensesContext } from "../store/expenses_context";
import ExpensesForm from "../components/molecule/ExpensesForm";

const ManageExpense = (props) => {
  const editedExpenseID = props.route.params?.expenseId;
  const isEdited = !!editedExpenseID;
  const expensesCtx = useContext(ExpensesContext);

  const selectedExpense = expensesCtx.expenses.find(
    (e) => e.id === editedExpenseID
  );

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: isEdited ? "Edit Expenses" : "Add Expense",
    });
  }, [props.navigation, isEdited]);

  function handlerCancel() {
    props.navigation.goBack();
  }
  function handlerConfirm(expenseData) {
    if (isEdited) {
      expensesCtx.updateExpenses(editedExpenseID, expenseData);
    } else {
      expensesCtx.addExpenses(expenseData);
    }
    props.navigation.goBack();
  }

  function handlerDelete() {
    expensesCtx.deleteExpenses(editedExpenseID);
    props.navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpensesForm
        onCancel={handlerCancel}
        onConfirm={handlerConfirm}
        isEdited={isEdited}
        titleButton={isEdited ? "Edit" : "Delete"}
        updateValue={selectedExpense}
      />
      {isEdited && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon={"trash"}
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={handlerDelete}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",

    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
