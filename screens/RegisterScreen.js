import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const signUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {})
      .catch((err) => {
        alert(err.msg);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal account
      </Text>
      <Input
        placeholder="Full Name"
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.inputContainer}
      />
      <Input
        placeholder="Email Adress"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.inputContainer}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.inputContainer}
      />
      <Input
        placeholder="Profile picture URL (optional)"
        value={imgUrl}
        onChange={(e) => setImgUrl(e.target.value)}
        style={styles.inputContainer}
      />
      <Button
        containerStyle={styles.button}
        onPress={() => navigation.goBack()}
        title="Login"
      />
      <Button
        containerStyle={styles.button}
        onPress={signUp}
        title="Register"
        type="outline"
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {},
  button: {
    marginTop: 5,
    width: "100%",
  },
});
