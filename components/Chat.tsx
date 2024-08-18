import { useState } from "react"
import { Button, FlatList, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import useChat from "@/hooks/useChat"
import MessageView from "./Message"
import MessageForm from "./MessageForm"

const Chat = () => {
  const insets = useSafeAreaInsets()

  const { send, messages} = useChat(0);

  const handleSubmit = (text: string) => {
    send(text)
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: "padding" })}
      keyboardVerticalOffset={insets.bottom + 20}
    >
      <FlatList
        style={{flex: 1}}
        data={messages}
        renderItem={({item}) => <MessageView message={item.message} showHeader={item.indexWithinGroup === 0} />}
        keyExtractor={(item) => item.message.id}
        inverted
      />
      <View style={{ paddingTop: 16, paddingBottom: insets.bottom + 16 }}>
        <MessageForm onSubmit={handleSubmit} />
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  textInput: {
    borderColor: "#cccccc",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 8,
  }
})

export default Chat