import React from "react";
import { StyleSheet } from "react-native";
import { ListItem, Text, Avatar } from "react-native-elements";

const ChatListItem = ({ id, chatName, enterChat }) => {
  return (
    <ListItem>
      <Avatar
        rounded
        source={{
          uri: "https://randomuser.me/api/portraits/women/79.jpg",
        }}
      />
      <ListItem.Content>
        <ListItem.Title>Katie</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          Today's subject... Slavery.
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({});
