import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { Button, Image, Input } from "react-native-elements";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        navigation.navigate("Home");
      })
      .catch((err) => alert(err.msg));
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image
        style={{ width: 200, height: 200 }}
        source={{
          uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
        }}
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
      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button
        containerStyle={styles.button}
        title="Register"
        onPress={() => navigation.navigate("Register")}
        type="outline"
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
