import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({ icon, size, color, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.bottonContainer}>
        <Ionicons name={icon} size={size} color={color} onPress={onPress} />
      </View>
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  bottonContainer: {
    borderRadius: 24,
    padding: 6,
    margin: 8,
    marginHorizontal: 8,
    marginVertical: 2,
  },
});
