import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Animated from 'react-native-reanimated'
import dayjs, { Dayjs } from "dayjs";
const { ScrollView } = Animated

interface Activity {
  id: string;
  name: string;
  when: string;
}

const HomeScreen = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedCard, setSelectedCard] = useState<Activity | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [when, setWhen] = useState<Dayjs | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  return (
    <View>
        <Pressable onPress={() => { if (!open) setSelectedCard(null); }}>
        <ScrollView contentContainerStyle={styles.main}>

          <Text style={styles.title}>กระดานกิจกรรม</Text>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <Pressable style={styles.btnAdd}>
              <Text style={styles.btnText}>Add</Text>
            </Pressable>

            <Pressable
              style={[styles.btnEdit, !selectedCard && styles.btnDisabled]}
              disabled={!selectedCard}
              onPress={() => {
                if (!selectedCard) return;
                setName(selectedCard.name);
                setWhen(dayjs(selectedCard.when));
                setIsEditMode(true);
                setOpen(true);
              }}
            >
              <Text style={styles.btnText}>Edit</Text>
            </Pressable>

            <Pressable
              style={[styles.btnRemove, !selectedCard && styles.btnDisabled]}
              disabled={!selectedCard}
              onPress={handleRemove}
            >
              <Text style={styles.btnText}>Remove</Text>
            </Pressable>
          </View>


        </ScrollView>
      </Pressable>



      <ScrollView>
      <Text>HomeScreen</Text>
      <Pressable 
      style={styles.btnAdd}
      onPress={() => {}}>
        <Text>Add</Text>
      </Pressable>
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({


buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  btnAdd:{
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
    btnEdit: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  btnRemove: {
    backgroundColor: "#f44336",
    paddingVertical: 10,
    paddingHorizontal: 20,
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
})