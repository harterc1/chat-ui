import { Message as MessageType } from "@/types.chat"
import { StyleSheet, Text, View, FlatList } from "react-native"
import { Image } from "expo-image"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { extractImageUrls } from "@/app/utils"

const Message = ({
  message,
  showHeader,
}: {
  message: MessageType,
  showHeader: boolean
}) => {

  const [imageUrls, setImageUrls] = useState<string[]>([])

  const evaluateImageUrls = async () => {
    setImageUrls(await extractImageUrls(message.text))
  }

  useEffect(() => {
    evaluateImageUrls()
  }, [message.text])

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
              placeholder={{ blurhash }}
              style={styles.image}
              transition={250}
            />
          )}
          keyExtractor={(item) => item}
        />
      )}
    </View>
  )
}

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


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