import { useState } from "react"
import { FlatList, StyleSheet, TextInput, View } from "react-native"
import Button from "./Button"
import useImageUrls from "@/hooks/useImageUrls"
import Image from "./Image"

const MessageForm = ({
  onSubmit,
}: {
  onSubmit: (text: string) => void,
}) => {

  const [text, setText] = useState<string>("")


  const imageUrls = useImageUrls(text)

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
        hitSlop={hitSlop}
        value={text}
        onChangeText={setText}
        multiline
        placeholder="Send a message"
        placeholderTextColor="#999999"
      />

      {!!imageUrls.length && (
        <FlatList
          contentContainerStyle={styles.imageContainer}
          data={imageUrls}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image
              source={item}
              style={styles.image}
            />
          )}
          keyExtractor={(item) => item}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={onPressCancel} variant="secondary" disabled={disabled} />
        <Button title="Send" onPress={onPressSend} disabled={disabled} />
      </View>
    </View>
  )
}

const Constants = {
  textInputMinHeight: 36,
}

const hitSlop = (44 - Constants.textInputMinHeight) / 2

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
    marginHorizontal: 16,
    maxHeight: 160,
    minHeight: Constants.textInputMinHeight,
  },
  imageContainer: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 8,
    marginRight: 8
  },
  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 8,
    justifyContent: "flex-end"
  }
})

export default MessageForm