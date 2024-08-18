import { Message as MessageType } from "@/types.chat"
import { StyleSheet, Text, View, FlatList } from "react-native"
import dayjs from "dayjs"
import useImageUrls from "@/hooks/useImageUrls"
import Image from "./Image"

const Message = ({
  message,
  showHeader,
}: {
  message: MessageType,
  showHeader: boolean
}) => {

  const imageUrls = useImageUrls(message.text)

  return (
    <View style={[
      styles.container,
      !showHeader && styles.containerNoHeader
    ]}>
      
      <View
        style={[
          styles.content,
          !showHeader && styles.paddedLeft
        ]}
      >
        {showHeader && (
          <Image
            source={message.user.avatar}
            style={{ width: 40, height: 40, borderRadius: 8}}
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 8,
    gap: 8,
  },
  containerNoHeader: {
    paddingTop: 0,
  },
  paddedLeft: {
    paddingLeft: 40 + 24,
  },
  content: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 8,
    flex: 1,
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