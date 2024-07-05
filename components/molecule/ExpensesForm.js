import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import Input from "../atom/Input";
import Button from "../atom/Button";
import { dateEditedFormat, validateDate } from "../../util/date";
import { GlobalStyles } from "../../constants/style";

const ExpensesForm = ({ onCancel, onConfirm, titleButton, updateValue }) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: updateValue ? updateValue.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: updateValue ? dateEditedFormat(updateValue.date) : "",
      isValid: true,
    },
    description: {
      value: updateValue ? updateValue.description : "",
      isValid: true,
    },
  });

  function inputChange(inputIdentifire, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifire]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = validateDate(inputs.date.value);
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (amountIsValid && dateIsValid && descriptionIsValid) {
      onConfirm(expenseData);
    } else {
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.isValid, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
    }
  }

  const IsValidInputUser =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View>
      <Text style={styles.titleForm}>Your Expense</Text>
      <View style={styles.inputRowContainer}>
        <Input
          propsStyle={styles.rowInput}
          label={"Amount"}
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            value: inputs.amount.value,
            onChangeText: inputChange.bind(this, "amount"),
          }}
        />
        <Input
          propsStyle={styles.rowInput}
          label={"Date"}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            value: inputs.date.value,
            onChangeText: inputChange.bind(this, "date"),
          }}
        />
      </View>
      <Input
        label={"Description"}
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          numberOfLines: 4,
          autoCorrect: false,
          autoCapitalize: "sentences",
          value: inputs.description.value,
          onChangeText: inputChange.bind(this, "description"),
        }}
      />
      <View>
        {IsValidInputUser && (
          <Text style={styles.errorText}>
            Invalid input values - please check your entered data !
          </Text>
        )}
      </View>
      <View style={styles.buttons}>
        <Button styleProps={styles.button} mode={"flat"} onPress={onCancel}>
          Cancel
        </Button>
        <Button onPress={submitHandler}>{titleButton}</Button>
      </View>
    </View>
  );
};

export default ExpensesForm;

const styles = StyleSheet.create({
  inputRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  titleForm: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
