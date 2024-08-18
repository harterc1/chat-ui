import { View } from "react-native"
import IconButton from "./IconButton"
import useAuthContext from "@/contexts/auth/useAuthContext"
import { Message } from "@/types.chat"

const MessageOverlay = ({ message }: { message: Message }) => {
  const user = useAuthContext()
  return (
    <View
      style={{
        borderRadius: 8,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#ccc",
        flexDirection: "row",
        position: "absolute",
        right: 8,
        top: -4,
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      <IconButton
        onPress={() => {}}
        name="thumb-up-outline"
        accessibilityLabel="Like"
      />

      {user?.username === message.user.username && (
        <>
          <IconButton
            onPress={() => {}}
            name="square-edit-outline"
            accessibilityLabel="Edit"
          />
          <IconButton
            onPress={() => {}}
            name="trash-can-outline"
            accessibilityLabel="Delete"
          />
        </>
      )}
      
      <IconButton
        onPress={() => {}}
        name="reply-outline"
        accessibilityLabel="Reply"
      />
    </View>
  )
}

export default MessageOverlay