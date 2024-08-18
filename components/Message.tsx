import { Message as MessageType } from "@/types.chat"
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native"
import dayjs from "dayjs"
import useImageUrls from "@/hooks/useImageUrls"
import Image from "./Image"
import MessageOverlay from "./MessageOverlay"

const Message = ({
  message,
  showHeader,
  onPress,
  onLongPress,
  showOverlay,
}: {
  message: MessageType,
  showHeader: boolean,
  onPress: (message: MessageType) => void,
  onLongPress: (message: MessageType) => void,
  showOverlay: boolean,
}) => {

  const imageUrls = useImageUrls(message.text)

  const handlePress = () => {
    onPress(message)
  }

  const handleLongPress = () => {
    onLongPress(message)
  }

  return (
    <Pressable
      style={[
        styles.container,
        showOverlay && styles.overlayShown,
      ]}
      onPress={handlePress}
      onLongPress={handleLongPress}
    >
      <View
        style={[
          styles.content,
          !showHeader && styles.paddedLeft
        ]}
      >
        {showHeader && (
          <Image
            source={message.user.avatar}
            style={styles.avatar}
          />
        )}

        <View style={styles.rightContent}>
          {showHeader && (
            <View style={styles.userNameContainer}>
              <Text style={styles.username}>{ message.user.username }</Text>
              <Text style={styles.dateCreated}>{ dayjs(message.dateCreated).format("h:mm A") }</Text>
            </View>
          )}

          <Text style={styles.text}>
            { message.text }
          </Text>
        </View>
      </View>

      {!!imageUrls.length && (
        <FlatList
          contentContainerStyle={[styles.imageContainer, styles.paddedLeft]}
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

      {showOverlay && <MessageOverlay message={message} />}
    </Pressable>
  )
}

const Constants = {
  avatarSize: 40,
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
    gap: 8,
    backgroundColor: "transparent",
  },
  overlayShown: {
    backgroundColor: "#e6e6e6",
  },
  paddedLeft: {
    paddingLeft: Constants.avatarSize + 24,
  },
  content: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 8,
    flex: 1,
  },
  rightContent: {
    flex: 1,
    gap: 4,
  },
  avatar: {
    width: Constants.avatarSize,
    height: Constants.avatarSize,
    borderRadius: 8,
  },
  userNameContainer: {
    flexDirection: "row",
    gap: 8,
  },
  username: {
    fontWeight: "700",
  },
  text: {
    fontSize: 15,
    lineHeight: 20
  },
  dateCreated: {
    color: "#999",
  },
  imageContainer: {
    paddingRight: 16,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 8,
    marginRight: 8
  },
})

export default Message