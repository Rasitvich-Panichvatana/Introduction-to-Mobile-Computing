import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Animated from "react-native-reanimated";
import ToDoCard from "@/components/todo-card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import {
  Activity,
  createActivity,
  deleteActivity,
  getActivities,
  updateActivity,
} from "@/lib/api/activityApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import ModalActivity from "@/components/modalActivity";
const { ScrollView } = Animated;

const HomeScreen = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedCard, setSelectedCard] = useState<Activity | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [when, setWhen] = useState<string>("");
  const [date, setDate] = useState(new Date());

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

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("token");
      router.replace("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleAdd = async (newWhen: string) => {
    try {
      await createActivity({
        name,
        when: newWhen,
      });

      setOpen(false);
      setSelectedCard(null);

      fetchActivities();
    } catch (err) {
      console.error(err);
      alert("Could not add activity");
    }
  };

  const handleEdit = async (newWhen: string) => {
    if (!selectedCard) return;

    try {
      await updateActivity(selectedCard.id, {
        name,
        when: newWhen,
      });

      setOpen(false);
      setIsEditMode(false);
      setSelectedCard(null);

      fetchActivities();
    } catch (err) {
      console.error(err);
      alert("Could not update activity");
    }
  };

  const handleDelete = async () => {
    if (!selectedCard) return;

    try {
      await deleteActivity(selectedCard.id);
      setSelectedCard(null);
      fetchActivities();
    } catch (err) {
      console.error(err);
      alert("Could not delete activity");
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <View style={styles.main}>
      <Pressable style={styles.btnSignOut} onPress={handleSignOut}>
        <Text style={styles.btnSignOutText}>Sign Out</Text>
      </Pressable>
      <Pressable style={styles.body} onPress={handleDeselect}>
        <Text style={styles.title}>Activity Board</Text>

        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.btnAdd}
            onPress={() => {
              setName("");
              setWhen("");
              setDate(new Date());
              setIsEditMode(false);
              setOpen(true);
            }}
          >
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

        <ModalActivity
          name={name}
          setName={setName}
          when={when}
          setWhen={setWhen}
          open={open}
          setOpen={setOpen}
          date={date}
          setDate={setDate}
          handleSave={isEditMode ? handleEdit : handleAdd}
        />

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
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    padding: 16,
    paddingTop: 56,
    paddingRight: 16,
    flex: 1,
  },
  body: {
    flex: 1,
  },
  btnSignOut: {
    backgroundColor: "white",
    alignSelf: "flex-end",
    marginRight: 16,
    marginBottom: 18,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderRadius: 8,
    borderColor: "white",
  },
  btnSignOutText: {
    textAlign: "center",
    fontSize: 15,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
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
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  btnEdit: {
    backgroundColor: "#2196F3",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  btnRemove: {
    backgroundColor: "#f44336",
    paddingVertical: 8,
    paddingHorizontal: 8,
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
