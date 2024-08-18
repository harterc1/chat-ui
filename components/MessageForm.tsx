import { useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import Button from "./Button"

const MessageForm = ({
  onSubmit,
}: {
  onSubmit: (text: string) => void,
}) => {

  const [text, setText] = useState<string>("")

  const onPressSend = () => {
    // TODO: not sure stripping should be here.. also we should strip tons of \n chars someplace
    const strippedText = text.trim()
    if (strippedText) {
      onSubmit(strippedText)
    }
    setText("")
  }

  const onPressCancel = () => {
    setText("")
  }

  const disabled = !text.trim()

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={setText}
        multiline
        placeholder="Send a message"
        placeholderTextColor="#999999"
      />
      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={onPressCancel} variant="secondary" disabled={disabled} />
        <Button title="Send" onPress={onPressSend} disabled={disabled} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  textInput: {
    borderColor: "#cccccc",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-end"
  }
})

export default MessageForm