import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/style";

const Input = ({ label, invalid, textInputConfig, propsStyle }) => {
  const styleInput = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    styleInput.push(styles.inputMultiLine);
  }

  if (invalid) {
    styleInput.push(styles.inValidInput);
  }

  return (
    <View style={[styles.inputContainer, propsStyle]}>
      <Text style={[styles.label, invalid && styles.inValidLabel]}>
        {label}
      </Text>
      <TextInput {...textInputConfig} style={styleInput} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 16,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiLine: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  inValidLabel: { color: GlobalStyles.colors.error500 },
  inValidInput: { backgroundColor: GlobalStyles.colors.error50 },
});
