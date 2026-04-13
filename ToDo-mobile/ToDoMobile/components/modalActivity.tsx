import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { DatePicker } from "./nativewindui/DatePicker";

interface ModalProps {
  name: string;
  setName: (value: string) => void;
  when: string;
  setWhen: (value: string) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  date: Date;
  setDate: (value: Date) => void;
}

const ModalActivity = ({
  name,
  setName,
  when,
  setWhen,
  open,
  setOpen,
  date,
  setDate,
}: ModalProps) => {
  useEffect(() => {
    if (when) {
      setDate(new Date(when));
    }
  }, [when]);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setOpen(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              keyboardType="default"
              maxLength={30}
            />
            <Text style={styles.modalText}>When</Text>
            <DatePicker
              value={date}
              mode="datetime"
              onChange={(ev: any) => {
                setDate(new Date(ev.nativeEvent.timestamp));
              }}
            />
            <View style={styles.btnContainer}>
              <Pressable style={styles.btnClose} onPress={() => setOpen(false)}>
                <Text style={styles.btnCloseText}>Close</Text>
              </Pressable>
              <Pressable
                style={styles.btnSave}
                onPress={() => {
                  setWhen(date.toISOString());

                  setOpen(false);
                }}
              >
                <Text style={styles.textStyle}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable style={styles.buttonOpen} onPress={() => setOpen(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

export default ModalActivity;

const styles = StyleSheet.create({
  buttonOpen: {
    borderRadius: 18,
    padding: 8,
    backgroundColor: "#F194FF",
    elevation: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    minWidth: 300,
    backgroundColor: "white",
    borderRadius: 18,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    width: 250,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#d0d0d0",
    padding: 10,
    color: "#333",
    fontSize: 15,
  },
  btnContainer: {
    marginTop: 20,
    minWidth: 245,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnClose: {
    borderRadius: 18,
    padding: 10,
    backgroundColor: "#efeff0",
    elevation: 2,
  },
  btnCloseText: {
    fontSize: 15,
    color: "black",
    textAlign: "center",
  },
  btnSave: {
    borderRadius: 18,
    padding: 10,
    backgroundColor: "#2196F3",
    elevation: 2,
  },
  textStyle: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
});
