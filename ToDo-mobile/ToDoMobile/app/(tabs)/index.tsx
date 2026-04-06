import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Animated from "react-native-reanimated";
import ToDoCard from "@/components/todo-card";
import { IconSymbol } from "@/components/ui/icon-symbol";

const { ScrollView } = Animated;

export interface Activity {
  id: string;
  name: string;
  when: string;
}

const HomeScreen = () => {
  const [activities, setActivities] = useState<Activity[]>([
    { id: "1", name: "Morning Run", when: "2025-01-01" },
    { id: "2", name: "Team Meeting", when: "2025-01-02" },
    { id: "3", name: "Grocery Shopping", when: "2025-01-03" },
  ]);
  const [selectedCard, setSelectedCard] = useState<Activity | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [when, setWhen] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const handleDeselect = () => {
    if (!open) setSelectedCard(null);
  };

  return (
    <Pressable style={styles.main} onPress={handleDeselect}>
      <Text style={styles.title}>Activity Board</Text>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.btnAdd}>
          <IconSymbol name="plus" color="white" />
        </Pressable>
        <Pressable
          style={[styles.btnEdit, !selectedCard && styles.btnDisabled]}
          disabled={!selectedCard}
          onPress={() => {
            if (!selectedCard) return;
            setName(selectedCard.name);
            setWhen(String(selectedCard.when));
            setIsEditMode(true);
            setOpen(true);
          }}
        >
          <IconSymbol name="pencil" color="white" />
        </Pressable>
        <Pressable
          style={[styles.btnRemove, !selectedCard && styles.btnDisabled]}
          disabled={!selectedCard}
        >
          <IconSymbol name="trash" color="white" />
        </Pressable>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {activities.map((activity) => (
          <ToDoCard
            key={activity.id}
            activity={activity}
            isSelected={selectedCard?.id === activity.id}
            onSelect={() =>
              setSelectedCard((prev) =>
                prev?.id === activity.id ? null : activity,
              )
            }
          />
        ))}
      </ScrollView>
    </Pressable>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    padding: 16,
    paddingTop: 64,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#222",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginBottom: 10,
    marginRight: 16,
  },
  btnAdd: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  btnEdit: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  btnRemove: {
    backgroundColor: "#f44336",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  btnDisabled: {
    backgroundColor: "#ccc",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
