import { startTransition, useState } from "react"
import { Button, FlatList, KeyboardAvoidingView, Platform, PlatformColor, StyleSheet, Text, TextInput, View } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

import useChat from "@/hooks/useChat"
import MessageView from "./Message"


/**
 * Data Model:
 * 
 * User: {
 *  username,
 *  avatar
 * }
 * 
 * Message: {
 *  user: User,
 *  dateCreated: Date,
 *  text: string
 * }
 * 
 * Chat: {
 *  threadMessage: Message?,
 *  messageGroups: MessageGroup[],
 * }
 * 
 * MessageGroup {
 *  messages: Message[]
 * }
 */

const Chat = () => {

  const chatId = 0
  const insets = useSafeAreaInsets()

  const [text, setText] = useState<string>("")
  // const [messages, setMessages] = useState<Message[]>(chatService.fetchMessages({ chatId }))


  const messages = useChat(chatId);

  const onPressCancel = () => {
    setText("")
  }

  const onPressSend = () => {
    const strippedText = text.trim()
    if (strippedText) {
      // chatService.send({ chatId, text: strippedText })
      // setMessages([text, ...messages]) 
    }
    setText("")
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ios: "padding" })}
      keyboardVerticalOffset={insets.bottom + 50}
    >
      <FlatList
        style={{flex: 1}}
        data={messages}
        renderItem={({item}) => <MessageView message={item} showHeader/>}
        keyExtractor={(item) => item.id}
        inverted
      />
      <View style={{ padding: 16, paddingBottom: insets.bottom }}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          multiline
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