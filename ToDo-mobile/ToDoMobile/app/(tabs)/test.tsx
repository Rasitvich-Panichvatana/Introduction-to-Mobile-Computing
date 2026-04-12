import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ModalDateTime from "@/components/modalDateTime";

const Test = () => {
  return (
    <View style={{ paddingTop: 150, paddingHorizontal: 30 }}>
      <ModalDateTime />
    </View>
  );
};

export default Test;
