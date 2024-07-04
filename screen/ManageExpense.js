import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useLayoutEffect } from "react";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/style";
import Button from "../components/ui/Button";
import { ExpensesContext } from "../store/expenses_context";

const ManageExpense = (props) => {
  const editedExpenseID = props.route.params?.expenseId;
  const isEdited = !!editedExpenseID;
  const expensesCtx = useContext(ExpensesContext);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: isEdited ? "Edit Expenses" : "Add Expense",
    });
  }, [props.navigation, isEdited]);

  function handlerCancel() {
    props.navigation.goBack();
  }
  function handlerConfirm() {
    if (isEdited) {
      expensesCtx.updateExpenses(editedExpenseID, {
        amount: 30.99,
        description: "Hello World 2",
        date: new Date("2024-07-04"),
      });
    } else {
      expensesCtx.addExpenses({
        amount: 19.99,
        description: "Hello World",
        date: new Date("2024-07-04"),
      });
    }
    props.navigation.goBack();
  }

  function handlerDelete() {
    expensesCtx.deleteExpenses(editedExpenseID);
    props.navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button
          styleProps={styles.button}
          mode={"flat"}
          onPress={handlerCancel}
        >
          Cancel
        </Button>
        <Button onPress={handlerConfirm}>
          {isEdited ? "Edit Expenses" : "Add Expense"}
        </Button>
      </View>
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
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },

  button: {
    minWidth: 120,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});
