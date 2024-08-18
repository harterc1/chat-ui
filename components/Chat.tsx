import { useState } from "react"
import { Button, FlatList, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import useChat from "@/hooks/useChat"
import MessageView from "./Message"

const Chat = () => {

  const insets = useSafeAreaInsets()

  // TODO: store text in useRef -- check performance
  // TODO: move text state to footer
  const [text, setText] = useState<string>("")

  const { send, messages} = useChat(0);

  const onPressCancel = () => {
    setText("")
  }

  const onPressSend = () => {
    const strippedText = text.trim()
    if (strippedText) {
      console.log("sending", strippedText)
      send(strippedText)
    }
    setText("")
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: "padding" })}
      keyboardVerticalOffset={insets.bottom + 50}
    >
      <FlatList
        style={{flex: 1}}
        data={messages}
        renderItem={({item}) => <MessageView message={item.message} showHeader={item.indexWithinGroup === 0} />}
        keyExtractor={(item) => item.message.id}
        inverted
      />
      <View style={{ padding: 16, paddingBottom: insets.bottom }}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          multiline
          placeholder="Send a message"
          placeholderTextColor="#999999"
        />
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Button title="Cancel" onPress={onPressCancel} />
          <Button title="Send" onPress={onPressSend} />
        </View>
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