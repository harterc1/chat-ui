import { Message as MessageType } from "@/types.chat"
import { StyleSheet, Text, View } from "react-native"
import { Image } from "expo-image"
import dayjs from "dayjs"

const Message = ({
  message,
  showHeader,
}: {
  message: MessageType,
  showHeader: boolean
}) => {
  return (
    <View style={[
      styles.container,
      !showHeader && styles.containerNoHeader
    ]}>
      {showHeader && (
        <Image
          source={message.user.avatar}
          style={{ width: 40, height: 40, borderRadius: 8}}
        />
      )}
      <View style={{ gap: 4, flex: 1 }}>
        {showHeader && (
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Text style={styles.username}>{ message.user.username }</Text>
            <Text style={styles.dateCreated}>{ dayjs(message.dateCreated).format("h:mm A") }</Text>
          </View>
        )}

        <Text
          style={[
            styles.text,
            !showHeader && styles.textNoHeader
          ]}
        >{ message.text }</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: "row",
    gap: 8,
  },
  containerNoHeader: {
    paddingTop: 0,
  },
  text: {

  },
  textNoHeader: {
    paddingLeft: 40 + 8,
  },
  username: {
    fontWeight: "700",
  },
  dateCreated: {
    color: "#999",
  },
})

export default Message