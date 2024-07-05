import { View, Text } from "react-native";
import React from "react";

export default function GetFormatedDate(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${date.getFullYear()} - ${
    months[date.getMonth()]
  } - ${date.getDate()}`;
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

export function dateEditedFormat(date) {
  return date.toISOString().slice(0, 10);
}

export function validateDate(date) {
  // Check if the input is a valid date string
  if (typeof date !== "string") {
    return false;
  }

  // Split the input date string to get year, month, and day
  const [year, month, day] = date.split("-").map(Number);

  // Check if the date components are valid
  if (!year || !month || !day) {
    return false;
  }

  const dateObject = new Date(date);

  // Check if dateObject is a valid date
  if (isNaN(dateObject.getTime())) {
    return false;
  }

  return (
    dateObject.getDate() === day &&
    dateObject.getMonth() + 1 === month &&
    dateObject.getFullYear() === year
  );
}
