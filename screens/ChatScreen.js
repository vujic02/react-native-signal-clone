import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Keyboard,
} from "react-native";
import { Avatar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, FontAwesome, Ionicons } from "react-native-vector-icons";
import firebase from "firebase";
import { auth, db } from "../firebase";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    // After sending the message, dismiss the keyboard
    Keyboard.dismiss();

    console.log(firebase.firestore);

    // select collection chats, then the document within that collection with the route.params.id, and finally enter the collection messages and add current message with users information from auth
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });

    // Reset the input
    setInput("");
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    return unsubscribe;
  }, [route]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackChatVisible: false,
      headerBackAlign: "left",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri: auth?.currentUser?.photoURL,
            }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={100}
      >
        <ScrollView>
          {messages.map((message) =>
            message.data.email === auth.currentUser.email ? (
              <View key={message.data.id} style={styles.sender}>
                <Avatar
                  containerStyle={{
                    position: "absolute",
                    bottom: -15,
                    left: -5,
                  }}
                  rounded
                  bottom={-15}
                  left={-5}
                  size={30}
                  source={{ uri: message.data.photoURL }}
                />
                <Text style={styles.senderText}>{message.data.message}</Text>
              </View>
            ) : (
              <View key={message.data.id} style={styles.reciever}>
                <Avatar
                  containerStyle={{
                    position: "absolute",
                    bottom: -15,
                    left: -5,
                  }}
                  rounded
                  bottom={-15}
                  left={-5}
                  size={30}
                  source={{ uri: message.data.photoURL }}
                />
                <Text style={styles.recieverText}>{message.data.message}</Text>
                <Text style={styles.recieverName}>
                  {message.data.displayName}
                </Text>
              </View>
            )
          )}
        </ScrollView>
        <View style={styles.footer}>
          <TextInput
            placeholder="Signal Message"
            style={styles.textInput}
            value={input}
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
            <Ionicons name="send" size={24} color="#2B68E6" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  reciever: {
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    padding: 15,
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 20,
    maxWidth: "80%",
    position: "relative",
    color: "white",
  },
  recieverText: {},
  recieverName: {
    color: "white",
  },
  sender: {
    backgroundColor: "#EEEEEE",
    alignSelf: "flex-end",
    padding: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 20,
    maxWidth: "80%",
    position: "relative",
  },
  senderText: {},
  senderName: {
    color: "white",
  },
});
