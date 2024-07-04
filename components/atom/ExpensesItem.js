import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/style";
import GetFormatedDate from "../../util/date";
import { useNavigation } from "@react-navigation/native";

const ExpensesItem = ({ id, description, date, amount }) => {
  const navigation = useNavigation();
  function expensesPressHandler() {
    navigation.navigate("ManagementExpenses", { expenseId: id });
  }

  return (
    <Pressable
      onPress={expensesPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
      android_ripple={true}
    >
      <View style={styles.containerItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{GetFormatedDate(date)} </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpensesItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  containerItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
    textAlign: "center",
  },
});
