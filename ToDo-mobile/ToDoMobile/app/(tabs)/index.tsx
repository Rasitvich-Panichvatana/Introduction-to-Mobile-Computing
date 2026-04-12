import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Animated from "react-native-reanimated";
import ToDoCard from "@/components/todo-card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Activity, deleteActivity, getActivities } from "@/lib/api/activityApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
const { ScrollView } = Animated;

const HomeScreen = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedCard, setSelectedCard] = useState<Activity | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [when, setWhen] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const handleDeselect = () => {
    if (!open) setSelectedCard(null);
  };

  const fetchActivities = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }
    try {
      const data = await getActivities();
      setActivities(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!selectedCard) return;

    try {
      await deleteActivity(selectedCard.id);
      setSelectedCard(null);
      fetchActivities();
    } catch (err) {
      alert("Could not delete activity");
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

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
          onPress={handleDelete}
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
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#222",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
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
