import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Text, Card } from "@rneui/themed";
import { Activity } from "@/lib/api/activityApi";

interface CardProps {
  activity: Activity;
  isSelected: boolean;
  onSelect: () => void;
}

const ToDoCard = ({ activity, isSelected, onSelect }: CardProps) => {
  const formattedDateTime = new Date(activity.when).toLocaleString("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return (
    <Pressable onPress={onSelect}>
      <Card containerStyle={[styles.card, isSelected && styles.selectedCard]}>
        <Text h4>{activity.name}</Text>
        <Text>{formattedDateTime}</Text>
      </Card>
    </Pressable>
  );
};

export default ToDoCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedCard: {
    borderColor: "#2196F3",
  },
});
