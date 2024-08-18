import { Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name']

const Constants = {
  size: 32,
}

const hitSlop = (44 - Constants.size) / 2

const IconButton = ({
  name,
  onPress,
  accessibilityLabel,
}: {
  name: IconName,
  onPress: () => void,
  accessibilityLabel: string,
}) => (
  <Pressable
    onPress={onPress}
    accessibilityLabel={accessibilityLabel}
    hitSlop={hitSlop}
    style={({ pressed }) => ([
      styles.container,
      pressed && styles.pressed,
    ])}
  >
    <MaterialCommunityIcons name={name} size={16} />
  </Pressable>
)

const styles = StyleSheet.create({
  container: {
    width: Constants.size,
    height: Constants.size,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ccc",
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: "white",
  },
  pressed: {
    backgroundColor: "#e6e6e6",
  }
})

export default IconButton