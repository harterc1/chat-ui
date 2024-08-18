import {  useRef, useState } from "react"
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import useChat from "@/hooks/useChat"
import MessageView from "./Message"
import MessageForm from "./MessageForm"
import { Message, MessageWithIndex } from "@/types.chat"
import * as Haptics from 'expo-haptics';

const Chat = () => {
  const flatList = useRef<FlatList>(null)

  const insets = useSafeAreaInsets()

  const { send, messages} = useChat(0);

  const [pressedMessageId, setPressedMessageId] = useState<string | null>(null)

  const handleSubmit = (text: string) => {
    send(text)
    flatList.current?.scrollToOffset({ offset: 0 })
  }

  // TODO: index not used
  const handlePressMessage = (message: Message, index: number) => {
    if (message.id !== pressedMessageId) {
      setPressedMessageId(null)
    }
  }

  const handleLongPressMessage = (message: Message, index: number) => {
    if (message.id !== pressedMessageId) {
      Haptics.selectionAsync()
      setPressedMessageId(message.id)
    }
  }

  const renderItem = ({ item, index }: { item: MessageWithIndex, index: number }) => (
    <MessageView
      onPress={handlePressMessage}
      onLongPress={handleLongPressMessage}
      index={index}
      message={item.message}
      showHeader={item.indexWithinGroup === 0}
      showOverlay={pressedMessageId === item.message.id}
    />
  )

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding" })}
      keyboardVerticalOffset={insets.bottom + 20}
    >
      <FlatList
        ref={flatList}
        maintainVisibleContentPosition={{ minIndexForVisible: 0, autoscrollToTopThreshold: 20 }}
        data={messages}
        renderItem={renderItem}
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
  container: {
    flex: 1,
  },
})

export default Chat