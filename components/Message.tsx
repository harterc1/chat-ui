import { Message as MessageType } from "@/types.chat"
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native"
import dayjs from "dayjs"
import useImageUrls from "@/hooks/useImageUrls"
import Image from "./Image"
import MessageOverlay from "./MessageOverlay"


const Constants = {
  avatarSize: 40,
}

const Message = ({
  message,
  showHeader,
  index,
  onPress,
  onLongPress,
  showOverlay,
}: {
  message: MessageType,
  showHeader: boolean,
  index: number,
  onPress: (message: MessageType, index: number) => void,
  onLongPress: (message: MessageType, index: number) => void,
  showOverlay: boolean,
}) => {

  const imageUrls = useImageUrls(message.text)

  const handlePress = () => {
    onPress(message, index)
  }

  const handleLongPress = () => {
    
    onLongPress(message, index)
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

        <View style={{ flex: 1, gap: 4 }}>
          {showHeader && (
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text style={styles.username}>{ message.user.username }</Text>
              <Text style={styles.dateCreated}>{ dayjs(message.dateCreated).format("h:mm A") }</Text>
            </View>
          )}

          <Text>
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

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    gap: 8,
  },
  overlayShown: {
    backgroundColor: "#ddd",
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
  avatar: {
    width: Constants.avatarSize,
    height: Constants.avatarSize,
    borderRadius: 8,
  },
  username: {
    fontWeight: "700",
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
  }
})

export default Message